

// This function generates the bar code  with the encoded data as parameter
function generateBarcode(qrcode) {return `<img src="data:image/png;base64,${qrcode}" alt="Base64 Image">`}

module.exports = {
  generateBarcode
};