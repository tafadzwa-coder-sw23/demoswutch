import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  Type, 
  MousePointer,
  Keyboard,
  Focus
} from 'lucide-react';

interface AccessibilityEnhancerProps {
  children: React.ReactNode;
}

const AccessibilityEnhancer = ({ children }: AccessibilityEnhancerProps) => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isScreenReader, setIsScreenReader] = useState(false);
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);

  useEffect(() => {
    // Check for user preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReducedMotion);

    // Check for screen reader
    const hasScreenReader = window.speechSynthesis && window.speechSynthesis.getVoices().length > 0;
    setIsScreenReader(hasScreenReader);

    // Apply initial styles
    applyAccessibilityStyles();
  }, []);

  const applyAccessibilityStyles = () => {
    const root = document.documentElement;
    
    if (isHighContrast) {
      root.style.setProperty('--background', '#000000');
      root.style.setProperty('--foreground', '#ffffff');
      root.style.setProperty('--primary', '#ffff00');
      root.style.setProperty('--border', '#ffffff');
    } else {
      root.style.removeProperty('--background');
      root.style.removeProperty('--foreground');
      root.style.removeProperty('--primary');
      root.style.removeProperty('--border');
    }

    if (isLargeText) {
      root.style.setProperty('--font-size-base', '18px');
      root.style.setProperty('--font-size-sm', '16px');
      root.style.setProperty('--font-size-lg', '22px');
    } else {
      root.style.removeProperty('--font-size-base');
      root.style.removeProperty('--font-size-sm');
      root.style.removeProperty('--font-size-lg');
    }

    if (isReducedMotion) {
      root.style.setProperty('--transition-duration', '0ms');
      root.style.setProperty('--animation-duration', '0ms');
    } else {
      root.style.removeProperty('--transition-duration');
      root.style.removeProperty('--animation-duration');
    }
  };

  useEffect(() => {
    applyAccessibilityStyles();
  }, [isHighContrast, isLargeText, isReducedMotion]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Skip to main content
    if (event.key === 'Tab' && event.shiftKey && event.target === document.body) {
      const mainContent = document.querySelector('main');
      if (mainContent) {
        (mainContent as HTMLElement).focus();
        event.preventDefault();
      }
    }

    // Escape key to close modals
    if (event.key === 'Escape') {
      const modals = document.querySelectorAll('[role="dialog"]');
      const lastModal = modals[modals.length - 1] as HTMLElement;
      if (lastModal) {
        lastModal.focus();
      }
    }
  };

  return (
    <div onKeyDown={handleKeyDown} className="accessibility-enhanced">
      {/* Skip Links */}
      <div className="sr-only">
        <a 
          href="#main-content" 
          className="skip-link"
          onFocus={(e) => e.target.classList.remove('sr-only')}
          onBlur={(e) => e.target.classList.add('sr-only')}
        >
          Skip to main content
        </a>
        <a 
          href="#navigation" 
          className="skip-link"
          onFocus={(e) => e.target.classList.remove('sr-only')}
          onBlur={(e) => e.target.classList.add('sr-only')}
        >
          Skip to navigation
        </a>
      </div>

      {/* Accessibility Panel */}
      {showAccessibilityPanel && (
        <Card className="fixed top-4 right-4 z-50 w-80 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Focus className="h-5 w-5" />
              Accessibility Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">High Contrast</span>
              <Button
                variant={isHighContrast ? "default" : "outline"}
                size="sm"
                onClick={() => setIsHighContrast(!isHighContrast)}
              >
                {isHighContrast ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Large Text</span>
              <Button
                variant={isLargeText ? "default" : "outline"}
                size="sm"
                onClick={() => setIsLargeText(!isLargeText)}
              >
                <Type className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Screen Reader</span>
              <Button
                variant={isScreenReader ? "default" : "outline"}
                size="sm"
                onClick={() => speakText('Screen reader mode activated')}
              >
                {isScreenReader ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Reduced Motion</span>
              <Button
                variant={isReducedMotion ? "default" : "outline"}
                size="sm"
                onClick={() => setIsReducedMotion(!isReducedMotion)}
              >
                <MousePointer className="h-4 w-4" />
              </Button>
            </div>

            <div className="pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  announceToScreenReader('Accessibility options updated');
                  speakText('Accessibility options have been updated');
                }}
              >
                <Keyboard className="h-4 w-4 mr-2" />
                Test Screen Reader
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Accessibility Toggle Button */}
      <Button
        className="fixed bottom-20 right-4 z-40 rounded-full shadow-lg"
        size="icon"
        onClick={() => setShowAccessibilityPanel(!showAccessibilityPanel)}
        aria-label="Accessibility Options"
      >
        <Focus className="h-5 w-5" />
      </Button>

      {/* Main Content */}
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>

      <style jsx>{`
        .skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: var(--primary);
          color: var(--background);
          padding: 8px;
          text-decoration: none;
          border-radius: 4px;
          z-index: 1000;
        }
        
        .skip-link:focus {
          top: 6px;
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .accessibility-enhanced {
          ${isReducedMotion ? `
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          ` : ''}
        }
      `}</style>
    </div>
  );
};

export default AccessibilityEnhancer;
