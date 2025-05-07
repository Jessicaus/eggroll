function generateCode(length = 6) {
    const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * characters.length);
      result += characters.charAt(index);
    }
  
    return result;
  }
  
  module.exports = generateCode;