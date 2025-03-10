import React, { useState } from 'react';
import { VideoItem } from '@/types';

interface ShareButtonProps {
  video: VideoItem;
}

const ShareButton: React.FC<ShareButtonProps> = ({ video }) => {
  const [copied, setCopied] = useState(false);

  const generateShareLink = () => {
    const url = new URL(window.location.href);
    // 清除之前的查询参数
    url.search = '';
    // 添加视频URL
    url.searchParams.set('url', video.url);
    // 添加视频标题
    url.searchParams.set('title', video.title);
    return url.toString();
  };

  const handleCopyLink = () => {
    const shareLink = generateShareLink();
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };

  return (
    <button
      onClick={handleCopyLink}
      className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm transition-colors"
      title="复制分享链接"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
      <span>{copied ? '已复制!' : '分享'}</span>
    </button>
  );
};

export default ShareButton; 