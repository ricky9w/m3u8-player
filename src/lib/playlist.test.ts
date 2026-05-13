import { beforeEach, describe, expect, it } from 'vitest';
import { Playlist, STORAGE_KEY, type PlaylistStorage } from './playlist.svelte';

function createMemoryStorage(): PlaylistStorage & { data: Map<string, string> } {
	const data = new Map<string, string>();
	return {
		data,
		getItem: (k) => data.get(k) ?? null,
		setItem: (k, v) => {
			data.set(k, v);
		}
	};
}

describe('Playlist', () => {
	let storage: ReturnType<typeof createMemoryStorage>;
	let playlist: Playlist;

	beforeEach(() => {
		storage = createMemoryStorage();
		playlist = new Playlist(storage);
	});

	it('starts empty when storage has no prior state', () => {
		expect(playlist.videos).toEqual([]);
		expect(playlist.currentVideoId).toBeNull();
		expect(playlist.currentVideo).toBeUndefined();
	});

	it('adds a new video and makes it current', () => {
		playlist.addVideo('https://example.com/a.m3u8', 'A');
		expect(playlist.videos).toHaveLength(1);
		expect(playlist.videos[0].url).toBe('https://example.com/a.m3u8');
		expect(playlist.videos[0].title).toBe('A');
		expect(playlist.currentVideoId).toBe(playlist.videos[0].id);
		expect(playlist.currentVideo).toEqual(playlist.videos[0]);
	});

	it('deduplicates by URL and just swaps current', () => {
		playlist.addVideo('https://example.com/a.m3u8', 'A');
		playlist.addVideo('https://example.com/b.m3u8', 'B');
		const firstId = playlist.videos[0].id;

		playlist.addVideo('https://example.com/a.m3u8', 'A-again');

		expect(playlist.videos).toHaveLength(2);
		expect(playlist.currentVideoId).toBe(firstId);
		expect(playlist.videos[0].title).toBe('A');
	});

	it('playVideo updates currentVideoId', () => {
		playlist.addVideo('https://example.com/a.m3u8', 'A');
		playlist.addVideo('https://example.com/b.m3u8', 'B');
		const first = playlist.videos[0];

		playlist.playVideo(first);
		expect(playlist.currentVideoId).toBe(first.id);
		expect(playlist.currentVideo).toEqual(first);
	});

	it('deleteVideo removes the entry and keeps current when other is current', () => {
		playlist.addVideo('https://example.com/a.m3u8', 'A');
		playlist.addVideo('https://example.com/b.m3u8', 'B');
		const [a, b] = playlist.videos;

		playlist.deleteVideo(a.id);

		expect(playlist.videos).toHaveLength(1);
		expect(playlist.videos[0]).toEqual(b);
		expect(playlist.currentVideoId).toBe(b.id);
	});

	it('deleteVideo bumps current to first remaining when current was deleted', () => {
		playlist.addVideo('https://example.com/a.m3u8', 'A');
		playlist.addVideo('https://example.com/b.m3u8', 'B');
		playlist.addVideo('https://example.com/c.m3u8', 'C');
		const [a, , c] = playlist.videos;

		playlist.deleteVideo(c.id);

		expect(playlist.videos).toHaveLength(2);
		expect(playlist.currentVideoId).toBe(a.id);
	});

	it('deleteVideo sets currentVideoId to null when last item removed', () => {
		playlist.addVideo('https://example.com/a.m3u8', 'A');
		const [a] = playlist.videos;

		playlist.deleteVideo(a.id);

		expect(playlist.videos).toEqual([]);
		expect(playlist.currentVideoId).toBeNull();
		expect(playlist.currentVideo).toBeUndefined();
	});

	it('persists state to storage after mutations', () => {
		playlist.addVideo('https://example.com/a.m3u8', 'A');
		const stored = storage.data.get(STORAGE_KEY);
		expect(stored).toBeTruthy();
		const parsed = JSON.parse(stored!);
		expect(parsed.videos).toHaveLength(1);
		expect(parsed.currentVideoId).toBe(playlist.videos[0].id);
	});

	it('hydrates from existing storage on construction', () => {
		storage.data.set(
			STORAGE_KEY,
			JSON.stringify({
				videos: [{ id: 'x1', url: 'https://example.com/x.m3u8', title: 'X', addedAt: 1 }],
				currentVideoId: 'x1'
			})
		);

		const hydrated = new Playlist(storage);
		expect(hydrated.videos).toHaveLength(1);
		expect(hydrated.videos[0].url).toBe('https://example.com/x.m3u8');
		expect(hydrated.currentVideoId).toBe('x1');
		expect(hydrated.currentVideo?.title).toBe('X');
	});

	it('tolerates corrupt storage payloads', () => {
		storage.data.set(STORAGE_KEY, '{not json');
		const hydrated = new Playlist(storage);
		expect(hydrated.videos).toEqual([]);
		expect(hydrated.currentVideoId).toBeNull();
	});
});
