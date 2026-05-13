import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import UrlInput from './UrlInput.svelte';

describe('UrlInput', () => {
	it('submits the trimmed URL and title when valid', async () => {
		const user = userEvent.setup();
		const onsubmit = vi.fn();
		render(UrlInput, { props: { onsubmit } });

		await user.type(screen.getByLabelText('Title (optional)'), '  My title  ');
		await user.type(screen.getByLabelText('M3U8 URL'), '  https://example.com/v.m3u8  ');
		await user.click(screen.getByRole('button', { name: /play/i }));

		expect(onsubmit).toHaveBeenCalledOnce();
		expect(onsubmit).toHaveBeenCalledWith('https://example.com/v.m3u8', 'My title');
	});

	it('defaults the title to "Untitled" when omitted', async () => {
		const user = userEvent.setup();
		const onsubmit = vi.fn();
		render(UrlInput, { props: { onsubmit } });

		await user.type(screen.getByLabelText('M3U8 URL'), 'https://example.com/v.m3u8');
		await user.click(screen.getByRole('button', { name: /play/i }));

		expect(onsubmit).toHaveBeenCalledWith('https://example.com/v.m3u8', 'Untitled');
	});

	it('rejects URLs that do not end with .m3u8 and shows an error', async () => {
		const user = userEvent.setup();
		const onsubmit = vi.fn();
		render(UrlInput, { props: { onsubmit } });

		await user.type(screen.getByLabelText('M3U8 URL'), 'https://example.com/v.mp4');
		await user.click(screen.getByRole('button', { name: /play/i }));

		expect(onsubmit).not.toHaveBeenCalled();
		expect(screen.getByText('URL must end with .m3u8')).toBeInTheDocument();
	});

	it('clears inputs after a successful submission', async () => {
		const user = userEvent.setup();
		render(UrlInput, { props: { onsubmit: vi.fn() } });

		const urlInput = screen.getByLabelText('M3U8 URL') as HTMLInputElement;
		const titleInput = screen.getByLabelText('Title (optional)') as HTMLInputElement;

		await user.type(titleInput, 'A title');
		await user.type(urlInput, 'https://example.com/v.m3u8');
		await user.click(screen.getByRole('button', { name: /play/i }));

		expect(urlInput.value).toBe('');
		expect(titleInput.value).toBe('');
	});
});
