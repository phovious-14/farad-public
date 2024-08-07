export function formatDateToDDMMYYYYHM(dateString: string) {
    const date = new Date(dateString);
  
    // Extract date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Format date to dd-mm-yyyy h:m:s
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }