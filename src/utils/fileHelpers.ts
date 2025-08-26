export function getEmbeddableUrl(url?: string): string | null {
  if (!url) return null;
  
  try {
    // Handle Google Drive URLs
    if (url.includes('drive.google.com')) {
      const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (fileIdMatch) {
        return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
      }
    }
    
    // Handle Dropbox URLs
    if (url.includes('dropbox.com')) {
      return url.replace('dropbox.com', 'dropbox.com').replace('?dl=0', '?raw=1');
    }
    
    // Handle direct PDF URLs
    if (url.endsWith('.pdf')) {
      return `${url}#toolbar=0`;
    }
    
    // Return original URL if no special handling needed
    return url;
  } catch (error) {
    console.error('Error processing file URL:', error);
    return url;
  }
}