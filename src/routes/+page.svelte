<script lang="ts">
	import PlayerContent from '$lib/components/PlayerContent.svelte';
</script>

<div class="min-h-screen bg-background text-foreground">
	<header class="border-b border-border bg-card">
		<div class="container mx-auto flex items-center px-4 py-4">
			<h1 class="text-xl font-bold">M3U8 Player</h1>
			<p class="ml-4 text-sm text-muted-foreground">A simple HLS stream player</p>
		</div>
	</header>

	<main class="container mx-auto px-4 py-8">
		<PlayerContent />
	</main>

	<footer class="mt-12 border-t border-border bg-card py-6">
		<div class="container mx-auto px-4 text-center text-sm text-muted-foreground">
			<p>M3U8 Player &copy; {new Date().getFullYear()} | Built with SvelteKit and Video.js</p>
		</div>
	</footer>
</div>
