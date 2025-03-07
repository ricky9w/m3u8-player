import React from 'react';
import { VideoItem } from '@/types';
import PlaylistItem from './PlaylistItem';

interface PlaylistProps {
  videos: VideoItem[];
  currentVideoId: string | null;
  onPlayVideo: (video: VideoItem) => void;
  onDeleteVideo: (id: string) => void;
}

const Playlist: React.FC<PlaylistProps> = ({
  videos,
  currentVideoId,
  onPlayVideo,
  onDeleteVideo
}) => {
  if (videos.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium mb-1">No videos yet</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter an M3U8 URL above to start watching
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Playlist ({videos.length})</h2>
      </div>
      <div className="space-y-2">
        {videos.map((video) => (
          <PlaylistItem
            key={video.id}
            video={video}
            onPlay={onPlayVideo}
            onDelete={onDeleteVideo}
            isActive={video.id === currentVideoId}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist; 