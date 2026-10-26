import { Router } from 'express';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

const router = Router();
const dataDir = path.join(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'riders.json');

let riders = [];

function generateCode() {
  return 'RDR-' + Math.random().toString(36).slice(2, 8).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
}

async function loadRiders() {
  try {
    const raw = await readFile(dataFile, 'utf8');
    riders = JSON.parse(raw);
  } catch {
    riders = [];
  }
}

async function saveRiders() {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(riders), 'utf8');
}

await loadRiders();

router.get('/', (req, res) => {
  res.json({ riders });
});

router.post('/', async (req, res) => {
  const rider = { ...req.body, riderCode: generateCode() };
  riders.push(rider);
  await saveRiders();
  res.status(201).json({ rider });
});

router.post('/login', (req, res) => {
  const { code } = req.body;
  const rider = riders.find((r) => r.riderCode === code);
  if (!rider) return res.status(401).json({ error: 'Invalid rider code' });
  if (rider.disabled) return res.status(403).json({ error: 'Rider account disabled' });
  const { riderCode, ...safe } = rider;
  res.json({ rider: safe, type: 'rider' });
});

router.patch('/:index', async (req, res) => {
  const idx = Number(req.params.index);
  if (Number.isNaN(idx) || idx < 0 || idx >= riders.length) return res.status(404).json({ error: 'Not found' });
  riders[idx] = { ...riders[idx], ...req.body };
  await saveRiders();
  res.json({ rider: riders[idx] });
});

function generateCode() {
  return 'RDR-' + Math.random().toString(36).slice(2, 8).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
}

// need ensure existing riders have code? already.

router.post('/generate/:index', async (req, res) => {
  const idx = Number(req.params.index);
  if (Number.isNaN(idx) || idx < 0 || idx >= riders.length) return res.status(404).json({ error: 'Not found' });
  const code = generateCode();
  riders[idx].riderCode = code;
  await saveRiders();
  res.json({ code });
});
