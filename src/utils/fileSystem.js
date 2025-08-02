import axios from 'axios';

export const getFileSize = (bytes) => {
  if (typeof bytes !== 'number') return 'Unknown';
  
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  else return (bytes / 1073741824).toFixed(1) + ' GB';
};

export const getFileType = (fileName) => {
  if (!fileName) return 'file';
  
  const extension = fileName.split('.').pop().toLowerCase();
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const documentExtensions = ['pdf', 'doc', 'docx', 'txt'];
  const spreadsheetExtensions = ['xls', 'xlsx', 'csv'];
  const archiveExtensions = ['zip', 'rar', '7z'];
  
  if (imageExtensions.includes(extension)) return 'image';
  if (documentExtensions.includes(extension)) return 'document';
  if (spreadsheetExtensions.includes(extension)) return 'spreadsheet';
  if (archiveExtensions.includes(extension)) return 'archive';
  
  return 'file';
};

export const fetchDirectoryContents = async (path = '') => {
  try {
    const response = await axios.get(`/api/directory?path=${encodeURIComponent(path)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching directory contents:', error);
    return [];
  }
};

export const downloadFile = async (filePath) => {
  try {
    const response = await axios.get(`/api/download?path=${encodeURIComponent(filePath)}`, {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filePath.split('/').pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
}; 