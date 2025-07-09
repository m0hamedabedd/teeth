
import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
      {subtitle && <p className="mt-2 text-lg text-gray-500">{subtitle}</p>}
    </div>
  );
};

export default PageTitle;
