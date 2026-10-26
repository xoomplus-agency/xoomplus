/**
 * cPanel Setup Node.js App entry (Passenger) — no Docker.
 * Startup file: server.js
 * After FTP: in cPanel Node app run `npm install --omit=dev`, then Restart.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientRoot = path.join(__dirname, 'dist', 'client');

const app = express();
app.use(express.static(clientRoot));
app.use(ssrHandler);

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
	console.log(`Xoomplus Astro SSR listening on http://${host}:${port}`);
});
