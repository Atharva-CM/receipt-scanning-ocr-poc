import XLSX from 'xlsx';
import {writeFile, DocumentDirectoryPath} from 'react-native-fs';

const generateExcelSheet = async (data: any) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data');

  const filePath = `${DocumentDirectoryPath}/donation_data.xlsx`;
  const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
  await writeFile(filePath, wbout, 'ascii');

  return filePath;
};

export default generateExcelSheet;
