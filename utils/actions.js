import axios from 'axios';
import toast from 'react-hot-toast';

export const signOut = async () => {
  try {
    await axios.get('/api/auth/logout');
    removeUser();
    toast.success('Logged Out');
  } catch (error) {
    console.log(error);
  }
};
