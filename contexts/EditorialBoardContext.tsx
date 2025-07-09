
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { EditorialMember, ApiStatus } from '../types';

interface EditorialBoardContextType {
  members: EditorialMember[];
  status: ApiStatus;
  addMember: (memberData: Omit<EditorialMember, 'id'>) => Promise<void>;
  updateMember: (memberId: number, memberData: Partial<Omit<EditorialMember, 'id'>>) => Promise<void>;
  deleteMember: (memberId: number) => Promise<void>;
}

const EditorialBoardContext = createContext<EditorialBoardContextType | undefined>(undefined);

const INITIAL_MEMBERS: EditorialMember[] = [
    // هيئة التحرير الرئيسية
    { id: 1, name: "أ.د. محمد إبراهيم عبدالله", title: "رئيس التحرير", specialization: "جراحة الفم والوجه والفكين", role: "هيئة التحرير الرئيسية" },
    { id: 2, name: "أ.د. فاطمة أحمد حسن", title: "شريك", specialization: "طب الأسنان", role: "هيئة التحرير الرئيسية" },
    { id: 3, name: "أ.د خالد محمد سالم", title: "مراجع أول", specialization: "تقويم الأسنان", role: "هيئة التحرير الرئيسية" },
    // اللجنة العلمية
    { id: 4, name: "أ.د. سامية عبدالرحمن", title: "أستاذة", specialization: "علاج اللثة", role: "اللجنة العلمية", email: "s.abdelrahman@dentistry.cu.edu.eg" },
    { id: 5, name: "أ.د. وليد أسعد رمضان", title: "دكتور تخصص", specialization: "تقويم الأسنان", role: "اللجنة العلمية", email: "w.a.ramadan@dentistry.cu.edu.eg" },
    { id: 6, name: "أ.د. ليلى محمد عبدالحميد", title: "أستاذ مساعد", specialization: "علاج الفم والأسنان", role: "اللجنة العلمية", email: "l.m.abdelhamid@dentistry.cu.edu.eg" },
    { id: 7, name: "أ.د. أمل سعيد إبراهيم", title: "دكتوراه", specialization: "علاج الجذور", role: "اللجنة العلمية", email: "a.s.ibrahim@dentistry.cu.edu.eg" },
    { id: 8, name: "أ.د. وليد صلاح", title: "أستاذ", specialization: "تقويم الأسنان", role: "اللجنة العلمية", email: "w.salah@dentistry.cu.edu.eg" },
    { id: 9, name: "أ.د. منى حسام فتحي", title: "أستاذ", specialization: "طب أسنان الأطفال", role: "اللجنة العلمية", email: "m.h.fathy@dentistry.cu.edu.eg" },
    // لجنة التحكيم والمراجعة
    { id: 10, name: "د. شاذة محمود أسعد", title: "مراجع أسنان", specialization: "جراحة الفم والوجه والفكين", role: "لجنة التحكيم والمراجعة" },
    { id: 11, name: "د. سعد عبدالله يحيى", title: "طبيب أسنان", specialization: "جراحة الفم", role: "لجنة التحكيم والمراجعة" },
    { id: 12, name: "د. نور الدين سالم", title: "مراجع طبي", specialization: "طب الأسنان", role: "لجنة التحكيم والمراجعة" },
    { id: 13, name: "د. أسعد رمضان نظمي", title: "طبيب فعال", specialization: "علاج فعال", role: "لجنة التحكيم والمراجعة" },
    // مساعدي التحرير
    { id: 14, name: "سارة أسعد محمد", title: "طالبة امتياز", specialization: "دفعة 2024", role: "مساعدي التحرير" },
    { id: 15, name: "محمود حسن علي", title: "طالب ماجستير", specialization: "دفعة 2025", role: "مساعدي التحرير" },
    { id: 16, name: "مريم وليد سالم", title: "طالبة دكتوراه", specialization: "دفعة 2024", role: "مساعدي التحرير" },
];


let boardDataStore: EditorialMember[] = [...INITIAL_MEMBERS];

const fetchMembersFromStore = (): Promise<EditorialMember[]> => {
  return new Promise(resolve => setTimeout(() => resolve([...boardDataStore]), 600));
};

const addMemberToStore = (memberData: Omit<EditorialMember, 'id'>): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newId = Math.max(0, ...boardDataStore.map(m => m.id)) + 1;
      boardDataStore.push({ ...memberData, id: newId });
      resolve();
    }, 300);
  });
};

const updateMemberInStore = (memberId: number, memberData: Partial<Omit<EditorialMember, 'id'>>): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = boardDataStore.findIndex(m => m.id === memberId);
      if (index > -1) {
        boardDataStore[index] = { ...boardDataStore[index], ...memberData };
        resolve();
      } else {
        reject(new Error("Member not found"));
      }
    }, 300);
  });
};

const deleteMemberFromStore = (memberId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = boardDataStore.findIndex(m => m.id === memberId);
      if (index > -1) {
        boardDataStore.splice(index, 1);
        resolve();
      } else {
        reject(new Error("Member not found"));
      }
    }, 300);
  });
};

export const EditorialBoardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<EditorialMember[]>([]);
  const [status, setStatus] = useState<ApiStatus>('idle');

  const refreshMembers = async () => {
    setStatus('loading');
    try {
      const data = await fetchMembersFromStore();
      setMembers(data);
      setStatus('succeeded');
    } catch {
      setStatus('failed');
    }
  };

  useEffect(() => {
    refreshMembers();
  }, []);

  const addMember = async (memberData: Omit<EditorialMember, 'id'>) => {
    await addMemberToStore(memberData);
    await refreshMembers();
  };

  const updateMember = async (memberId: number, memberData: Partial<Omit<EditorialMember, 'id'>>) => {
    await updateMemberInStore(memberId, memberData);
    await refreshMembers();
  };

  const deleteMember = async (memberId: number) => {
    await deleteMemberFromStore(memberId);
    await refreshMembers();
  };

  return (
    <EditorialBoardContext.Provider value={{ members, status, addMember, updateMember, deleteMember }}>
      {children}
    </EditorialBoardContext.Provider>
  );
};

export const useEditorialBoard = (): EditorialBoardContextType => {
  const context = useContext(EditorialBoardContext);
  if (context === undefined) {
    throw new Error('useEditorialBoard must be used within a EditorialBoardProvider');
  }
  return context;
};