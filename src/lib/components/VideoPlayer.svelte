<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import 'video.js/dist/video-js.css';

	type Props = {
		src: string;
		class?: string;
		autoPlay?: boolean;
	};

	const { src, class: className, autoPlay = false }: Props = $props();

	let host: HTMLDivElement | undefined = $state();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let player: any = null;

	async function init() {
		if (!host) return;
		const { default: videojs } = await import('video.js');
		const el = document.createElement('video-js');
		el.classList.add('vjs-big-play-centered');
		// eslint-disable-next-line svelte/no-dom-manipulating -- video.js owns this subtree; not part of Svelte's DOM
		host.appendChild(el);
		player = videojs(el, {
			autoplay: autoPlay,
			controls: true,
			responsive: true,
			fluid: true,
			sources: [{ src, type: 'application/x-mpegURL' }]
		});
	}

	onMount(() => {
		init();
	});

	onDestroy(() => {
		if (player) {
			player.dispose();
			player = null;
		}
	});

	$effect(() => {
		if (player) {
			player.src([{ src, type: 'application/x-mpegURL' }]);
			if (autoPlay) player.play()?.catch(() => {});
		}
	});
</script>

<div data-vjs-player class={className}>
	<div bind:this={host} class="h-full w-full overflow-hidden rounded-lg"></div>
</div>
