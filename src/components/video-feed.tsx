import React, { useState, useEffect, useCallback, useRef } from "react";
import VideoCard from "./video-card";
import { mockVideos, generateMoreVideos, Video } from "@/data/videos";
import { cn } from "@/lib/utils";

interface VideoFeedProps {
  className?: string;
}

const VideoFeed = ({ className }: VideoFeedProps) => {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadMoreVideos = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newVideos = generateMoreVideos(5);
    setVideos(prev => [...prev, ...newVideos]);
    setLoading(false);

    // Stop loading more after 50 videos for demo purposes
    if (videos.length + newVideos.length >= 50) {
      setHasMore(false);
    }
  }, [loading, hasMore, videos.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMoreVideos();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreVideos]);

  const handleVideoClick = (videoId: string) => {
    setActiveVideoId(videoId);
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Mobile: Single column with enhanced spacing */}
      <div className="block md:hidden space-y-6">
        {videos.map((video, index) => (
          <div 
            key={video.id}
            className="relative group"
            style={{
              transform: `translateY(${index * 2}px)`,
            }}
          >
            <VideoCard
              video={video}
              isActive={activeVideoId === video.id}
              onVideoClick={handleVideoClick}
              size="normal"
              className="hover:scale-[1.02] transition-all duration-500 ease-out shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-primary/20"
            />
          </div>
        ))}
      </div>

      {/* Desktop: Enhanced overlapping layout */}
      <div className="hidden md:block relative min-h-[700px]">
        {videos.map((video, index) => {
          // Create overlapping effect with different z-index and positioning
          const isLeft = index % 2 === 0;
          const zIndex = videos.length - index; // Higher z-index for newer videos
          const offset = index * 16; // Increased offset for better overlap
          const staggerOffset = isLeft ? 0 : 8; // Slight horizontal stagger
          const rotation = (index % 3 - 1) * 0.5; // Subtle rotation variation
          
          return (
            <div 
              key={video.id}
              className={`absolute ${
                isLeft ? 'left-0' : 'right-0'
              }`}
              style={{
                zIndex: zIndex,
                transform: `translateY(${offset}px) translateX(${staggerOffset}px) rotate(${rotation}deg)`,
                width: 'calc(50% - 20px)',
                margin: isLeft ? '0 20px 0 0' : '0 0 0 20px'
              }}
            >
              <VideoCard
                video={video}
                isActive={activeVideoId === video.id}
                onVideoClick={handleVideoClick}
                size="normal"
                className="hover:scale-110 hover:rotate-0 hover:z-50 transition-all duration-500 ease-out shadow-2xl hover:shadow-3xl border-2 border-transparent hover:border-primary/30 backdrop-blur-sm"
              />
            </div>
          );
        })}
        
        {/* Spacer to maintain layout height */}
        <div style={{ height: `${videos.length * 16 + 600}px` }}></div>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Load more trigger */}
      {hasMore && !loading && (
        <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
          <div className="text-sm text-muted-foreground">Loading more videos...</div>
        </div>
      )}

      {/* End of feed */}
      {!hasMore && videos.length > 0 && (
        <div className="text-center py-8">
          <div className="text-sm text-muted-foreground">
            You've reached the end! 🎉
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;
