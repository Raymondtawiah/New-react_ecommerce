import { Router } from 'express';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

const router = Router();
const dataDir = path.join(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'orders.json');

let orders = [];

async function loadOrders() {
  try {
    const raw = await readFile(dataFile, 'utf8');
    orders = JSON.parse(raw);
  } catch {
    orders = [];
  }
}

async function saveOrders() {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(orders), 'utf8');
}

await loadOrders();

router.get('/', (req, res) => {
  res.json({ orders });
});

router.post('/', async (req, res) => {
  const order = req.body;
  orders.push(order);
  await saveOrders();
  res.status(201).json({ order });
});

router.patch('/:id', async (req, res) => {
  const idx = orders.findIndex((o) => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  orders[idx] = { ...orders[idx], ...req.body };
  await saveOrders();
  res.json({ order: orders[idx] });
});

export default router;
