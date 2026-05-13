import { describe, expect, it } from 'vitest';
import { buildShareLink } from './share';

describe('buildShareLink', () => {
	it('produces an origin/pathname URL with url + title query params', () => {
		const link = buildShareLink(
			{ url: 'https://example.com/stream.m3u8', title: 'My stream' },
			{ origin: 'https://app.example.com', pathname: '/' }
		);

		const parsed = new URL(link);
		expect(parsed.origin).toBe('https://app.example.com');
		expect(parsed.pathname).toBe('/');
		expect(parsed.searchParams.get('url')).toBe('https://example.com/stream.m3u8');
		expect(parsed.searchParams.get('title')).toBe('My stream');
	});

	it('drops any prior search by replacing the entire query string', () => {
		const link = buildShareLink(
			{ url: 'https://example.com/v.m3u8', title: 't' },
			{ origin: 'https://app.example.com', pathname: '/sub/path' }
		);

		const parsed = new URL(link);
		expect(parsed.pathname).toBe('/sub/path');
		expect([...parsed.searchParams.keys()]).toEqual(['url', 'title']);
	});

	it('encodes special characters in url and title', () => {
		const link = buildShareLink(
			{ url: 'https://example.com/v.m3u8?token=abc&x=1', title: 'A & B' },
			{ origin: 'https://app.example.com', pathname: '/' }
		);

		const parsed = new URL(link);
		expect(parsed.searchParams.get('url')).toBe('https://example.com/v.m3u8?token=abc&x=1');
		expect(parsed.searchParams.get('title')).toBe('A & B');
	});
});
