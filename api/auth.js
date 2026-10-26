import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';
import { readFile } from 'fs/promises';
import path from 'path';

const router = Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

async function loadAdmins() {
  try {
    const raw = await readFile(path.join(process.cwd(), 'data', 'admins.json'), 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ user: data.user });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admins = await loadAdmins();
  const admin = admins.find((a) => a.email === email && a.password === password);
  if (admin) {
    return res.json({ user: { email: admin.email, name: admin.name, role: 'admin' }, admin: true });
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  const isAdmin = data.user?.user_metadata?.role === 'admin' || data.user?.app_metadata?.role === 'admin';
  res.json({ session: data.session, user: data.user, admin: isAdmin });
});

export default router;
