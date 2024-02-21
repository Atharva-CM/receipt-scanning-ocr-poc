import XLSX from 'xlsx';

export const generateExcelSheet = (data: any) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Receipts');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
  // Logic to save or export the Excel file
};
