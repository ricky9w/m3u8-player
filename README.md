# M3U8 Player

A minimalist web-based M3U8/HLS stream player built with SvelteKit and Video.js, deployed on Cloudflare Workers.

## Features

- Enter M3U8 URLs and play HLS streams directly in your browser
- Automatic playlist management with browser-`localStorage` persistence
- Responsive design — desktop and mobile
- Robust HLS playback via [Video.js](https://videojs.com/)
- Dark mode that follows the OS `prefers-color-scheme` setting
- **Share via URL parameters** — copy a deep link to any video in your playlist

## Tech stack

- [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5, runes mode)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn-svelte](https://www.shadcn-svelte.com/) components
- [Bun](https://bun.com/) as runtime + package manager
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) deployment via [`@sveltejs/adapter-cloudflare`](https://svelte.dev/docs/kit/adapter-cloudflare)
- [Vitest](https://vitest.dev/) for unit + component tests

## Getting started

```bash
bun install
bun run dev
```

Open <http://localhost:5173>.

## Scripts

| Script            | What it does                                                    |
| ----------------- | --------------------------------------------------------------- |
| `bun run dev`     | Start the Vite dev server                                       |
| `bun run check`   | `wrangler types --check` + `svelte-check`                       |
| `bun run lint`    | Prettier + ESLint                                               |
| `bun run format`  | Auto-fix Prettier                                               |
| `bun run test`    | Vitest (client jsdom + server node projects)                    |
| `bun run build`   | Produce the Cloudflare Worker build at `.svelte-kit/cloudflare` |
| `bun run preview` | Run the built Worker locally via Wrangler                       |
| `bun run gen`     | Regenerate `worker-configuration.d.ts` from `wrangler.jsonc`    |

## URL parameters

You can deep-link a video by adding query parameters:

- `?url=https://example.com/path/to/video.m3u8` — the HLS URL (required)
- `?title=Custom%20title` — optional human-readable title

```
https://your-domain.com/?url=https://example.com/video.m3u8&title=My%20Cool%20Video
```

When someone opens that link, the video is added to their playlist and starts playing automatically.

## Deploying to Cloudflare Workers

The app is fully prerendered (`export const prerender = true` + `ssr = false`), so the Worker just serves the static assets in `.svelte-kit/cloudflare` through the `ASSETS` binding.

```bash
bun run build
bunx wrangler deploy
```

`wrangler.jsonc` already wires up the entry script, the `ASSETS` binding, and `observability.enabled`.

## License

[MIT](./LICENSE)
