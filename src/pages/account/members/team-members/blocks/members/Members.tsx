import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataGrid } from '@/components';
import { toast } from 'sonner';
import { useMembers } from '@/hooks/useMembers';
import { UserModel } from '@/auth';
import { MemberModal } from './modals/MemberModal';

const Members = () => {
  const { fetchMembers, addMember, editMember } = useMembers();
  const [data, setData] = useState<UserModel[]>([]);
  const [filteredData, setFilteredData] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserModel | null>(null);
  const [formData, setFormData] = useState<Partial<UserModel>>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    occupation: '',
    companyName: 'Calles Phone Repair',
    roles: [1],
    isActive: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchMembers();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        toast.error('Failed to fetch members.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchMembers]);

  const openModal = (user?: UserModel) => {
    setEditingUser(user || null);
    setFormData({ first_name: '', last_name: '', email: '', phone: '', occupation: '', companyName: 'Calles Phone Repair', roles: [1], isActive: true });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingUser(null);
  };

  const handleSaveUser = async (userData: Partial<UserModel>) => {
    try {
      setLoading(true);
      if (editingUser) {
        const updatedUser = await editMember(editingUser._id, userData);
        const updatedData = await fetchMembers(); // Refrescar datos desde el servidor
        setData(updatedData);
        setFilteredData(updatedData);
        toast.success('Member updated successfully.');
      } else {
        const newUser = await addMember(userData);
        const updatedData = await fetchMembers(); // Refrescar datos desde el servidor
        setData(updatedData);
        setFilteredData(updatedData);
        toast.success('Member added successfully.');
      }
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        occupation: '',
        companyName: 'Calles Phone Repair',
        roles: [1],
        isActive: true,
      });
      closeModal();
    } catch (error) {
      toast.error('Failed to save member.');
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnDef<UserModel>[] = useMemo(() => [
    { accessorKey: 'first_name', header: 'First Name' },
    { accessorKey: 'last_name', header: 'Last Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'companyName', header: 'Company' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button onClick={() => openModal(row.original)}>Edit</button>
        </div>
      )
    }
  ], []);

  return (
    <>
      <button onClick={() => openModal()} className="btn btn-primary mb-4">Add Member</button>
      <DataGrid columns={columns} data={filteredData} loading={loading} />
      <MemberModal isOpen={modalOpen} onClose={closeModal} onSave={handleSaveUser} user={editingUser} />
    </>
  );
};

export { Members };
