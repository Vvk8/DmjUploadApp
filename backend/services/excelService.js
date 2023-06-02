const xlsx = require('xlsx');

// Function to read a specific column from an Excel file
const readColumnFromFile = (filePath, columnName) => {
    return new Promise((resolve, reject) => {
        try {
            const workbook = xlsx.readFile(filePath);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const columnData = xlsx.utils.sheet_to_json(worksheet, { raw: false, header: 1 })[0];
            const columnIndex = columnData.indexOf(columnName);

            if (columnIndex === -1) {
                reject(new Error(`Column '${columnName}' not found in the Excel file`));
                return;
            }

            const columnValues = worksheet[`$${xlsx.utils.encode_col(columnIndex + 1)}:$${xlsx.utils.encode_col(columnIndex + 1)}`];
            const columnDataArray = xlsx.utils.sheet_to_json(worksheet, { range: columnValues, raw: false, header: 1 });

            const values = columnDataArray.map((row) => row[columnIndex]);

            resolve(values);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    readColumnFromFile
};
