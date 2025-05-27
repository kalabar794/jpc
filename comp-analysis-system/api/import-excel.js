import * as XLSX from 'xlsx';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data } = req.body; // Base64 encoded file data
    
    if (!data) {
      return res.status(400).json({ error: 'No file data provided' });
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(data, 'base64');
    
    // Read the Excel file
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Parse the data structure
    const competitors = {};
    const headers = jsonData[0]; // First row contains competitor names
    
    // Skip empty rows and find data rows
    for (let i = 1; i < jsonData.length; i++) {
      const row = jsonData[i];
      const dataLabel = row[0]; // First column is the data label
      
      if (dataLabel && typeof dataLabel === 'string') {
        // Process each competitor's data
        for (let j = 1; j < headers.length; j++) {
          const competitorName = headers[j];
          const value = row[j];
          
          if (competitorName && value !== undefined && value !== null) {
            // Initialize competitor object if needed
            if (!competitors[competitorName]) {
              competitors[competitorName] = {
                name: competitorName,
                data: {}
              };
            }
            
            // Store the data
            const key = dataLabel.toLowerCase()
              .replace(/\s+/g, '_')
              .replace(/[^\w_]/g, '');
            
            competitors[competitorName].data[key] = value;
          }
        }
      }
    }

    // Map common fields
    const mappedCompetitors = {};
    for (const [name, comp] of Object.entries(competitors)) {
      const id = name.toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, '');
      mappedCompetitors[id] = {
        id,
        name,
        location: comp.data.location || null,
        companySize: comp.data.company_size || null,
        founded: comp.data.founded || null,
        coreFocus: comp.data.core_focus || null,
        seo: comp.data.seo === 'Yes' || comp.data.seo === true,
        reviews: comp.data.reviews || null,
        clientsEstimated: comp.data.clients_estimated || null,
        dsoMarketing: comp.data.dso_marketing === 'Yes' || comp.data.dso_marketing === true,
        pricing: comp.data.pricing || null,
        brandMessaging: comp.data.brand_messaging || null,
        reputation: comp.data.reputation || null,
        socialFollowers: comp.data.social_followers || null,
        events: comp.data.events || null,
        verticalsServed: comp.data.verticals_served || null,
        revenues: comp.data.revenues || null,
        emailMarketing: comp.data.email_marketing === 'Yes' || comp.data.email_marketing === true,
        rawData: comp.data, // Keep all original data
        importedAt: new Date().toISOString()
      };
    }

    res.status(200).json({
      success: true,
      competitors: mappedCompetitors,
      count: Object.keys(mappedCompetitors).length
    });

  } catch (error) {
    console.error('Error importing Excel:', error);
    res.status(500).json({ 
      error: 'Failed to import Excel file',
      details: error.message 
    });
  }
}