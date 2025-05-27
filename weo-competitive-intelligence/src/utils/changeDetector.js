import fs from 'fs/promises';
import path from 'path';

export async function compareWithPrevious(currentResults) {
  const changes = [];
  
  try {
    // Get list of previous data files
    const dataFiles = await fs.readdir('./output/data');
    
    for (const result of currentResults) {
      const competitorName = result.competitor.toLowerCase().replace(/\s+/g, '-');
      
      // Find the most recent previous file for this competitor
      const previousFiles = dataFiles
        .filter(f => f.startsWith(competitorName) && f.endsWith('.json'))
        .sort()
        .reverse();
      
      if (previousFiles.length > 1) {
        // Load the most recent previous data (skip the current one we just saved)
        const previousData = JSON.parse(
          await fs.readFile(path.join('./output/data', previousFiles[1]), 'utf8')
        );
        
        // Compare insights
        const currentInsights = result.insights || {};
        const previousInsights = previousData.insights || {};
        
        // Check for pricing changes
        if (JSON.stringify(currentInsights.priceRanges) !== JSON.stringify(previousInsights.priceRanges)) {
          changes.push(`${result.competitor}: Pricing information has changed`);
        }
        
        // Check for new features
        const newFeatures = currentInsights.features?.filter(f => 
          !previousInsights.features?.includes(f)
        ) || [];
        
        if (newFeatures.length > 0) {
          changes.push(`${result.competitor}: New features detected: ${newFeatures.join(', ')}`);
        }
        
        // Check for new promotions
        const newPromotions = currentInsights.promotions?.filter(p => 
          !previousInsights.promotions?.includes(p)
        ) || [];
        
        if (newPromotions.length > 0) {
          changes.push(`${result.competitor}: New promotions detected: ${newPromotions.join(', ')}`);
        }
        
        // Check for significant content changes
        for (const [page, data] of Object.entries(result.data || {})) {
          const previousPageData = previousData.data?.[page];
          if (previousPageData) {
            // Compare titles
            if (data.title !== previousPageData.title) {
              changes.push(`${result.competitor}: Page title changed on ${page}`);
            }
            
            // Compare number of headings (indicates content restructuring)
            const currentH1Count = data.headings?.h1?.length || 0;
            const previousH1Count = previousPageData.headings?.h1?.length || 0;
            
            if (Math.abs(currentH1Count - previousH1Count) > 2) {
              changes.push(`${result.competitor}: Significant content changes on ${page}`);
            }
          }
        }
      }
    }
  } catch (error) {
    console.log('No previous data to compare with');
  }
  
  return changes;
}