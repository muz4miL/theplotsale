/**
 * ZOOPLA PROPERTY SCRAPER
 * 
 * HOW TO USE:
 * 1. Open a Zoopla property listing page
 * 2. Open Chrome DevTools (F12)
 * 3. Go to Console tab
 * 4. Paste this entire script and press Enter
 * 5. Copy the output and paste into your bulk import
 * 
 * BATCH MODE:
 * - Open multiple Zoopla tabs
 * - Run script in each tab
 * - Combine all outputs
 * - Paste into bulk import
 */

(function() {
  try {
    // Extract property data from Zoopla page
    const title = document.querySelector('h1')?.textContent?.trim() || 'Property Title';
    
    const location = document.querySelector('[data-testid="address-label"]')?.textContent?.trim() 
      || document.querySelector('.ui-property-summary__address')?.textContent?.trim()
      || 'Location';
    
    const priceText = document.querySelector('[data-testid="price"]')?.textContent?.trim()
      || document.querySelector('.ui-pricing__main-price')?.textContent?.trim()
      || '0';
    const price = priceText.replace(/[£,]/g, '').match(/\d+/)?.[0] || '0';
    
    const beds = document.querySelector('[data-testid="beds-label"]')?.textContent?.match(/\d+/)?.[0]
      || document.querySelector('.ui-property-summary__features')?.textContent?.match(/(\d+)\s*bed/i)?.[1]
      || '';
    
    const baths = document.querySelector('[data-testid="baths-label"]')?.textContent?.match(/\d+/)?.[0]
      || document.querySelector('.ui-property-summary__features')?.textContent?.match(/(\d+)\s*bath/i)?.[1]
      || '';
    
    const sqftText = document.querySelector('[data-testid="floorarea-label"]')?.textContent
      || document.querySelector('.ui-property-summary__features')?.textContent
      || '';
    const sqft = sqftText.match(/(\d+)\s*sq\s*ft/i)?.[1] || '';
    
    const description = document.querySelector('[data-testid="truncated-text-container"]')?.textContent?.trim()
      || document.querySelector('.ui-property-description__text')?.textContent?.trim()
      || 'Property description';
    
    // Get main image
    const mainImage = document.querySelector('[data-testid="gallery-image-0"]')?.src
      || document.querySelector('.ui-gallery__image img')?.src
      || document.querySelector('img[alt*="property"]')?.src
      || '';
    
    // Get gallery images (first 5)
    const galleryImages = Array.from(document.querySelectorAll('[data-testid^="gallery-image-"]'))
      .slice(1, 6)
      .map(img => img.src)
      .filter(src => src && src.includes('http'));
    
    // Alternative gallery selector
    if (galleryImages.length === 0) {
      const altGallery = Array.from(document.querySelectorAll('.ui-gallery__image img'))
        .slice(1, 6)
        .map(img => img.src)
        .filter(src => src && src.includes('http'));
      galleryImages.push(...altGallery);
    }
    
    const galleryUrls = galleryImages.join(',');
    
    // Format as pipe-separated
    const output = `${title} | ${location} | ${price} | ${beds} | ${baths} | ${sqft} | ${mainImage} | ${description.substring(0, 200)} | ${galleryUrls}`;
    
    console.log('\n🎯 PROPERTY DATA EXTRACTED:\n');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(output);
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log('✅ Copy the line above and paste into your bulk import!\n');
    
    // Also show structured data for verification
    console.log('📋 STRUCTURED DATA (for verification):');
    console.log({
      title,
      location,
      price,
      beds,
      baths,
      sqft,
      mainImage,
      descriptionLength: description.length,
      galleryCount: galleryImages.length
    });
    
    // Copy to clipboard if possible
    if (navigator.clipboard) {
      navigator.clipboard.writeText(output).then(() => {
        console.log('\n📋 Data copied to clipboard! Paste directly into bulk import.');
      }).catch(() => {
        console.log('\n⚠️ Could not auto-copy. Please copy manually from above.');
      });
    }
    
    return output;
    
  } catch (error) {
    console.error('❌ Error extracting property data:', error);
    console.log('💡 Make sure you are on a Zoopla property listing page');
    console.log('💡 Try refreshing the page and running the script again');
  }
})();

/**
 * BATCH EXTRACTION HELPER
 * 
 * If you have multiple Zoopla tabs open, run this in each tab:
 */

// Store results across tabs (optional)
window.zooplaData = window.zooplaData || [];

/**
 * ALTERNATIVE: Extract from search results page
 * Run this on a Zoopla search results page to get multiple properties at once
 */

function extractSearchResults() {
  const listings = document.querySelectorAll('[data-testid="search-result"]');
  const results = [];
  
  listings.forEach((listing, index) => {
    if (index >= 10) return; // Limit to 10 per page
    
    const title = listing.querySelector('h2')?.textContent?.trim() || '';
    const location = listing.querySelector('[data-testid="listing-address"]')?.textContent?.trim() || '';
    const priceText = listing.querySelector('[data-testid="listing-price"]')?.textContent?.trim() || '0';
    const price = priceText.replace(/[£,]/g, '').match(/\d+/)?.[0] || '0';
    const image = listing.querySelector('img')?.src || '';
    
    if (title && location) {
      results.push(`${title} | ${location} | ${price} | | | | ${image} | Click for full details | `);
    }
  });
  
  console.log('\n🎯 EXTRACTED FROM SEARCH RESULTS:\n');
  console.log('═══════════════════════════════════════════════════════════════');
  results.forEach(r => console.log(r));
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log(`✅ Found ${results.length} properties. Copy and paste into bulk import!`);
  console.log('⚠️ Note: You will need to open each property to get full details (beds, baths, description, gallery)');
  
  return results;
}

// Uncomment to run search results extraction:
// extractSearchResults();
