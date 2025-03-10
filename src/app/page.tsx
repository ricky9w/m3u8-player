'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// 动态导入视频播放器组件
const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">Loading player...</p>
    </div>
  ),
});

// 将使用 useSearchParams 的逻辑移到一个单独的客户端组件中
import PlayerContent from '@/components/PlayerContent';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <h1 className="text-xl font-bold">M3U8 Player</h1>
          <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">A simple HLS stream player</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={
          <div className="text-center p-4">
            <p>Loading player interface...</p>
          </div>
        }>
          <PlayerContent VideoPlayer={VideoPlayer} />
        </Suspense>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>M3U8 Player &copy; {new Date().getFullYear()} | Built with Next.js and Video.js</p>
        </div>
      </footer>
    </div>
  );
}
