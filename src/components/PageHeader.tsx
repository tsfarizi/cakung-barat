import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  // Import hero background image
  const heroBg = new URL('/hero-bg.jpg', import.meta.url).href;
  
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(44,90,160,.6),rgba(44,90,160,.6)),url(${heroBg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <section
      className="w-full text-white text-center py-12 px-5 relative"
      style={heroStyle}
    >
      <div className="relative z-10">
        <h1 className="text-2xl z-10 relative">{title}</h1>
        <p className="z-10 relative">{subtitle}</p>
      </div>
    </section>
  );
};

export default PageHeader;
