export interface VideoItem {
  id: string;
  url: string;
  title: string;
  addedAt: number;
}

export interface PlaylistState {
  videos: VideoItem[];
  currentVideoId: string | null;
} 