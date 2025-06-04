import { useCallback } from 'react';
import { toast } from 'sonner';
import {
  fetchMembersService,
  toggleStatusService,
  addMemberService,
  editMemberService,
  deleteMemberService
} from '@/services/membersService';
import { UserModel } from '@/auth';

export const useMembers = () => {
  // Obtener miembros
  const fetchMembers = useCallback(async (): Promise<UserModel[]> => {
    try {
      return await fetchMembersService();
    } catch (error) {
      toast.error('Error fetching users.');
      throw error;
    }
  }, []);

  // Activar/Desactivar usuario
  const toggleUserStatus = useCallback(async (userId: number): Promise<UserModel> => {
    try {
      return await toggleStatusService(userId);
    } catch (error) {
      toast.error('Error toggling user status.');
      throw error;
    }
  }, []);

  // 🔹 Agregar usuario
  const addMember = useCallback(async (user: Partial<UserModel>): Promise<UserModel> => {
    try {
      const newUser = await addMemberService(user);
      toast.success('User added successfully.');
      return newUser;
    } catch (error) {
      toast.error('Error adding user.');
      throw error;
    }
  }, []);

  // 🔹 Editar usuario
  const editMember = useCallback(async (userId: number, user: Partial<UserModel>): Promise<UserModel> => {
    try {
      const updatedUser = await editMemberService(userId, user);
      toast.success('User updated successfully.');
      return updatedUser;
    } catch (error) {
      toast.error('Error updating user.');
      throw error;
    }
  }, []);

  // 🔹 Eliminar usuario
  const deleteMember = useCallback(async (userId: number): Promise<void> => {
    try {
      await deleteMemberService(userId);
      toast.success('User deleted successfully.');
    } catch (error) {
      toast.error('Error deleting user.');
      throw error;
    }
  }, []);

  return { fetchMembers, toggleUserStatus, addMember, editMember, deleteMember };
};