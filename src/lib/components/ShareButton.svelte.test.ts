import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import ShareButton from './ShareButton.svelte';
import type { VideoItem } from '$lib/types';

const sampleVideo: VideoItem = {
	id: 'v1',
	url: 'https://example.com/stream.m3u8',
	title: 'My Stream',
	addedAt: 1
};

/**
 * Note: we deliberately don't assert on `navigator.clipboard.writeText` here —
 * jsdom 29 ships a real Clipboard EventTarget that's surprisingly hard to mock
 * cleanly. The pure URL-building logic is exercised by `share.test.ts`; this
 * suite covers the visible state changes.
 */
describe('ShareButton', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	it('shows "已复制!" after click and reverts to "分享" after 2 seconds', async () => {
		const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
		render(ShareButton, { props: { video: sampleVideo } });

		expect(screen.getByText('分享')).toBeInTheDocument();
		await user.click(screen.getByRole('button', { name: /分享/ }));
		expect(await screen.findByText('已复制!')).toBeInTheDocument();

		vi.advanceTimersByTime(2000);
		await vi.runAllTimersAsync();

		expect(screen.queryByText('已复制!')).toBeNull();
		expect(screen.getByText('分享')).toBeInTheDocument();
	});
});
