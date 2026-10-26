import { Router } from 'express';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

const router = Router();
const dataDir = path.join(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'products.json');

let products = [];

async function loadProducts() {
  try {
    const raw = await readFile(dataFile, 'utf8');
    products = JSON.parse(raw);
  } catch {
    products = [];
  }
}

async function saveProducts() {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(products), 'utf8');
}

await loadProducts();

router.get('/', (req, res) => {
  res.json({ products });
});

router.post('/', async (req, res) => {
  const product = req.body;
  products.push(product);
  await saveProducts();
  res.status(201).json({ product });
});

router.patch('/:id', async (req, res) => {
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  products[idx] = { ...products[idx], ...req.body };
  await saveProducts();
  res.json({ product: products[idx] });
});

router.delete('/:id', async (req, res) => {
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  products.splice(idx, 1);
  await saveProducts();
  res.json({ success: true });
});

export default router;
