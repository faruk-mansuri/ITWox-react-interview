import { verifyJWT } from './tokenUtil';

export const getDataFromToken = async (req) => {
  try {
    const token = req.cookies.get('token')?.value || '';
    const { userId } = verifyJWT(token);
    return userId;
  } catch (error) {
    return null;
  }
};
