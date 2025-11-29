import { $ } from "bun";

// Clean and create dist directory
await $`rm -rf dist && mkdir -p dist/icons`;

// Build TypeScript to JavaScript
await Bun.build({
  entrypoints: ["./src/popup.ts"],
  outdir: "./dist",
  minify: true,
});

// Copy static files
await $`cp src/manifest.json dist/`;
await $`cp src/popup.html dist/`;

// Create simple SVG icons - using path instead of text for compatibility
const iconSvg = (size: number) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="16" fill="#0052CC"/>
  <path d="M76 28h16v52c0 12-4 21-12 27s-18 9-30 9c-6 0-12-1-17-3v-16c5 2 10 3 16 3 8 0 14-2 18-5s6-9 6-16h-1c-2 4-5 7-9 9s-8 3-13 3c-9 0-16-3-21-9s-8-14-8-24 3-18 8-24 12-9 21-9c5 0 9 1 13 3s7 5 9 9h1V28z M62 56c-5 0-9 2-12 5s-4 8-4 14 1 11 4 14 7 5 12 5 9-2 12-5 4-8 4-14-1-11-4-14-7-5-12-5z" fill="white"/>
</svg>`;

for (const size of [16, 48, 128]) {
  await Bun.write(`dist/icons/icon${size}.svg`, iconSvg(size));
}

console.log("✓ Built extension to dist/");
console.log("  Load as unpacked extension: chrome://extensions");
