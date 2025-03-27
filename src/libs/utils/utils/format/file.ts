/**
 *  Returns the file size in a human-readable format.
 * @param fileSize : number
 * @returns string
 * @example: '69 MB'
 */
export const formatFileSize = (fileSize: number): string => {
  const i: number = Math.floor(Math.log(fileSize) / Math.log(1024));
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  return parseFloat((fileSize / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + sizes[i];
};
