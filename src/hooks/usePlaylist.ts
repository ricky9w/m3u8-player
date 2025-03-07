import { useState, useEffect } from 'react';
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
  const addVideo = (url: string, title: string) => {
    const existingVideo = state.videos.find(video => video.url === url);
    
    if (existingVideo) {
      setState({
        ...state,
        currentVideoId: existingVideo.id
      });
      return;
    }
    
    const newVideo: VideoItem = {
      id: generateId(),
      url,
      title,
      addedAt: Date.now()
    };
    
    setState({
      videos: [...state.videos, newVideo],
      currentVideoId: newVideo.id
    });
  };

  // Play a specific video from the playlist
  const playVideo = (video: VideoItem) => {
    setState({
      ...state,
      currentVideoId: video.id
    });
  };

  // Delete a video from the playlist
  const deleteVideo = (id: string) => {
    const newVideos = state.videos.filter(video => video.id !== id);
    const newCurrentId = state.currentVideoId === id
      ? (newVideos.length > 0 ? newVideos[0].id : null)
      : state.currentVideoId;
    
    setState({
      videos: newVideos,
      currentVideoId: newCurrentId
    });
  };

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