import dotenv from 'dotenv';
import { createTransport } from 'nodemailer';
import chalk from 'chalk';

// Load environment variables
dotenv.config();

console.log(chalk.bold.cyan('\n📧 Testing WEO Email Configuration\n'));

async function testEmail() {
  console.log(chalk.yellow('Setting up email service...'));
  
  // Create transporter
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  console.log(chalk.gray(`From: ${process.env.EMAIL_USER}`));
  console.log(chalk.gray(`To: ${process.env.EMAIL_TO}\n`));

  try {
    // Verify connection
    console.log(chalk.yellow('Verifying Gmail connection...'));
    await transporter.verify();
    console.log(chalk.green('✓ Gmail connection successful!\n'));

    // Send test email
    console.log(chalk.yellow('Sending test email...'));
    
    const info = await transporter.sendMail({
      from: `WEO Intelligence <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: '✅ WEO Competitive Intelligence - Email Test Successful!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center;">
            <h1>Email Configuration Successful! 🎉</h1>
          </div>
          
          <div style="padding: 30px;">
            <p>Great news! Your WEO Competitive Intelligence System email configuration is working perfectly.</p>
            
            <h3>✅ What's Working:</h3>
            <ul>
              <li>Gmail authentication</li>
              <li>App password configuration</li>
              <li>Email sending capability</li>
            </ul>
            
            <h3>📊 Next Steps:</h3>
            <ol>
              <li>Run <code>npm test</code> to test all components</li>
              <li>Start monitoring with <code>npm start</code></li>
              <li>Check for alerts when competitors make changes</li>
            </ol>
            
            <p style="margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 5px;">
              <strong>System Details:</strong><br>
              Time: ${new Date().toLocaleString()}<br>
              From: ${process.env.EMAIL_USER}<br>
              To: ${process.env.EMAIL_TO}
            </p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666;">
            <p>WEO Competitive Intelligence System</p>
          </div>
        </div>
      `
    });

    console.log(chalk.green('✓ Test email sent successfully!'));
    console.log(chalk.gray(`Message ID: ${info.messageId}\n`));
    console.log(chalk.bold.green('🎉 Email configuration is working!\n'));
    console.log(chalk.cyan('Check your inbox at: ' + process.env.EMAIL_TO));
    
  } catch (error) {
    console.log(chalk.red('\n✗ Email test failed!\n'));
    console.log(chalk.red('Error:', error.message));
    
    if (error.message.includes('Invalid login')) {
      console.log(chalk.yellow('\nTroubleshooting tips:'));
      console.log('1. Make sure 2FA is enabled on your Google account');
      console.log('2. Verify the app password is correct (no spaces)');
      console.log('3. Try generating a new app password');
    }
  }
}

testEmail();