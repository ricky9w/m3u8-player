# M3U8 Player

A minimalist web-based M3U8/HLS stream player built with Next.js and Video.js.

## Features

- Enter M3U8 URLs and play HLS streams directly in your browser
- Automatic playlist management that stores your viewing history
- Responsive design that works on both desktop and mobile devices
- Video playback using the robust Video.js library
- Dark mode support for comfortable viewing in low-light environments
- Playlist persistence using browser localStorage
- **Video sharing via URL parameters** - easily share videos with friends

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Enter an M3U8 URL in the input field and click "Play"
2. The video will start playing below the input field
3. The video is automatically added to your playlist on the right side
4. Click on any video in your playlist to play it again
5. Remove videos from your playlist by clicking the "X" button
6. **Share videos** by clicking the "Share" button next to the video title, which copies a direct URL to your clipboard

### URL Parameters

You can directly access a video by adding URL parameters:

- `?url=https://example.com/path/to/video.m3u8` - Required parameter with the M3U8 URL
- `?title=My%20Video%20Title` - Optional parameter to set a custom title

Example:
```
https://your-domain.com/?url=https://example.com/video.m3u8&title=My%20Cool%20Video
```

When someone visits this URL, the video will automatically be added to their playlist and start playing.

## Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework for production
- [Video.js](https://videojs.com/) - HTML5 video player with HLS support
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - For playlist persistence

## Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Then, you can deploy the `out` directory to any static hosting service.

## License

[MIT](./LICENSE)

## Acknowledgments

- [Video.js](https://videojs.com/) for providing a robust video player
- [Next.js](https://nextjs.org/) for the React framework
