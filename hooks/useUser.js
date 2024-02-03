import { create } from 'zustand';

export const useUser = create((set) => {
  return {
    currentUser: null,
    setUser: (user) => set({ currentUser: user }),
    removeUser: () => set({ currentUser: null }),
  };
});
