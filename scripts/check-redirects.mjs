// Validates dist/_redirects before deploy.
// Cloudflare rejects the whole file on a single bad rule, which fails the
// deploy *after* a successful build — so catch it here instead.
import { readFileSync } from 'node:fs';

const FILE = 'dist/_redirects';
const LIMITS = { static: 2000, dynamic: 100 };

const lines = readFileSync(FILE, 'utf8').split('\n');
const errors = [];
const seen = new Map();
let statics = 0;
let dynamics = 0;

lines.forEach((raw, i) => {
  const line = raw.trim();
  if (!line || line.startsWith('#')) return;
  const n = i + 1;
  const [from, to, code] = line.split(/\s+/);

  if (!to) {
    errors.push(`line ${n}: missing destination — "${line}"`);
    return;
  }
  if (!from.startsWith('/')) errors.push(`line ${n}: source must start with "/" — ${from}`);
  if (code && !/^30[1278]$/.test(code)) errors.push(`line ${n}: bad status ${code}`);
  if (from === to) errors.push(`line ${n}: redirects to itself — ${from}`);

  if (seen.has(from)) {
    errors.push(`line ${n}: duplicate rule for ${from} (first seen line ${seen.get(from)})`);
  } else {
    seen.set(from, n);
  }

  if (from.includes(':') || from.includes('*')) dynamics++;
  else statics++;
});

if (statics > LIMITS.static) errors.push(`${statics} static rules exceeds limit of ${LIMITS.static}`);
if (dynamics > LIMITS.dynamic) errors.push(`${dynamics} dynamic rules exceeds limit of ${LIMITS.dynamic}`);

if (errors.length) {
  console.error(`[redirects] ${errors.length} problem(s) in ${FILE}:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`[redirects] ok — ${statics} static, ${dynamics} dynamic, no duplicates`);
