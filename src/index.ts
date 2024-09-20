import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';

export function exportXlsx(data: any[], filename: string) {    // Convert DataTable data to Excel sheet format
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    // Use SheetJS to generate a downloadable Excel file
    XLSX.writeFile(workbook, filename+'.xlsx');
}

export async function exportCSV(data: any[], fileName: string) {
    const csv = unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });

    const base64 = await blobToBase64(blob);
    saveAs(base64, fileName);
}

function blobToBase64(blob: Blob) : Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

export default {
    exportXlsx,
    exportCSV
}