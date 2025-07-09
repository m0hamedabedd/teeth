
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { ContactMessage, ApiStatus } from '../types';

interface ContactContextType {
  messages: ContactMessage[];
  status: ApiStatus;
  addMessage: (messageData: Omit<ContactMessage, 'id' | 'status' | 'timestamp'>) => Promise<void>;
  archiveMessage: (messageId: number) => Promise<void>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

// In-memory "database" for contact messages
let contactMessagesStore: ContactMessage[] = [];

const fetchMessagesFromStore = (): Promise<ContactMessage[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...contactMessagesStore]);
    }, 300); // Shorter delay for messages
  });
};

const addMessageToStore = (messageData: Omit<ContactMessage, 'id' | 'status' | 'timestamp'>): Promise<ContactMessage> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newId = Math.max(0, ...contactMessagesStore.map(m => m.id)) + 1;
      const newMessage: ContactMessage = {
        ...messageData,
        id: newId,
        status: 'unread',
        timestamp: new Date(),
      };
      contactMessagesStore.push(newMessage);
      resolve(newMessage);
    }, 500);
  });
};

const archiveMessageInStore = (messageId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const messageIndex = contactMessagesStore.findIndex(m => m.id === messageId);
            if (messageIndex > -1) {
                contactMessagesStore[messageIndex].status = 'archived';
                resolve();
            } else {
                reject(new Error("Message not found"));
            }
        }, 300);
    });
};


export const ContactProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [status, setStatus] = useState<ApiStatus>('idle');

  useEffect(() => {
    setStatus('loading');
    fetchMessagesFromStore()
      .then(data => {
        setMessages(data);
        setStatus('succeeded');
      })
      .catch(() => {
        setStatus('failed');
      });
  }, []);

  const addMessage = async (messageData: Omit<ContactMessage, 'id' | 'status' | 'timestamp'>) => {
    await addMessageToStore(messageData);
    const updatedMessages = await fetchMessagesFromStore();
    setMessages(updatedMessages);
  };

  const archiveMessage = async (messageId: number) => {
      await archiveMessageInStore(messageId);
      const updatedMessages = await fetchMessagesFromStore();
      setMessages(updatedMessages);
  };

  return (
    <ContactContext.Provider value={{ messages, status, addMessage, archiveMessage }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = (): ContactContextType => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
};
