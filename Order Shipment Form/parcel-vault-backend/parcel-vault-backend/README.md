# Parcel Vault Backend

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000

## Default demo login

- Code: `DEMO01`
- Password: `DEMO1234`

## Admin access

Set your admin key in the `ADMIN_KEY` environment variable, or change the default in `server.js`.
The frontend admin panel sends the value in the `x-admin-key` header.

## Files

- `server.js` — Node.js backend and API
- `public/index.html` — customer and admin frontend
- `data/db.json` — JSON database
