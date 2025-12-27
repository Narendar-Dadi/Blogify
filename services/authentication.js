const JWT = require("jsonwebtoken");

// 1. The hard-coded secret is removed.
// const secret = "$uperMan@123";

// 2. The secret is now securely read from process.env
const secret = process.env.SECRET_KEY;

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    profileImgaeUrl: user.profileImgaeUrl,
    role: user.role,
  };
  // 3. The token is signed using the new secret variable.
  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
