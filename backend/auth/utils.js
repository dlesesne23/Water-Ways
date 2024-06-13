const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Replace with a long, random string

function generateToken(id, role) {
  const payload = { id, role };
  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secretKey, options);
  return token;
}

module.exports = {
  generateToken,
};