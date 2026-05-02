/**
 * Elite File Delivery Utility
 * Ensures 100% reliability for file downloads across all environments.
 */

export const downloadPDF = async (subjectId: string, subjectName: string) => {
  const fileName = `${subjectId}.pdf`;
  const downloadName = `${subjectName}.pdf`;
  const relativePath = `pdf/${fileName}`;

  try {
    // 1. Attempt to fetch the file to verify existence and bypass server header issues
    const response = await fetch(relativePath);
    
    if (!response.ok) {
      throw new Error(`File not found: ${relativePath}`);
    }

    // 2. Convert to blob to ensure the browser treats it as a download regardless of server headers
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    // 3. Create a temporary anchor and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    
    // 4. Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return { success: true };
  } catch (error) {
    console.error('Elite Download Error:', error);
    alert(`Erro ao baixar o PDF: O arquivo "${downloadName}" não foi encontrado no servidor. Verifique se a pasta /pdf/ está presente.`);
    return { success: false, error };
  }
};
