const xlsx = require('xlsx');

const save_request_header = async (req, res, next) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Load existing workbook if it exists
    let workbook;
    try {
      workbook = xlsx.readFile('request.xlsx');
    } catch (err) {
      // If the file doesn't exist, create a new workbook
      workbook = xlsx.utils.book_new();
    }

    let fileName = 'request.xlsx';

    // Try to get the existing 'Requests' worksheet, or create a new one
    let worksheet = workbook.Sheets['Requests'];
    if (!worksheet) {
      worksheet = xlsx.utils.json_to_sheet([], { header: ['Method', 'URL', 'IP', 'Headers', 'Body'] });
    }

    // Add new data to the worksheet
    xlsx.utils.sheet_add_json(worksheet, [{
      Method: req.method,
      URL: req.originalUrl,
      IP: clientIp,
      Headers: JSON.stringify(req.headers),
      Body: JSON.stringify(req.body),
    }], { skipHeader: true, origin: -1 });

    // Append or replace the 'Requests' worksheet in the workbook
    workbook.Sheets['Requests'] = worksheet;

    // Save the updated workbook
    xlsx.writeFile(workbook, fileName);

    console.log(`Request saved to ${fileName}`);

    next(); // Call the next middleware in the chain
  } catch (err) {
    console.error(`Error saving request: ${err.message}`);
    next(); // Proceed with the next middleware even if there's an error
  }
};

module.exports = save_request_header;
