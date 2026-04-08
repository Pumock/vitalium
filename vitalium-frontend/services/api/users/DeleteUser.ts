import { api } from '@/services/api/api';

export const DeleteUserService = {
  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/users/${userId}`);
  },
};
