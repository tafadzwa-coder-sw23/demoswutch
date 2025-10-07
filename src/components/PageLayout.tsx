import React from 'react';
import FixedSearchBar from './FixedSearchBar';
import HeaderControls from './HeaderControls';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
}

const PageLayout = ({ 
  children, 
  title, 
  subtitle, 
  icon, 
  showBackButton = false, 
  onBack,
  className = ""
}: PageLayoutProps) => {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Fixed Search Bar */}
      <FixedSearchBar />

      {/* Header Section */}
      <div className="pt-20 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            {showBackButton && onBack ? (
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            ) : (
              <div />
            )}
            <HeaderControls />
          </div>
          
          {(title || subtitle || icon) && (
            <div className="text-center mb-6">
              {icon && (
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-primary bg-primary/10">
                  {icon}
                </div>
              )}
              {title && (
                <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-lg text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
};

export default PageLayout;
