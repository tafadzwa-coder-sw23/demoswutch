import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface SkeletonLoaderProps {
  type?: 'card' | 'list' | 'grid' | 'text';
  count?: number;
  className?: string;
}

const SkeletonLoader = ({ type = 'card', count = 1, className = '' }: SkeletonLoaderProps) => {
  const SkeletonCard = () => (
    <Card className="animate-pulse">
      <div className="aspect-video bg-muted rounded-t-lg"></div>
      <CardContent className="p-4">
        <div className="h-4 bg-muted rounded mb-2"></div>
        <div className="h-3 bg-muted rounded mb-3 w-2/3"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-muted rounded w-16"></div>
          <div className="h-8 bg-muted rounded w-20"></div>
        </div>
      </CardContent>
    </Card>
  );

  const SkeletonList = () => (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg animate-pulse">
          <div className="w-16 h-16 bg-muted rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
            <div className="h-3 bg-muted rounded w-1/3"></div>
          </div>
          <div className="h-8 bg-muted rounded w-20"></div>
        </div>
      ))}
    </div>
  );

  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );

  const SkeletonText = () => (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-4 bg-muted rounded" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
      ))}
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'list':
        return <SkeletonList />;
      case 'grid':
        return <SkeletonGrid />;
      case 'text':
        return <SkeletonText />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        );
    }
  };

  return (
    <div className={className}>
      {renderSkeleton()}
    </div>
  );
};

export default SkeletonLoader;
