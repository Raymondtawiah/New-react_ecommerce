import { Router } from 'express';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

const router = Router();
const dataDir = path.join(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'profile.json');

let profile = {};

async function loadProfile() {
  try {
    const raw = await readFile(dataFile, 'utf8');
    profile = JSON.parse(raw);
  } catch {
    profile = {};
  }
}

async function saveProfile() {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(profile), 'utf8');
}

await loadProfile();

router.get('/', (req, res) => {
  res.json({ profile });
});

router.put('/', async (req, res) => {
  profile = req.body;
  await saveProfile();
  res.json({ profile });
});

export default router;
