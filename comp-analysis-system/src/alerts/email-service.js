import { createTransport } from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import dayjs from 'dayjs';
import { fileURLToPath } from 'url';
import { logEmail, logError } from '../utils/logger.js';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class EmailService {
  constructor() {
    this.transporter = null;
    this.from = process.env.EMAIL_USER;
    this.to = process.env.EMAIL_TO;
    this.cc = process.env.EMAIL_CC;
  }

  async initialize() {
    try {
      this.transporter = createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Verify connection
      await this.transporter.verify();
      console.log(chalk.green('✓ Email service ready'));
      
    } catch (error) {
      console.log(chalk.red('✗ Email service failed to initialize'));
      logError(error, 'Email service initialization');
      throw error;
    }
  }

  async sendCompetitorAlert(changes, competitorData) {
    const priority = this.determinePriority(changes);
    const subject = this.generateSubject('competitor', priority, changes);
    const html = await this.generateCompetitorHTML(changes, competitorData);
    
    await this.sendEmail(subject, html, priority);
  }

  async sendRankingAlert(changes) {
    const priority = this.determinePriority(changes);
    const subject = this.generateSubject('ranking', priority, changes);
    const html = await this.generateRankingHTML(changes);
    
    await this.sendEmail(subject, html, priority);
  }

  async sendWeeklyReport(data) {
    const subject = `📊 WEO Weekly Competitive Intelligence Report - ${dayjs().format('MMM D, YYYY')}`;
    const html = await this.generateWeeklyReportHTML(data);
    
    await this.sendEmail(subject, html, 'info');
  }

  async sendEmail(subject, html, priority = 'info') {
    try {
      const mailOptions = {
        from: `WEO Intelligence <${this.from}>`,
        to: this.to,
        cc: this.cc,
        subject: subject,
        html: html,
        priority: priority === 'critical' ? 'high' : 'normal'
      };

      const info = await this.transporter.sendMail(mailOptions);
      logEmail('sent', this.to, subject);
      console.log(chalk.green(`✓ Email sent: ${subject}`));
      
      return info;
    } catch (error) {
      logError(error, 'Sending email');
      console.log(chalk.red(`✗ Email failed: ${error.message}`));
      throw error;
    }
  }

  determinePriority(changes) {
    // Check for critical changes
    const criticalChanges = changes.filter(c => 
      c.type === 'pricing_change' ||
      c.significance === 'major' ||
      c.priority === 'high'
    );
    
    if (criticalChanges.length > 0) return 'critical';
    
    // Check for warning-level changes
    const warningChanges = changes.filter(c =>
      c.type === 'content_change' ||
      c.significance === 'moderate' ||
      changes.length > 5
    );
    
    if (warningChanges.length > 0) return 'warning';
    
    return 'info';
  }

  generateSubject(type, priority, changes) {
    const emoji = {
      critical: '🚨',
      warning: '⚡',
      info: '📊'
    };

    const prefix = emoji[priority] || '📧';
    
    if (type === 'competitor') {
      const competitors = [...new Set(changes.map(c => c.competitor))];
      return `${prefix} WEO Alert: ${changes.length} changes detected at ${competitors.join(', ')}`;
    } else if (type === 'ranking') {
      const keywords = [...new Set(changes.map(c => c.keyword))];
      return `${prefix} WEO Ranking Alert: Changes for ${keywords.length} keywords`;
    }
    
    return `${prefix} WEO Competitive Intelligence Alert`;
  }

  async generateCompetitorHTML(changes, competitorData) {
    const groupedChanges = this.groupChangesByCompetitor(changes);
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            text-align: center;
        }
        .alert-box {
            background: #fff3cd;
            border-left: 4px solid #ff9800;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .change-item {
            background: #f8f9fa;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            border-left: 3px solid #667eea;
        }
        .critical {
            border-left-color: #f44336;
            background: #ffebee;
        }
        .competitor-section {
            margin: 30px 0;
        }
        .screenshot-link {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 8px 16px;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 10px;
        }
        .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>WEO Competitive Intelligence Alert</h1>
        <p>${dayjs().format('MMMM D, YYYY - h:mm A')}</p>
    </div>

    <div class="alert-box">
        <strong>Summary:</strong> ${changes.length} changes detected across ${Object.keys(groupedChanges).length} competitors
    </div>

    ${Object.entries(groupedChanges).map(([competitor, changes]) => `
        <div class="competitor-section">
            <h2>${competitor}</h2>
            ${changes.map(change => `
                <div class="change-item ${change.priority === 'high' ? 'critical' : ''}">
                    <strong>${this.formatChangeType(change.type)}</strong>
                    <p>Page: ${change.page}</p>
                    ${change.old ? `<p><strong>Previous:</strong> ${change.old}</p>` : ''}
                    ${change.new ? `<p><strong>Current:</strong> ${change.new}</p>` : ''}
                    ${change.significance ? `<p><em>Significance: ${change.significance}</em></p>` : ''}
                </div>
            `).join('')}
        </div>
    `).join('')}

    <div class="footer">
        <p>This is an automated alert from the WEO Competitive Intelligence System</p>
        <p>To adjust alert settings, please contact your administrator</p>
    </div>
</body>
</html>
    `;
  }

  async generateRankingHTML(changes) {
    const improved = changes.filter(c => c.direction === 'improved');
    const declined = changes.filter(c => c.direction === 'declined');
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            text-align: center;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 30px 0;
        }
        .metric-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .improved {
            border-left: 4px solid #4caf50;
        }
        .declined {
            border-left: 4px solid #f44336;
        }
        .change-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .change-table th {
            background: #f8f9fa;
            padding: 12px;
            text-align: left;
            border-bottom: 2px solid #dee2e6;
        }
        .change-table td {
            padding: 12px;
            border-bottom: 1px solid #dee2e6;
        }
        .position-change {
            font-weight: bold;
            padding: 4px 8px;
            border-radius: 4px;
        }
        .positive {
            color: #4caf50;
            background: #e8f5e9;
        }
        .negative {
            color: #f44336;
            background: #ffebee;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>WEO Ranking Change Alert</h1>
        <p>${dayjs().format('MMMM D, YYYY - h:mm A')}</p>
    </div>

    <div class="summary-grid">
        <div class="metric-card improved">
            <h3>Improvements</h3>
            <p style="font-size: 36px; font-weight: bold; color: #4caf50; margin: 10px 0;">
                ${improved.length}
            </p>
            <p>Keywords improved</p>
        </div>
        <div class="metric-card declined">
            <h3>Declines</h3>
            <p style="font-size: 36px; font-weight: bold; color: #f44336; margin: 10px 0;">
                ${declined.length}
            </p>
            <p>Keywords declined</p>
        </div>
    </div>

    <h2>Detailed Changes</h2>
    <table class="change-table">
        <thead>
            <tr>
                <th>Keyword</th>
                <th>Domain</th>
                <th>Previous</th>
                <th>Current</th>
                <th>Change</th>
            </tr>
        </thead>
        <tbody>
            ${changes.map(change => `
                <tr>
                    <td><strong>${change.keyword}</strong></td>
                    <td>${change.domain}</td>
                    <td>#${change.previousPosition > 100 ? '100+' : change.previousPosition}</td>
                    <td>#${change.currentPosition > 100 ? '100+' : change.currentPosition}</td>
                    <td>
                        <span class="position-change ${change.direction === 'improved' ? 'positive' : 'negative'}">
                            ${change.direction === 'improved' ? '↑' : '↓'} ${Math.abs(change.change)}
                        </span>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <div style="margin-top: 40px; padding: 20px; background: #e3f2fd; border-radius: 8px;">
        <h3>Recommended Actions</h3>
        ${declined.length > 0 ? `
            <p><strong>For Declining Keywords:</strong></p>
            <ul>
                <li>Review on-page SEO for affected pages</li>
                <li>Check for new competitor content</li>
                <li>Consider updating content freshness</li>
                <li>Analyze backlink profiles</li>
            </ul>
        ` : ''}
        ${improved.length > 0 ? `
            <p><strong>For Improved Keywords:</strong></p>
            <ul>
                <li>Document what's working</li>
                <li>Apply similar strategies to other keywords</li>
                <li>Monitor for sustained improvement</li>
            </ul>
        ` : ''}
    </div>

    <div class="footer">
        <p>This is an automated alert from the WEO Competitive Intelligence System</p>
    </div>
</body>
</html>
    `;
  }

  async generateWeeklyReportHTML(data) {
    // Implement comprehensive weekly report
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        /* Styles omitted for brevity - similar to above */
    </style>
</head>
<body>
    <div class="header">
        <h1>WEO Weekly Competitive Intelligence Report</h1>
        <p>Week of ${dayjs().startOf('week').format('MMMM D')} - ${dayjs().endOf('week').format('MMMM D, YYYY')}</p>
    </div>

    <h2>Executive Summary</h2>
    <div class="summary">
        <p>This week's competitive intelligence scan revealed ${data.totalChanges || 0} significant changes across monitored competitors.</p>
    </div>

    <!-- Additional report content -->

    <div class="footer">
        <p>This is an automated weekly report from the WEO Competitive Intelligence System</p>
    </div>
</body>
</html>
    `;
  }

  groupChangesByCompetitor(changes) {
    const grouped = {};
    changes.forEach(change => {
      const competitor = change.competitor || 'Unknown';
      if (!grouped[competitor]) {
        grouped[competitor] = [];
      }
      grouped[competitor].push(change);
    });
    return grouped;
  }

  formatChangeType(type) {
    const typeMap = {
      'title_change': 'Page Title Changed',
      'meta_change': 'Meta Description Changed',
      'content_change': 'Content Updated',
      'pricing_change': '💰 Pricing Changed',
      'statistics_change': 'Statistics Updated'
    };
    return typeMap[type] || type;
  }
}

export default EmailService;