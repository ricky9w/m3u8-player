import React, { useState } from 'react';

interface UrlInputProps {
  onSubmit: (url: string, title: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!url.trim().endsWith('.m3u8')) {
      setError('URL must end with .m3u8');
      return;
    }

    onSubmit(url.trim(), title.trim() || 'Untitled');
    setUrl('');
    setTitle('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title (optional)
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Video title"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
        />
      </div>
      
      <div className="mb-2">
        <label htmlFor="url" className="block text-sm font-medium mb-1">
          M3U8 URL
        </label>
        <div className="flex items-center">
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
            placeholder="https://example.com/video.m3u8"
            className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-r-lg transition-colors"
          >
            Play
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </form>
  );
};

export default UrlInput; 