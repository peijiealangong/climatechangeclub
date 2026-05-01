const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || 'change-me-admin-key';
const SESSION_SECRET = process.env.SESSION_SECRET || 'change-me-session-secret';
const DB_PATH = path.join(__dirname, 'data', 'db.json');
const PUBLIC_DIR = path.join(__dirname, 'public');

app.use(express.json({ limit: '1mb' }));
app.use(express.static(PUBLIC_DIR));

function readDb() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    const db = JSON.parse(raw);
    if (!db.customers) db.customers = [];
    return db;
  } catch {
    return { customers: [] };
  }
}

function writeDb(db) {
  const tmp = DB_PATH + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, DB_PATH);
}

function base64urlEncode(value) {
  return Buffer.from(value).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64urlDecode(value) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4;
  return Buffer.from(padded + (pad ? '='.repeat(4 - pad) : ''), 'base64').toString('utf8');
}

function signToken(payload) {
  const body = base64urlEncode(JSON.stringify(payload));
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(body).digest('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  return `${body}.${sig}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;

  const expected = crypto.createHmac('sha256', SESSION_SECRET).update(body).digest('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return null;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null;

  try {
    const payload = JSON.parse(base64urlDecode(body));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(String(password), salt, 120000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

function verifyPassword(password, salt, hash) {
  const candidate = crypto.pbkdf2Sync(String(password), salt, 120000, 64, 'sha512').toString('hex');
  const candidateBuf = Buffer.from(candidate);
  const hashBuf = Buffer.from(hash);
  if (candidateBuf.length !== hashBuf.length) return false;
  return crypto.timingSafeEqual(candidateBuf, hashBuf);
}

function makeCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function makePassword() {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
}

function publicCustomer(customer) {
  return {
    id: customer.id,
    name: customer.name,
    code: customer.code,
    orders: (customer.orders || []).map((order) => ({
      id: order.id,
      title: order.title,
      carrier: order.carrier,
      trackingNumber: order.trackingNumber,
      status: order.status,
      eta: order.eta,
      updatedAt: order.updatedAt,
      notes: order.notes,
      history: order.history || []
    }))
  };
}

function ensureSeedData() {
  const db = readDb();
  if (db.customers.length) return;

  const creds = hashPassword('DEMO1234');
  const now = Date.now();
  db.customers.push({
    id: crypto.randomUUID(),
    name: 'Demo Customer',
    code: 'DEMO01',
    passwordSalt: creds.salt,
    passwordHash: creds.hash,
    createdAt: now,
    orders: [
      {
        id: crypto.randomUUID(),
        title: 'Sample order',
        carrier: 'UPS',
        trackingNumber: '1ZDEMO00000001',
        status: 'In transit',
        eta: new Date(Date.now() + 3 * 86400000).toISOString(),
        updatedAt: now,
        notes: 'This is a seeded demo order.',
        history: [
          { at: now - 1000 * 60 * 60 * 12, title: 'Label created', detail: 'Shipment label created.' },
          { at: now - 1000 * 60 * 60 * 4, title: 'Picked up', detail: 'Carrier received the package.' },
          { at: now - 1000 * 60 * 30, title: 'In transit', detail: 'Shipment is moving through the network.' }
        ]
      }
    ]
  });
  writeDb(db);
}

function requireAdmin(req, res, next) {
  const key = req.header('x-admin-key') || req.query.adminKey || '';
  if (key !== ADMIN_KEY) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

function requireCustomer(req, res, next) {
  const auth = req.header('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : req.query.token;
  const payload = verifyToken(token);
  if (!payload || payload.role !== 'customer') return res.status(401).json({ error: 'Unauthorized' });
  req.customerCode = payload.code;
  next();
}

function findCustomerByCode(code) {
  const db = readDb();
  return db.customers.find((c) => c.code === code);
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.post('/api/auth/login', (req, res) => {
  const code = String(req.body.code || '').trim().toUpperCase();
  const password = String(req.body.password || '');
  if (!code || !password) return res.status(400).json({ error: 'Code and password are required.' });

  const db = readDb();
  const customer = db.customers.find((c) => c.code === code);
  if (!customer) return res.status(401).json({ error: 'Invalid login.' });
  if (!verifyPassword(password, customer.passwordSalt, customer.passwordHash)) return res.status(401).json({ error: 'Invalid login.' });

  const token = signToken({ role: 'customer', code, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 });
  res.json({ token, customer: publicCustomer(customer) });
});

app.get('/api/customer/me', requireCustomer, (req, res) => {
  const customer = findCustomerByCode(req.customerCode);
  if (!customer) return res.status(404).json({ error: 'Customer not found.' });
  res.json({ customer: publicCustomer(customer) });
});

app.get('/api/customer/orders', requireCustomer, (req, res) => {
  const customer = findCustomerByCode(req.customerCode);
  if (!customer) return res.status(404).json({ error: 'Customer not found.' });
  res.json({ orders: publicCustomer(customer).orders });
});

app.get('/api/admin/customers', requireAdmin, (_req, res) => {
  const db = readDb();
  res.json({ customers: db.customers.map(publicCustomer) });
});

app.post('/api/admin/customers', requireAdmin, (req, res) => {
  const db = readDb();
  const name = String(req.body.name || '').trim();
  const code = String(req.body.code || makeCode()).trim().toUpperCase();
  const password = String(req.body.password || makePassword()).trim();
  const initialOrder = req.body.initialOrder || null;

  if (!name) return res.status(400).json({ error: 'Customer name is required.' });
  if (db.customers.some((c) => c.code === code)) return res.status(409).json({ error: 'That code already exists.' });

  const { salt, hash } = hashPassword(password);
  const now = Date.now();
  const customer = {
    id: crypto.randomUUID(),
    name,
    code,
    passwordSalt: salt,
    passwordHash: hash,
    createdAt: now,
    orders: []
  };

  if (initialOrder && String(initialOrder.title || '').trim()) {
    customer.orders.push({
      id: crypto.randomUUID(),
      title: String(initialOrder.title).trim(),
      carrier: String(initialOrder.carrier || 'Other').trim(),
      trackingNumber: String(initialOrder.trackingNumber || '').trim(),
      status: String(initialOrder.status || 'Label created').trim(),
      eta: initialOrder.eta ? new Date(initialOrder.eta).toISOString() : null,
      updatedAt: now,
      notes: String(initialOrder.notes || '').trim(),
      history: [
        { at: now, title: String(initialOrder.status || 'Label created').trim(), detail: String(initialOrder.notes || 'Order created.').trim() }
      ]
    });
  }

  db.customers.push(customer);
  writeDb(db);
  res.status(201).json({ customer: publicCustomer(customer), temporaryPassword: password });
});

app.post('/api/admin/customers/:customerId/orders', requireAdmin, (req, res) => {
  const db = readDb();
  const customer = db.customers.find((c) => c.id === req.params.customerId);
  if (!customer) return res.status(404).json({ error: 'Customer not found.' });

  const title = String(req.body.title || '').trim();
  if (!title) return res.status(400).json({ error: 'Order title is required.' });

  const now = Date.now();
  const order = {
    id: crypto.randomUUID(),
    title,
    carrier: String(req.body.carrier || 'Other').trim(),
    trackingNumber: String(req.body.trackingNumber || '').trim(),
    status: String(req.body.status || 'Label created').trim(),
    eta: req.body.eta ? new Date(req.body.eta).toISOString() : null,
    updatedAt: now,
    notes: String(req.body.notes || '').trim(),
    history: [
      { at: now, title: String(req.body.status || 'Label created').trim(), detail: String(req.body.notes || 'Order created.').trim() }
    ]
  };

  customer.orders = customer.orders || [];
  customer.orders.unshift(order);
  writeDb(db);
  res.status(201).json({ order });
});

app.patch('/api/admin/orders/:orderId', requireAdmin, (req, res) => {
  const db = readDb();
  const now = Date.now();
  for (const customer of db.customers) {
    const order = (customer.orders || []).find((o) => o.id === req.params.orderId);
    if (!order) continue;

    if (req.body.status) order.status = String(req.body.status).trim();
    if ('eta' in req.body) order.eta = req.body.eta ? new Date(req.body.eta).toISOString() : null;
    if (req.body.notes) order.notes = String(req.body.notes).trim();
    order.updatedAt = now;
    order.history = order.history || [];
    order.history.unshift({
      at: now,
      title: String(req.body.status || order.status || 'Updated').trim(),
      detail: String(req.body.notes || 'Status updated.').trim()
    });
    order.history = order.history.slice(0, 10);
    writeDb(db);
    return res.json({ order });
  }
  res.status(404).json({ error: 'Order not found.' });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

ensureSeedData();
app.listen(PORT, () => {
  console.log(`Parcel Vault backend running on http://localhost:${PORT}`);
});
