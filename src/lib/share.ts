import type { VideoItem } from './types';

/**
 * Build a shareable URL for a video by re-using the current page's origin +
 * pathname and tacking on `url=` and `title=` query params. Any pre-existing
 * search params are dropped.
 */
export function buildShareLink(
	video: Pick<VideoItem, 'url' | 'title'>,
	base: { origin: string; pathname: string }
): string {
	const params = new URLSearchParams();
	params.set('url', video.url);
	params.set('title', video.title);
	return `${base.origin}${base.pathname}?${params.toString()}`;
}
