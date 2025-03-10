'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import UrlInput from '@/components/UrlInput';
import Playlist from '@/components/Playlist';
import ShareButton from '@/components/ShareButton';
import usePlaylist from '@/hooks/usePlaylist';
import type { ComponentType } from 'react';

interface PlayerContentProps {
  VideoPlayer: ComponentType<{
    src: string;
    className?: string;
    autoPlay?: boolean;
  }>;
}

export default function PlayerContent({ VideoPlayer }: PlayerContentProps) {
  const searchParams = useSearchParams();
  const [autoPlayFromUrl, setAutoPlayFromUrl] = useState(false);
  
  const { 
    videos, 
    currentVideoId, 
    currentVideo, 
    addVideo, 
    playVideo, 
    deleteVideo 
  } = usePlaylist();

  // 处理URL参数中的视频链接
  useEffect(() => {
    const urlParam = searchParams.get('url');
    const titleParam = searchParams.get('title') || '来自链接分享的视频';
    
    if (urlParam && urlParam.trim().endsWith('.m3u8')) {
      // 在组件挂载后检查URL是否包含视频链接，如果有则添加并播放
      addVideo(urlParam.trim(), titleParam);
      setAutoPlayFromUrl(true);
    }
  }, [searchParams, addVideo]);

  const handleVideoSubmit = (url: string, title: string) => {
    addVideo(url, title);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Enter M3U8 URL</h2>
          <UrlInput onSubmit={handleVideoSubmit} />
        </div>
        
        {currentVideo ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold">{currentVideo.title}</h2>
              <ShareButton video={currentVideo} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 break-all">{currentVideo.url}</p>
            <div className="aspect-video">
              <VideoPlayer 
                src={currentVideo.url}
                className="w-full h-full"
                autoPlay={autoPlayFromUrl}
              />
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 aspect-video flex flex-col items-center justify-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-medium mb-2">No video selected</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Enter an M3U8 URL above to start playing, or select a video from your playlist.
            </p>
          </div>
        )}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-[calc(100vh-10rem)] flex flex-col">
        <Playlist
          videos={videos}
          currentVideoId={currentVideoId}
          onPlayVideo={playVideo}
          onDeleteVideo={deleteVideo}
        />
      </div>
    </div>
  );
} 