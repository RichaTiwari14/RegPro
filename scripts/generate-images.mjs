// Generates the REGPRO image library with an AI image API and saves it to public/assets/ as WebP.
//
//   GEMINI_API_KEY=... node scripts/generate-images.mjs             # Google Imagen (preferred)
//   OPENAI_API_KEY=... node scripts/generate-images.mjs             # or OpenAI
//   node scripts/generate-images.mjs services                       # only files whose name contains "services"
//   node scripts/generate-images.mjs --force                        # also regenerate client-provided photos
//
// Prompts live in scripts/image-prompts.json. Keys are read from the environment only — never commit them,
// and never expose them to the frontend (no VITE_ prefix).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { style, images } = JSON.parse(fs.readFileSync(path.join(root, 'scripts/image-prompts.json'), 'utf8'));
const gemini = process.env.GEMINI_API_KEY;
const openai = process.env.OPENAI_API_KEY;
if (!gemini && !openai) {
  console.error('Set GEMINI_API_KEY (or OPENAI_API_KEY) to generate images.');
  process.exit(1);
}

const ratio = (size) => {
  const [w, h] = size.split('x').map(Number);
  return w > h ? '4:3' : h > w ? '3:4' : '1:1';
};

async function viaGemini(prompt, size) {
  const model = process.env.IMAGE_MODEL || 'imagen-4.0-generate-001';
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:predict`, {
    method: 'POST',
    headers: { 'x-goog-api-key': gemini, 'Content-Type': 'application/json' },
    body: JSON.stringify({ instances: [{ prompt }], parameters: { sampleCount: 1, aspectRatio: ratio(size), personGeneration: 'allow_adult' } }),
  });
  const json = await res.json();
  const b64 = json.predictions?.[0]?.bytesBase64Encoded;
  if (!res.ok || !b64) throw new Error(json.error?.message || `HTTP ${res.status} (no image returned)`);
  return Buffer.from(b64, 'base64');
}

async function viaOpenAI(prompt, size) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${openai}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: process.env.IMAGE_MODEL || 'gpt-image-1', prompt, size, n: 1 }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || `HTTP ${res.status}`);
  return Buffer.from(json.data[0].b64_json, 'base64');
}

const filter = process.argv.slice(2).find((a) => !a.startsWith('--'));
const force = process.argv.includes('--force');
// Entries marked "provided" already use client-supplied photos — skipped unless --force.
const todo = images.filter((i) => (!filter || i.file.includes(filter)) && (force || !i.provided));
let ok = 0;
for (const img of todo) {
  const out = path.join(root, 'public/assets', img.file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  process.stdout.write(`→ ${img.file} … `);
  try {
    const prompt = `${img.prompt}. ${style}`;
    const buf = gemini ? await viaGemini(prompt, img.size) : await viaOpenAI(prompt, img.size);
    await sharp(buf).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
    ok++;
    console.log('done');
  } catch (e) {
    console.log(`failed: ${e.message}`);
  }
}
console.log(`\n${ok}/${todo.length} images generated.`);
