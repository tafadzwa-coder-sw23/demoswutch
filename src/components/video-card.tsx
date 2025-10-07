import React, { useState, useRef } from "react";
import { Heart, MessageCircle, Share, Play, Pause, Volume2, VolumeX, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Video } from "@/data/videos";
import { useNavigate } from "react-router-dom";

interface VideoCardProps {
  video: Video;
  isActive?: boolean;
  onVideoClick?: (videoId: string) => void;
  size?: 'normal' | 'large' | 'wide';
  className?: string;
}

const VideoCard = ({ video, isActive = false, onVideoClick, size = 'normal', className }: VideoCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoClick = () => {
    onVideoClick?.(video.id);
    // Navigate to individual product page instead of category page
    navigate(`/product/${video.id}`);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'large':
        return "aspect-[16/9]"; // Wide format for large videos
      case 'wide':
        return "aspect-[21/9]"; // Extra wide format
      default:
        return "aspect-[9/16]"; // Standard mobile format
    }
  };

  return (
    <div
      className={cn(
        "relative w-full bg-black rounded-2xl overflow-hidden cursor-pointer group border-2 border-gray-200/10 shadow-2xl",
        getSizeClasses(),
        isActive && "ring-4 ring-primary shadow-3xl scale-105",
        "hover:shadow-3xl hover:scale-105 transition-all duration-500 ease-out",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        className
      )}
      onClick={handleVideoClick}
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={video.video.url}
        poster={video.video.thumbnail}
        muted={isMuted}
        loop
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Play/Pause Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/60 via-transparent to-black/20">
        <Button
          variant="secondary"
          size="lg"
          className="rounded-full w-20 h-20 bg-white/95 hover:bg-white shadow-2xl border-4 border-white/20 hover:scale-110 transition-all duration-300"
          onClick={handlePlayPause}
        >
          {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
        </Button>
      </div>

      {/* Mute/Unmute Button */}
      <Button
        variant="secondary"
        size="sm"
        className="absolute top-4 right-4 rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/20"
        onClick={handleMuteToggle}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </Button>

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-20 flex flex-col gap-3">
        <Button
          variant="secondary"
          size="sm"
          className={cn(
            "rounded-full w-14 h-14 p-0 transition-all duration-300 bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/20 hover:scale-110",
            isLiked && "text-red-500 bg-red-500/20 border-red-500/30"
          )}
          onClick={handleLike}
        >
          <Heart className={cn("w-6 h-6", isLiked && "fill-current")} />
        </Button>

        <Button
          variant="secondary"
          size="sm"
          className="rounded-full w-14 h-14 p-0 bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/20 hover:scale-110 transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>

        <Button
          variant="secondary"
          size="sm"
          className="rounded-full w-14 h-14 p-0 bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/20 hover:scale-110 transition-all duration-300"
        >
          <Share className="w-6 h-6" />
        </Button>

        <Button
          variant="secondary"
          size="sm"
          className="rounded-full w-14 h-14 p-0 bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/20 hover:scale-110 transition-all duration-300"
        >
          <MoreHorizontal className="w-6 h-6" />
        </Button>
      </div>

      {/* Stats Overlay */}
      <div className="absolute right-4 bottom-4 text-white text-right bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
        <div className="text-lg font-bold">{formatNumber(video.stats.likes)}</div>
        <div className="text-xs opacity-90">likes</div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-5 backdrop-blur-sm">
        {/* User Info */}
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-12 h-12 border-3 border-white/30 shadow-lg">
            <AvatarImage src={video.user.avatar} alt={video.user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              {video.user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-bold text-base">{video.user.name}</span>
              {video.user.verified && (
                <Badge variant="secondary" className="text-xs px-2 py-0 bg-blue-500/20 text-blue-300 border-blue-400/30">
                  ✓ Verified
                </Badge>
              )}
            </div>
            <div className="text-white/80 text-sm">{video.user.location}</div>
          </div>
        </div>

        {/* Product Info */}
        <div className="mb-3">
          <h3 className="text-white font-bold text-lg mb-2">{video.product.title}</h3>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline" className="text-sm border-white/40 text-white bg-white/10 backdrop-blur-sm px-3 py-1">
              {video.product.category}
            </Badge>
            <span className="text-white font-bold text-xl">
              {video.product.currency} {video.product.price}
            </span>
          </div>
          <p className={cn(
            "text-white/90 text-xs leading-relaxed",
            !showFullDescription && "line-clamp-2"
          )}>
            {video.product.description}
          </p>
          {video.product.description.length > 100 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 text-xs p-0 h-auto mt-1"
              onClick={(e) => {
                e.stopPropagation();
                setShowFullDescription(!showFullDescription);
              }}
            >
              {showFullDescription ? "Show less" : "Show more"}
            </Button>
          )}
        </div>

        {/* Timestamp */}
        <div className="text-white/60 text-xs">
          {video.timestamp}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
