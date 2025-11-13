import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import PageHeader from '../components/PageHeader';
import { usePageHeader } from '../contexts/PageHeaderContext';

const MainLayout: React.FC = () => {
  const { title, subtitle } = usePageHeader();

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      {title && subtitle && <PageHeader title={title} subtitle={subtitle} />}
      <main className="w-full">
        <Outlet />
      </main>
      <Footer />
      {/* Chatbot component commented out until server integration is ready */}
      {/* <Chatbot /> */}
    </div>
  );
};

export default MainLayout;
