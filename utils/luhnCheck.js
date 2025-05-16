function luhnCheck(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '').split('').reverse().map(Number);
  const checksum = digits.reduce((acc, val, idx) => {
    if (idx % 2 === 1) {
      val *= 2;
      if (val > 9) val -= 9;
    }
    return acc + val;
  }, 0);
  return checksum % 10 === 0;
}
module.exports = luhnCheck;
