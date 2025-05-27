export async function generateReport(results, changes) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WEO Competitive Intelligence Report - ${new Date().toLocaleDateString()}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
        }
        .competitor-card {
            background: white;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .insights {
            background: #e8f4fd;
            border-left: 4px solid #2196F3;
            padding: 15px;
            margin: 15px 0;
        }
        .changes {
            background: #fff3cd;
            border-left: 4px solid #ff9800;
            padding: 15px;
            margin: 15px 0;
        }
        .price-tag {
            display: inline-block;
            background: #4CAF50;
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            margin: 2px;
            font-size: 14px;
        }
        .feature-tag {
            display: inline-block;
            background: #2196F3;
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            margin: 2px;
            font-size: 14px;
        }
        .promo-tag {
            display: inline-block;
            background: #ff9800;
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            margin: 2px;
            font-size: 14px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f8f9fa;
            font-weight: 600;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .summary-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .summary-card h3 {
            margin: 0 0 10px 0;
            color: #666;
        }
        .summary-card .number {
            font-size: 36px;
            font-weight: bold;
            color: #667eea;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>WEO Competitive Intelligence Report</h1>
        <p>Generated on ${new Date().toLocaleString()}</p>
        <p>Analyzing ${results.length} competitors in the dental marketing space</p>
    </div>

    <div class="summary-grid">
        <div class="summary-card">
            <h3>Competitors Analyzed</h3>
            <div class="number">${results.length}</div>
        </div>
        <div class="summary-card">
            <h3>Changes Detected</h3>
            <div class="number">${changes?.length || 0}</div>
        </div>
        <div class="summary-card">
            <h3>Pricing Found</h3>
            <div class="number">${results.filter(r => r.insights?.hasPricing).length}</div>
        </div>
    </div>

    ${changes && changes.length > 0 ? `
        <div class="changes">
            <h2>🔄 Recent Changes Detected</h2>
            <ul>
                ${changes.map(change => `<li>${change}</li>`).join('')}
            </ul>
        </div>
    ` : ''}

    ${results.map(result => `
        <div class="competitor-card">
            <h2>${result.competitor}</h2>
            <p><strong>Domain:</strong> ${result.domain}</p>
            <p><strong>Scanned:</strong> ${new Date(result.timestamp).toLocaleString()}</p>
            
            ${result.insights ? `
                <div class="insights">
                    <h3>Key Insights</h3>
                    
                    ${result.insights.hasPricing ? `
                        <p><strong>Pricing Information:</strong></p>
                        ${result.insights.priceRanges.map(price => 
                            `<span class="price-tag">${price}</span>`
                        ).join('')}
                    ` : '<p>No pricing information found publicly</p>'}
                    
                    ${result.insights.features.length > 0 ? `
                        <p><strong>Features Mentioned:</strong></p>
                        ${result.insights.features.slice(0, 10).map(feature => 
                            `<span class="feature-tag">${feature}</span>`
                        ).join('')}
                    ` : ''}
                    
                    ${result.insights.promotions.length > 0 ? `
                        <p><strong>Active Promotions:</strong></p>
                        ${result.insights.promotions.map(promo => 
                            `<span class="promo-tag">${promo}</span>`
                        ).join('')}
                    ` : ''}
                </div>
            ` : ''}
            
            ${result.data ? `
                <h3>Pages Analyzed</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Page</th>
                            <th>Title</th>
                            <th>Key Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(result.data).map(([page, data]) => `
                            <tr>
                                <td>${page}</td>
                                <td>${data.title || 'N/A'}</td>
                                <td>${data.headings?.h1?.[0] || 'N/A'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            ` : ''}
        </div>
    `).join('')}

    <div style="margin-top: 50px; text-align: center; color: #666;">
        <p>This report is confidential and for internal use only.</p>
        <p>WEO Competitive Intelligence System</p>
    </div>
</body>
</html>
  `;

  return html;
}