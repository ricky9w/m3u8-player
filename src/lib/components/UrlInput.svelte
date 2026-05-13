<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	type Props = {
		onsubmit: (url: string, title: string) => void;
	};

	const { onsubmit }: Props = $props();

	let url = $state('');
	let title = $state('');
	let error = $state('');

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!url.trim()) {
			error = 'Please enter a URL';
			return;
		}
		if (!url.trim().endsWith('.m3u8')) {
			error = 'URL must end with .m3u8';
			return;
		}
		onsubmit(url.trim(), title.trim() || 'Untitled');
		url = '';
		title = '';
		error = '';
	}
</script>

<form class="w-full" onsubmit={handleSubmit}>
	<div class="mb-4 grid gap-1.5">
		<Label for="title">Title (optional)</Label>
		<Input id="title" type="text" placeholder="Video title" bind:value={title} />
	</div>

	<div class="grid gap-1.5">
		<Label for="url">M3U8 URL</Label>
		<div class="flex items-stretch gap-2">
			<Input
				id="url"
				type="url"
				placeholder="https://example.com/video.m3u8"
				required
				bind:value={url}
				oninput={() => (error = '')}
				class="flex-1"
			/>
			<Button type="submit">Play</Button>
		</div>
		{#if error}
			<p class="text-sm text-destructive">{error}</p>
		{/if}
	</div>
</form>
