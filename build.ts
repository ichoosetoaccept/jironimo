import { $ } from "bun";
import { Resvg } from "@resvg/resvg-js";

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

// Create PNG icons from SVG - serif uppercase J
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="16" fill="#2684FF"/>
  <path d="M44 20h48v8H76v52c0 10-3 18-9 24s-14 9-24 9c-10 0-18-3-24-8l8-12c4 4 10 6 16 6 6 0 10-2 13-5s5-8 5-14V28H44v-8z" fill="white"/>
</svg>`;

for (const size of [16, 48, 128]) {
  const resvg = new Resvg(iconSvg, {
    fitTo: { mode: "width", value: size },
  });
  const png = resvg.render().asPng();
  await Bun.write(`dist/icons/icon${size}.png`, png);
}

console.log("✓ Built extension to dist/");
console.log("  Load as unpacked extension: chrome://extensions");
