import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

interface PageHeaderContextType {
  title: string;
  subtitle: string;
  setHeader: (title: string, subtitle: string) => void;
}

const PageHeaderContext = createContext<PageHeaderContextType | undefined>(undefined);

export const PageHeaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const setHeader = (newTitle: string, newSubtitle: string) => {
    setTitle(newTitle);
    setSubtitle(newSubtitle);
  };

  return (
    <PageHeaderContext.Provider value={{ title, subtitle, setHeader }}>
      {children}
    </PageHeaderContext.Provider>
  );
};

export const usePageHeader = () => {
  const context = useContext(PageHeaderContext);
  if (!context) {
    throw new Error('usePageHeader must be used within a PageHeaderProvider');
  }
  return context;
};
