/**
 * Utility functions for product images
 * Uses Unsplash Source API as temporary solution
 */

/**
 * Generate Unsplash Source URL based on keywords
 * Format: https://source.unsplash.com/WIDTHxHEIGHT/?keyword1,keyword2
 */
export function getUnsplashImage(
  keywords: string[],
  width = 800,
  height = 600,
): string {
  const keywordString = keywords.join(',');
  return `https://source.unsplash.com/${width}x${height}/?${keywordString}`;
}

/**
 * Get image URL for a category
 */
export function getCategoryImageUrl(categorySlug: string): string {
  const categoryKeywords: Record<string, string[]> = {
    surgical: ['surgical', 'medical', 'sterile', 'drapes'],
    tube: ['medical', 'tube', 'oxygen', 'respiratory'],
    'central-venous-catheter': ['iv', 'catheter', 'medical', 'infusion'],
    dressing: ['bandage', 'wound', 'medical', 'dressing'],
    'laboratory-supplies': ['laboratory', 'medical', 'test', 'specimen'],
    'veterinary-products': ['veterinary', 'animal', 'medical', 'care'],
    'medical-equipment': ['medical', 'equipment', 'stethoscope', 'hospital'],
    gloves: ['medical', 'gloves', 'ppe', 'healthcare'],
    'face-protection': ['mask', 'medical', 'ppe', 'protection'],
    'bodily-waste-management': ['medical', 'hospital', 'healthcare', 'supplies'],
  };

  const keywords = categoryKeywords[categorySlug] || ['medical', 'healthcare'];
  return getUnsplashImage(keywords, 1200, 800);
}

/**
 * Get image URL for a product based on its category and name
 */
export function getProductImageUrl(
  categorySlug: string,
  productName: string,
): string {
  // Extract key terms from product name
  const nameLower = productName.toLowerCase();

  // Base keywords from category
  const baseKeywords: Record<string, string[]> = {
    surgical: ['surgical', 'sterile'],
    tube: ['medical', 'tube'],
    'central-venous-catheter': ['catheter', 'iv'],
    dressing: ['bandage', 'medical'],
    'laboratory-supplies': ['laboratory', 'medical'],
    'veterinary-products': ['veterinary', 'medical'],
    'medical-equipment': ['medical', 'equipment'],
    gloves: ['gloves', 'medical'],
    'face-protection': ['mask', 'medical'],
    'bodily-waste-management': ['medical', 'hospital'],
  };

  // Add specific keywords based on product name
  const keywords = [...(baseKeywords[categorySlug] || ['medical'])];

  if (nameLower.includes('glove')) keywords.push('gloves');
  if (nameLower.includes('mask')) keywords.push('mask');
  if (nameLower.includes('surgical')) keywords.push('surgical');
  if (nameLower.includes('tube')) keywords.push('tube');
  if (nameLower.includes('catheter')) keywords.push('catheter');
  if (nameLower.includes('dressing') || nameLower.includes('bandage')) keywords.push('bandage');

  return getUnsplashImage(keywords, 800, 600);
}

/**
 * Generate gradient background as fallback
 */
export function getCategoryGradient(categorySlug: string): string {
  const gradients: Record<string, string> = {
    surgical: 'from-blue-500 to-blue-700',
    tube: 'from-cyan-500 to-cyan-700',
    'central-venous-catheter': 'from-indigo-500 to-indigo-700',
    dressing: 'from-teal-500 to-teal-700',
    'laboratory-supplies': 'from-purple-500 to-purple-700',
    'veterinary-products': 'from-green-500 to-green-700',
    'medical-equipment': 'from-sky-500 to-sky-700',
    gloves: 'from-emerald-500 to-emerald-700',
    'face-protection': 'from-blue-500 to-blue-700',
    'bodily-waste-management': 'from-slate-500 to-slate-700',
  };

  return gradients[categorySlug] || 'from-primary to-accent';
}
