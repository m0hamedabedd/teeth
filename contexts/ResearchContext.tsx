import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { ResearchPaper, ApiStatus } from '../types';
import { INITIAL_RESEARCH_PAPERS } from '../constants';

interface ResearchContextType {
  papers: ResearchPaper[];
  status: ApiStatus;
  addPaper: (paperData: Omit<ResearchPaper, 'id' | 'status'>) => Promise<void>;
  updatePaperStatus: (paperId: number, newStatus: 'approved' | 'rejected') => Promise<void>;
  deletePaper: (paperId: number) => Promise<void>;
  toggleFeaturedStatus: (paperId: number) => Promise<void>;
}

const ResearchContext = createContext<ResearchContextType | undefined>(undefined);

// In-memory "database"
let researchDataStore: ResearchPaper[] = [...INITIAL_RESEARCH_PAPERS];

const fetchPapersFromStore = (): Promise<ResearchPaper[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...researchDataStore]);
    }, 800);
  });
};

const addPaperToStore = (paperData: Omit<ResearchPaper, 'id' | 'status'>): Promise<ResearchPaper> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newId = Math.max(0, ...researchDataStore.map(p => p.id)) + 1;
      const newPaper: ResearchPaper = {
        ...paperData,
        id: newId,
        status: 'pending',
      };
      researchDataStore.push(newPaper);
      resolve(newPaper);
    }, 500);
  });
};

const updatePaperStatusInStore = (paperId: number, newStatus: 'approved' | 'rejected'): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const paperIndex = researchDataStore.findIndex(p => p.id === paperId);
            if (paperIndex > -1) {
                if (newStatus === 'rejected') {
                    // "rejected" means we remove it from the store
                    researchDataStore.splice(paperIndex, 1);
                } else {
                    researchDataStore[paperIndex].status = newStatus;
                }
                resolve();
            } else {
                reject(new Error("Paper not found"));
            }
        }, 300);
    });
}

const deletePaperFromStore = (paperId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const paperIndex = researchDataStore.findIndex(p => p.id === paperId);
            if (paperIndex > -1) {
                researchDataStore.splice(paperIndex, 1);
                resolve();
            } else {
                reject(new Error("Paper not found for deletion"));
            }
        }, 300);
    });
};

const toggleFeaturedInStore = (paperId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const paperIndex = researchDataStore.findIndex(p => p.id === paperId);
            if (paperIndex > -1) {
                researchDataStore[paperIndex].isFeatured = !researchDataStore[paperIndex].isFeatured;
                resolve();
            } else {
                reject(new Error("Paper not found for toggling featured status"));
            }
        }, 300);
    });
};

export const ResearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [status, setStatus] = useState<ApiStatus>('idle');

  useEffect(() => {
    setStatus('loading');
    fetchPapersFromStore()
      .then(data => {
        setPapers(data);
        setStatus('succeeded');
      })
      .catch(() => {
        setStatus('failed');
      });
  }, []);

  const addPaper = async (paperData: Omit<ResearchPaper, 'id' | 'status'>) => {
    await addPaperToStore(paperData);
    // Refetch to update the state
    const updatedPapers = await fetchPapersFromStore();
    setPapers(updatedPapers);
  };

  const updatePaperStatus = async (paperId: number, newStatus: 'approved' | 'rejected') => {
      await updatePaperStatusInStore(paperId, newStatus);
      const updatedPapers = await fetchPapersFromStore();
      setPapers(updatedPapers);
  };

  const deletePaper = async (paperId: number) => {
      await deletePaperFromStore(paperId);
      const updatedPapers = await fetchPapersFromStore();
      setPapers(updatedPapers);
  };

  const toggleFeaturedStatus = async (paperId: number) => {
      await toggleFeaturedInStore(paperId);
      const updatedPapers = await fetchPapersFromStore();
      setPapers(updatedPapers);
  };

  return (
    <ResearchContext.Provider value={{ papers, status, addPaper, updatePaperStatus, deletePaper, toggleFeaturedStatus }}>
      {children}
    </ResearchContext.Provider>
  );
};

export const useResearch = (): ResearchContextType => {
  const context = useContext(ResearchContext);
  if (context === undefined) {
    throw new Error('useResearch must be used within a ResearchProvider');
  }
  return context;
};