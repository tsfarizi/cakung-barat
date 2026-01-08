import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import PageHeader from '../components/PageHeader';
import PageTransition from '../components/PageTransition';
import { usePageHeader } from '../contexts/PageHeaderContext';

const MainLayout: React.FC = () => {
  const { title, subtitle } = usePageHeader();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      {title && subtitle && <PageHeader title={title} subtitle={subtitle} />}
      <main className="w-full">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname} className="w-full">
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default MainLayout;
