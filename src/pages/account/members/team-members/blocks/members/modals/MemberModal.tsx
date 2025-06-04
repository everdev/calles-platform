import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalTitle } from '@/components/modal';
import { Input } from '@/components/ui/input';
import { UserModel } from '@/auth';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Partial<UserModel>) => void;
  user?: UserModel | null;
}

const defaultFormData: Partial<UserModel> = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  occupation: '',
  companyName: 'Calles Phone Repair',
  roles: [1],
  isActive: true,
};

const MemberModal = ({ isOpen, onClose, onSave, user }: MemberModalProps) => {
  const [formData, setFormData] = useState<Partial<UserModel>>(defaultFormData);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone || '',
        occupation: user.occupation || '',
        companyName: user.companyName || 'Calles Phone Repair',
        roles: user.roles || [1],
        isActive: user.isActive,
      });
    } else if (isOpen) {
      setFormData(defaultFormData); // Reset form when opening for a new member
    }
  }, [user, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    if (!user) {
      setFormData(defaultFormData); // Clear form after submission if adding a new member
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{user ? 'Edit Member' : 'Add Member'}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <label className="block mb-2">First Name</label>
          <Input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="mb-4 w-full" />

          <label className="block mb-2">Last Name</label>
          <Input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="mb-4 w-full" />

          <label className="block mb-2">Email</label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} className="mb-4 w-full" />

          <label className="block mb-2">Phone</label>
          <Input type="text" name="phone" value={formData.phone} onChange={handleChange} className="mb-4 w-full" />

          <label className="block mb-2">Occupation</label>
          <Input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="mb-4 w-full" />

          <label className="block mb-2">Company</label>
          <Input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="mb-4 w-full" />

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="btn btn-light">Cancel</button>
            <button onClick={handleSubmit} className="btn btn-primary">{user ? 'Save Changes' : 'Add Member'}</button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { MemberModal };