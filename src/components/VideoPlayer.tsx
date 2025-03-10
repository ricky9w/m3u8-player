import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import type Player from 'video.js/dist/types/player';

interface VideoPlayerProps {
  src: string;
  onVideoEnd?: () => void;
  className?: string;
  autoPlay?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  src, 
  onVideoEnd, 
  className,
  autoPlay = false 
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current && videoRef.current) {
      // Initialize the Video.js player
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      playerRef.current = videojs(videoElement, {
        autoplay: autoPlay,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src,
          type: 'application/x-mpegURL'
        }]
      });

      // Add event listener for video end
      if (onVideoEnd) {
        playerRef.current.on('ended', onVideoEnd);
      }
    } else if (playerRef.current) {
      // Update the player source if it already exists
      playerRef.current.src([{
        src,
        type: 'application/x-mpegURL'
      }]);
    }

    return () => {
      // Dispose the Video.js player when component unmounts
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src, onVideoEnd, autoPlay]);

  return (
    <div data-vjs-player className={className}>
      <div ref={videoRef} className="w-full h-full rounded-lg overflow-hidden" />
    </div>
  );
};

export default VideoPlayer; 