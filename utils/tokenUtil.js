import jsonwebtoken from 'jsonwebtoken';

export const createJWT = (payload) => {
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyJWT = (token) => {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET);
};
