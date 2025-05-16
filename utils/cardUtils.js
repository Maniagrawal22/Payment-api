const crypto = require('crypto');

function maskCard(number) {
  return number.replace(/\d(?=\d{4})/g, '*');
}

function encrypt(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

module.exports = { maskCard, encrypt };
