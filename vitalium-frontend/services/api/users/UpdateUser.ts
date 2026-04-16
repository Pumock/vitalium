import { api } from '@/services/api/api';

export interface UpdateUserPayload {
  isActive?: boolean;
}

export const UpdateUserService = {
  updateUser: async (userId: string, payload: UpdateUserPayload) => {
    const response = await api.patch(`/users/${userId}`, payload);
    return response.data;
  },
};
