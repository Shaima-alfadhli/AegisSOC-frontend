#!/usr/bin/env node
import fs from "fs";
import path from "path";

const outDir = path.join(process.cwd(), "out");
const chunksDir = path.join(outDir, "_next", "static", "chunks");

if (!fs.existsSync(outDir)) {
  console.error("Missing out/ — run: npm run build:pages");
  process.exit(1);
}

if (!fs.existsSync(path.join(outDir, ".nojekyll"))) {
  console.error("Missing out/.nojekyll — add public/.nojekyll and rebuild");
  process.exit(1);
}

if (!fs.existsSync(chunksDir)) {
  console.error("Missing out/_next/static/chunks");
  process.exit(1);
}

const bad = fs.readdirSync(chunksDir).filter((name) => /~|\.\./.test(name));
if (bad.length) {
  console.error("Unsafe chunk filenames for GitHub Pages:");
  bad.forEach((n) => console.error(" -", n));
  process.exit(1);
}

console.log("GitHub Pages build OK — nojekyll present, chunk names safe.");
