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
      className="w-full text-white text-center py-24 md:py-32 px-5 relative -mt-24"
      style={heroStyle}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl md:text-4xl font-bold z-10 mb-4 animate-scratch">{title}</h1>
        <p className="text-lg md:text-xl z-10 animate-scratch-delay-100">{subtitle}</p>
      </div>
    </section>
  );
};

export default PageHeader;