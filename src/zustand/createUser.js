import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      users: [],

      addUser: (user) => set((state) => ({ users: [...state.users, user] })),

      removeUser: (index) =>
        set((state) => ({
          users: state.users.filter((_, i) => i !== index),
        })),

      updateUser: (index, updatedUser) =>
        set((state) => ({
          users: state.users.map((user, i) => (i === index ? updatedUser : user)),
        })),
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
);