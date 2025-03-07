import React from 'react';
import { VideoItem } from '@/types';

interface PlaylistItemProps {
  video: VideoItem;
  onPlay: (video: VideoItem) => void;
  onDelete: (id: string) => void;
  isActive: boolean;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ 
  video, 
  onPlay, 
  onDelete, 
  isActive 
}) => {
  return (
    <div 
      className={`
        flex items-center justify-between p-3 mb-2 rounded-lg 
        transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800
        ${isActive ? 'bg-gray-100 dark:bg-gray-800 border-l-4 border-blue-500' : 'bg-white dark:bg-gray-900'}
      `}
    >
      <div 
        className="flex-1 truncate pr-2" 
        onClick={() => onPlay(video)}
      >
        <h3 className="font-medium text-sm truncate">{video.title || 'Untitled Video'}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{video.url}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(video.id);
        }}
        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 p-1 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default PlaylistItem; 