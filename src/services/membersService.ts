import axiosInstance from '@/services/axiosConfig';
import { UserModel } from '@/auth';

export const fetchMembersService = async (): Promise<UserModel[]> => {
  const response = await axiosInstance.get<UserModel[]>('/members');
  return response.data;
};

export const toggleStatusService = async (userId: number): Promise<UserModel> => {
  const response = await axiosInstance.put<{ message: string; user: UserModel }>(
    `/members/${userId}/toggle-status`
  );
  return response.data.user; // Asegúrate de devolver solo el usuario actualizado
};

export const addMemberService = async (user: Partial<UserModel>): Promise<UserModel> => {
  const response = await axiosInstance.post<UserModel>('/members', user);
  return response.data;
};

export const editMemberService = async (userId: number, user: Partial<UserModel>): Promise<UserModel> => {
  const response = await axiosInstance.put<UserModel>(`/members/${userId}`, user);
  return response.data;
};

export const deleteMemberService = async (userId: number): Promise<void> => {
  await axiosInstance.delete(`/members/${userId}`);
};

