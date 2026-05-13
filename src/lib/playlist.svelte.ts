import { browser } from '$app/environment';
import type { PlaylistState, VideoItem } from './types';

export const STORAGE_KEY = 'm3u8-player-playlist';

function generateId() {
	return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export interface PlaylistStorage {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
}

export class Playlist {
	videos = $state<VideoItem[]>([]);
	currentVideoId = $state<string | null>(null);

	readonly currentVideo: VideoItem | undefined = $derived(
		this.videos.find((v) => v.id === this.currentVideoId)
	);

	#storage: PlaylistStorage | null;

	constructor(storage: PlaylistStorage | null = browser ? globalThis.localStorage : null) {
		this.#storage = storage;
		this.#hydrate();
	}

	#hydrate() {
		if (!this.#storage) return;
		try {
			const raw = this.#storage.getItem(STORAGE_KEY);
			if (!raw) return;
			const parsed = JSON.parse(raw) as PlaylistState;
			this.videos = parsed.videos ?? [];
			this.currentVideoId = parsed.currentVideoId ?? null;
		} catch (err) {
			console.error('Failed to load playlist from localStorage:', err);
		}
	}

	#persist() {
		if (!this.#storage) return;
		try {
			this.#storage.setItem(
				STORAGE_KEY,
				JSON.stringify({ videos: this.videos, currentVideoId: this.currentVideoId })
			);
		} catch (err) {
			console.error('Failed to save playlist to localStorage:', err);
		}
	}

	addVideo(url: string, title: string) {
		const existing = this.videos.find((v) => v.url === url);
		if (existing) {
			this.currentVideoId = existing.id;
		} else {
			const video: VideoItem = { id: generateId(), url, title, addedAt: Date.now() };
			this.videos = [...this.videos, video];
			this.currentVideoId = video.id;
		}
		this.#persist();
	}

	playVideo(video: VideoItem) {
		this.currentVideoId = video.id;
		this.#persist();
	}

	deleteVideo(id: string) {
		const remaining = this.videos.filter((v) => v.id !== id);
		this.currentVideoId =
			this.currentVideoId === id ? (remaining[0]?.id ?? null) : this.currentVideoId;
		this.videos = remaining;
		this.#persist();
	}
}
