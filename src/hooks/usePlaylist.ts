import { useState, useEffect, useCallback } from 'react';
import { VideoItem, PlaylistState } from '@/types';

const STORAGE_KEY = 'm3u8-player-playlist';

// Generate a unique ID for each playlist item
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const usePlaylist = () => {
  const [state, setState] = useState<PlaylistState>({
    videos: [],
    currentVideoId: null,
  });

  // Load playlist from localStorage on component mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        setState(JSON.parse(savedState));
      }
    } catch (error) {
      console.error('Failed to load playlist from localStorage:', error);
    }
  }, []);

  // Save playlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save playlist to localStorage:', error);
    }
  }, [state]);

  // Add a video to the playlist and set it as current
  const addVideo = useCallback((url: string, title: string) => {
    setState(prevState => {
      const existingVideo = prevState.videos.find(video => video.url === url);
      
      if (existingVideo) {
        return {
          ...prevState,
          currentVideoId: existingVideo.id
        };
      }
      
      const newVideo: VideoItem = {
        id: generateId(),
        url,
        title,
        addedAt: Date.now()
      };
      
      return {
        videos: [...prevState.videos, newVideo],
        currentVideoId: newVideo.id
      };
    });
  }, []);

  // Play a specific video from the playlist
  const playVideo = useCallback((video: VideoItem) => {
    setState(prevState => ({
      ...prevState,
      currentVideoId: video.id
    }));
  }, []);

  // Delete a video from the playlist
  const deleteVideo = useCallback((id: string) => {
    setState(prevState => {
      const newVideos = prevState.videos.filter(video => video.id !== id);
      const newCurrentId = prevState.currentVideoId === id
        ? (newVideos.length > 0 ? newVideos[0].id : null)
        : prevState.currentVideoId;
      
      return {
        videos: newVideos,
        currentVideoId: newCurrentId
      };
    });
  }, []);

  // Get the current video object
  const getCurrentVideo = (): VideoItem | undefined => {
    if (!state.currentVideoId) return undefined;
    return state.videos.find(video => video.id === state.currentVideoId);
  };

  return {
    videos: state.videos,
    currentVideoId: state.currentVideoId,
    currentVideo: getCurrentVideo(),
    addVideo,
    playVideo,
    deleteVideo
  };
};

export default usePlaylist; 