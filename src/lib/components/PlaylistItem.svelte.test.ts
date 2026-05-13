import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import PlaylistItem from './PlaylistItem.svelte';
import type { VideoItem } from '$lib/types';

const sample: VideoItem = {
	id: 'v1',
	url: 'https://example.com/stream.m3u8',
	title: 'A title',
	addedAt: 1
};

describe('PlaylistItem', () => {
	it('renders title and url', () => {
		render(PlaylistItem, {
			props: { video: sample, isActive: false, onplay: vi.fn(), ondelete: vi.fn() }
		});
		expect(screen.getByText('A title')).toBeInTheDocument();
		expect(screen.getByText(sample.url)).toBeInTheDocument();
	});

	it('falls back to "Untitled Video" when title is empty', () => {
		render(PlaylistItem, {
			props: {
				video: { ...sample, title: '' },
				isActive: false,
				onplay: vi.fn(),
				ondelete: vi.fn()
			}
		});
		expect(screen.getByText('Untitled Video')).toBeInTheDocument();
	});

	it('calls onplay when the body is clicked', async () => {
		const user = userEvent.setup();
		const onplay = vi.fn();
		const ondelete = vi.fn();
		render(PlaylistItem, {
			props: { video: sample, isActive: false, onplay, ondelete }
		});

		await user.click(screen.getByText('A title'));

		expect(onplay).toHaveBeenCalledOnce();
		expect(onplay).toHaveBeenCalledWith(sample);
		expect(ondelete).not.toHaveBeenCalled();
	});

	it('calls ondelete (and not onplay) when the remove button is clicked', async () => {
		const user = userEvent.setup();
		const onplay = vi.fn();
		const ondelete = vi.fn();
		render(PlaylistItem, {
			props: { video: sample, isActive: false, onplay, ondelete }
		});

		await user.click(screen.getByRole('button', { name: /remove from playlist/i }));

		expect(ondelete).toHaveBeenCalledOnce();
		expect(ondelete).toHaveBeenCalledWith(sample.id);
		expect(onplay).not.toHaveBeenCalled();
	});
});
