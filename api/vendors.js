import { Router } from 'express';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

const router = Router();
const dataDir = path.join(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'vendors.json');

let vendors = [];

async function loadVendors() {
  try {
    const raw = await readFile(dataFile, 'utf8');
    vendors = JSON.parse(raw);
  } catch {
    vendors = [];
  }
}

async function saveVendors() {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(vendors), 'utf8');
}

await loadVendors();

function generateCode() {
  return 'VND-' + Math.random().toString(36).slice(2, 8).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
}

router.get('/', (req, res) => {
  res.json({ vendors });
});

router.post('/', async (req, res) => {
  const vendor = { ...req.body, vendorCode: generateCode() };
  vendors.push(vendor);
  await saveVendors();
  res.status(201).json({ vendor });
});

router.post('/generate/:index', async (req, res) => {
  const idx = Number(req.params.index);
  if (Number.isNaN(idx) || idx < 0 || idx >= vendors.length) return res.status(404).json({ error: 'Not found' });
  const code = generateCode();
  vendors[idx].vendorCode = code;
  await saveVendors();
  res.json({ code });
});

router.post('/login', async (req, res) => {
  const { code } = req.body;
  const vendor = vendors.find((v) => v.vendorCode === code);
  if (vendor) {
    if (vendor.disabled) return res.status(403).json({ error: 'Vendor account disabled' });
    const { vendorCode, ...safe } = vendor;
    return res.json({ vendor: safe, type: 'vendor' });
  }
  // check riders
  try {
    const raw = await readFile(path.join(process.cwd(), 'data', 'riders.json'), 'utf8');
    const riders = JSON.parse(raw);
    const rider = riders.find((r) => r.riderCode === code);
    if (rider) {
      const { riderCode, ...safe } = rider;
      return res.json({ vendor: safe, type: 'rider' });
    }
  } catch {}
  return res.status(401).json({ error: 'Invalid code' });
});

router.patch('/:index', async (req, res) => {
  const idx = Number(req.params.index);
  if (Number.isNaN(idx) || idx < 0 || idx >= vendors.length) return res.status(404).json({ error: 'Not found' });
  vendors[idx] = { ...vendors[idx], ...req.body };
  await saveVendors();
  res.json({ vendor: vendors[idx] });
});

export default router;
