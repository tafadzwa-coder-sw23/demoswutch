import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import SearchBar from "@/components/ui/search-bar";

interface ScrollableSearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const ScrollableSearchBar = ({ className, placeholder, onSearch }: ScrollableSearchBarProps) => {
  const [isFixed, setIsFixed] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (searchBarRef.current && placeholderRef.current) {
        const searchBarRect = searchBarRef.current.getBoundingClientRect();
        const shouldBeFixed = searchBarRect.top <= 0;
        
        if (shouldBeFixed !== isFixed) {
          setIsFixed(shouldBeFixed);
          
          // When becoming fixed, show the placeholder to maintain layout
          if (shouldBeFixed) {
            placeholderRef.current.style.height = `${searchBarRef.current.offsetHeight}px`;
          } else {
            placeholderRef.current.style.height = '0px';
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFixed]);

  return (
    <>
      {/* Placeholder to maintain layout when search bar becomes fixed */}
      <div ref={placeholderRef} className="transition-all duration-200" />
      
      {/* Search Bar */}
      <div
        ref={searchBarRef}
        className={cn(
          "transition-all duration-200 z-20",
          isFixed 
            ? "fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm" 
            : "relative",
          className
        )}
      >
        <div className={cn(
          "transition-all duration-200",
          isFixed ? "py-4 px-6" : "py-6 px-6"
        )}>
          <div className="max-w-4xl mx-auto">
            <SearchBar
              className="max-w-2xl mx-auto"
              placeholder={placeholder}
              onSearch={onSearch}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollableSearchBar;
