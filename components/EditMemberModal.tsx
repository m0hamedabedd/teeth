import React, { useState, useEffect } from 'react';
import type { EditorialMember } from '../types';

interface EditMemberModalProps {
  member: EditorialMember | null; // null for adding, object for editing
  onClose: () => void;
  onSave: (memberData: Omit<EditorialMember, 'id'>) => void;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({ member, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    specialization: '',
    role: 'هيئة التحرير الرئيسية',
    email: '',
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        title: member.title,
        specialization: member.specialization,
        role: member.role,
        email: member.email || '',
      });
    } else {
      // Reset for new member
      setFormData({
        name: '',
        title: '',
        specialization: '',
        role: 'هيئة التحرير الرئيسية',
        email: '',
      });
    }
  }, [member]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const roles = ["هيئة التحرير الرئيسية", "اللجنة العلمية", "لجنة التحكيم والمراجعة", "مساعدي التحرير"];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-brand-navy">
            {member ? 'تعديل بيانات العضو' : 'إضافة عضو جديد'}
          </h2>
          <button onClick={onClose} aria-label="إغلاق" className="text-gray-400 hover:text-gray-800 text-3xl leading-none">&times;</button>
        </header>
        <form onSubmit={handleSubmit}>
          <main className="p-6 grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">الاسم الكامل</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">المنصب</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">التخصص</label>
              <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">الدور في المجلة</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2.5 bg-gray-100 border-gray-200 border rounded-lg">
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">البريد الإلكتروني (اختياري)</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg" />
            </div>
          </main>
          <footer className="p-4 bg-gray-50 border-t flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">
              إلغاء
            </button>
            <button type="submit" className="px-4 py-2 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue-dark">
              {member ? 'حفظ التغييرات' : 'إضافة العضو'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default EditMemberModal;