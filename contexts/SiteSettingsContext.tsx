
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { SiteSettings, ApiStatus } from '../types';

interface SiteSettingsContextType {
  settings: SiteSettings | null;
  status: ApiStatus;
  updateSettings: (newSettings: SiteSettings) => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

// In-memory "database" for site settings
const initialSettings: SiteSettings = {
  stats: {
    published: "+500",
    students: "+1000",
    supervisors: "+50",
    issues: "+15",
  },
  about: {
    vision: "أن نكون المنصة الرائدة في نشر الأبحاث العلمية لطلاب طب الأسنان في الوطن العربي، وأن نساهم في تطوير التعليم الطبي وتعزيز البحث العلمي في مجال طب الأسنان.",
    mission: "توفير منصة علمية متميزة لنشر أبحاث خريجي كلية طب الأسنان، وتشجيع البحث العلمي، وتعزيز تبادل المعرفة والخبرات بين الطلاب وأعضاء هيئة التدريس.",
    goal1Title: "تطوير المهارات البحثية",
    goal1Text: "تنمية قدرات الطلاب على إجراء البحوث العلمية المتميزة.",
    goal2Title: "الجودة العلمية",
    goal2Text: "ضمان أعلى معايير الجودة في الأبحاث المنشورة.",
    goal3Title: "نشر المعرفة",
    goal3Text: "إتاحة المعرفة العلمية للمجتمع الطبي والأكاديمي.",
  },
  submission: {
    instructions: "جميع الأبحاث تخضع لمراجعة علمية دقيقة من قبل لجنة متخصصة لضمان جودة المحتوى وأصالته قبل الموافقة على النشر.",
    acceptedTypes: "بحث التخرج\nالحالات السريرية\nالمراجعات العلمية",
    formattingReqs: "الملف بصيغة PDF\nخط Arial أو Times New Roman حجم 12\nمسافة مزدوجة بين الأسطر\nهوامش 2.5 سم من جميع الجهات",
    contents: "العنوان باللغتين العربية والإنجليزية\nالملخص باللغتين (لا يزيد عن 250 كلمة)\nالمقدمة والأهداف\nالمنهجية\nالنتائج والمناقشة\nالخلاصة والتوصيات\nالمراجع",
  },
  contact: {
    address: "كلية طب الأسنان - جامعة القاهرة\nشارع المنيل - القاهرة",
    email: "dental.research@cu.edu.eg",
    phone: "+20 2 2364 6398",
    workingHours: "الأحد - الخميس: 9:00 ص - 3:00 م\nالجمعة - السبت: مغلق",
    facebookUrl: "#",
    instagramUrl: "#",
  },
  faq: [
    { id: "1", question: "كيف يمكنني تقديم بحثي للنشر؟", answer: "يمكنك تقديم بحثك من خلال صفحة إرشادات النشر، أو إرسال الملفات مباشرة على البريد الإلكتروني الرسمي." },
    { id: "2", question: "ما هي معايير قبول الأبحاث؟", answer: "تقبل أبحاث التخرج، الحالات السريرية، والمراجعات العلمية التي تتبع المعايير الأكاديمية المحددة." },
    { id: "3", question: "كم من الوقت يستغرق مراجعة البحث؟", answer: "عادة ما تستغرق عملية المراجعة من 4-6 أسابيع من تاريخ استلام البحث." },
    { id: "4", question: "هل يمكن للطلاب المشاركة في التحرير؟", answer: "نعم، نرحب بالطلاب المتفوقين للانضمام كمساعدي تحرير. تواصل معنا لمعرفة المزيد." },
  ]
};
let settingsDataStore: SiteSettings = { ...initialSettings };

const fetchSettingsFromStore = (): Promise<SiteSettings> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ ...settingsDataStore });
    }, 400);
  });
};

const updateSettingsInStore = (newSettings: SiteSettings): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      settingsDataStore = newSettings;
      resolve();
    }, 500);
  });
};

export const SiteSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [status, setStatus] = useState<ApiStatus>('idle');

  useEffect(() => {
    setStatus('loading');
    fetchSettingsFromStore()
      .then(data => {
        setSettings(data);
        setStatus('succeeded');
      })
      .catch(() => {
        setStatus('failed');
      });
  }, []);

  const updateSettings = async (newSettings: SiteSettings) => {
    await updateSettingsInStore(newSettings);
    const updatedSettings = await fetchSettingsFromStore();
    setSettings(updatedSettings);
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, status, updateSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = (): SiteSettingsContextType => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};