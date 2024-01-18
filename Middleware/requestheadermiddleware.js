const xlsx = require('xlsx');
const fs = require('fs').promises;

let workbook = xlsx.utils.book_new();

const save_request_header = async (req, res, next) => {
  try {
    // const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log(`User IP: ${clientIp}`);

    // // Create a worksheet if not exists
    // if (!workbook.Sheets['Requests']) {
    //   workbook.Sheets['Requests'] = xlsx.utils.json_to_sheet([], { header: ['Method', 'URL', 'IP', 'Headers', 'Body'] });
    // }

    // // Add a new row to the worksheet
    // xlsx.utils.sheet_add_json(workbook.Sheets['Requests'], [{
    //   Method: req.method,
    //   URL: req.originalUrl,
    //   IP: clientIp,
    //   Headers: JSON.stringify(req.headers),
    //   Body: JSON.stringify(req.body),
    // }], { header: ['Method', 'URL', 'IP', 'Headers', 'Body'], skipHeader: true, origin: -1 });

    // // Generate a filename
    // const filename = 'requests.xlsx';

    // // Save the workbook to a file
    // await fs.writeFile(filename, xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' }));

    // console.log(`Request saved to ${filename}`);

    next(); // Call the next middleware in the chain
  } catch (err) {
    console.error(`Error saving request: ${err.message}`);
    next(); // Proceed with the next middleware even if there's an error
  }
};

module.exports = save_request_header;
