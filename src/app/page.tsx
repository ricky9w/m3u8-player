'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import UrlInput from '@/components/UrlInput';
import Playlist from '@/components/Playlist';
import usePlaylist from '@/hooks/usePlaylist';

// Dynamically import VideoPlayer to avoid SSR issues with Video.js
const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">Loading player...</p>
    </div>
  ),
});

export default function Home() {
  const { 
    videos, 
    currentVideoId, 
    currentVideo, 
    addVideo, 
    playVideo, 
    deleteVideo 
  } = usePlaylist();

  const handleVideoSubmit = (url: string, title: string) => {
    addVideo(url, title);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <h1 className="text-xl font-bold">M3U8 Player</h1>
          <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">A simple HLS stream player</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Enter M3U8 URL</h2>
              <UrlInput onSubmit={handleVideoSubmit} />
            </div>
            
            {currentVideo ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-2">{currentVideo.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 break-all">{currentVideo.url}</p>
                <div className="aspect-video">
                  <VideoPlayer 
                    src={currentVideo.url} 
                    className="w-full h-full"
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
      </main>
      
      <footer className="bg-white dark:bg-gray-800 mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>M3U8 Player &copy; {new Date().getFullYear()} | Built with Next.js and Video.js</p>
        </div>
      </footer>
    </div>
  );
}
