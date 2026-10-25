import React, { useEffect, useRef, useState } from 'react';

interface ScrollZoomSectionProps {
  children: React.ReactNode;
  className?: string;
  effect?: 'zoom-in' | 'zoom-out' | 'fade-zoom';
  threshold?: number;
}

export const ScrollZoomSection: React.FC<ScrollZoomSectionProps> = ({
  children,
  className = '',
  effect = 'zoom-in',
  threshold = 0.15
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Re-animate when scrolling past and returning (zoom out effect)
            setIsVisible(false);
          }
        });
      },
      { threshold }
    );

    const current = domRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [threshold]);

  const getTransformClasses = () => {
    if (effect === 'zoom-in') {
      return isVisible
        ? 'opacity-100 scale-100 translate-y-0 filter blur-none'
        : 'opacity-0 scale-92 translate-y-8 filter blur-[1px]';
    }
    if (effect === 'zoom-out') {
      return isVisible
        ? 'opacity-100 scale-100'
        : 'opacity-0 scale-108';
    }
    // fade-zoom
    return isVisible
      ? 'opacity-100 scale-100'
      : 'opacity-0 scale-95';
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${getTransformClasses()} ${className}`}
    >
      {children}
    </div>
  );
};
