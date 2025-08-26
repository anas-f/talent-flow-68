// Utility functions for Google Drive integration

// Using Vite's import.meta.env for environment variables
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';

// Extract file ID from Google Drive URL
export const extractFileId = (url: string): string | null => {
  if (!url) return null;
  
  // Handle direct file ID
  if (url.includes('drive.google.com/file/d/')) {
    const match = url.match(/[\w-]{25,}/);
    return match ? match[0] : null;
  }
  
  // Handle Google Drive sharing links
  if (url.includes('drive.google.com/open')) {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('id');
  }
  
  // Handle short URL format
  if (url.includes('drive.google.com/uc?')) {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('id');
  }
  
  // If it's already a file ID
  if (url.match(/^[\w-]{25,}$/)) {
    return url;
  }
  
  return null;
};

// Get preview URL for Google Drive file
export const getPreviewUrl = (fileUrlOrId: string): string | null => {
  const fileId = extractFileId(fileUrlOrId);
  if (!fileId) return null;
  
  // Direct preview URL with API key
  return `https://www.googleapis.com/drive/v3/files/${fileId}?key=${API_KEY}&alt=media`;
};

// Get embeddable viewer URL
export const getEmbeddableUrl = (fileUrlOrId: string): string | null => {
  const fileId = extractFileId(fileUrlOrId);
  if (!fileId) return null;
  
  // Standard Google Drive viewer URL (works for public files)
  return `https://drive.google.com/file/d/${fileId}/preview`;
};

// Check if a file is accessible
export const isFileAccessible = async (fileUrlOrId: string): Promise<boolean> => {
  const fileId = extractFileId(fileUrlOrId);
  if (!fileId) return false;
  
  try {
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}?key=${API_KEY}&fields=id`
    );
    return response.ok;
  } catch (error) {
    console.error('Error checking file access:', error);
    return false;
  }
};
