// Generates the REGPRO image library with an AI image API and saves it to public/assets/.
//
//   OPENAI_API_KEY=sk-... node scripts/generate-images.mjs            # all images
//   OPENAI_API_KEY=sk-... node scripts/generate-images.mjs regpro-hero  # only files matching a filter
//
// Prompts live in scripts/image-prompts.json. Output is WebP when `sharp` is installed
// (npm i -D sharp), otherwise PNG next to the expected .webp path — rename/convert before deploying.
// Run this on your machine or CI; keys stay out of the frontend.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { style, images } = JSON.parse(fs.readFileSync(path.join(root, 'scripts/image-prompts.json'), 'utf8'));
const key = process.env.OPENAI_API_KEY;
const model = process.env.IMAGE_MODEL || 'gpt-image-1';
if (!key) {
  console.error('Set OPENAI_API_KEY to generate images.');
  process.exit(1);
}
let sharp = null;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('sharp not installed — saving PNG files instead of WebP.');
}

const filter = process.argv[2];
for (const img of images.filter((i) => !filter || i.file.includes(filter))) {
  const out = path.join(root, 'public/assets', img.file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  process.stdout.write(`→ ${img.file} … `);
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, prompt: `${img.prompt}. ${style}`, size: img.size, n: 1 }),
  });
  const json = await res.json();
  if (!res.ok) {
    console.log(`failed: ${json.error?.message || res.status}`);
    continue;
  }
  const buf = Buffer.from(json.data[0].b64_json, 'base64');
  if (sharp) await sharp(buf).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
  else fs.writeFileSync(out.replace(/\.webp$/, '.png'), buf);
  console.log('done');
}
