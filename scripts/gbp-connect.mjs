// One-time setup for live Google reviews (worker/gbp.js). One command:
//
//   node scripts/gbp-connect.mjs
//
// 1. Finds the OAuth client file you downloaded from Google Cloud
//    (client_secret_….json) in this folder or in ~/Downloads, so nothing has
//    to be copied or typed. Older usage with the ID and secret as arguments
//    still works.
// 2. Opens Google's consent screen. Sign in with the Google account that
//    manages the Nico & Vito Business Profile.
// 3. Looks up the account and location IDs and saves all five values as
//    Cloudflare Worker secrets with wrangler (logging you in if needed).
//
// Secret values are never printed. Nothing is sent anywhere except Google
// and Cloudflare.
//
// Prerequisites (Google Cloud console, once):
//   1. Business Profile API access approved for the project (quota > 0).
//   2. Enable "Google My Business API", "My Business Account Management API"
//      and "My Business Business Information API".
//   3. An OAuth client of type "Desktop app", consent screen "In production"
//      (in "Testing" Google expires the refresh token after 7 days).
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { exec, spawnSync } from 'node:child_process';

function findClientFile() {
  const dirs = [process.cwd(), path.join(os.homedir(), 'Downloads')];
  const files = dirs.flatMap((d) => {
    try {
      return fs.readdirSync(d)
        .filter((f) => /^client_secret.*\.json$/i.test(f))
        .map((f) => path.join(d, f));
    } catch { return []; }
  });
  files.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return files[0];
}

let [clientId, clientSecret] = process.argv.slice(2);
if (!clientId || !clientSecret) {
  const file = findClientFile();
  if (!file) {
    console.error(`
Could not find the Google client file.

In Google Cloud > Google Auth Platform > Clients, open your Desktop client,
click "Add secret", then download the JSON file it offers (it is named
client_secret_….json). Leave it in Downloads and run this again.
`);
    process.exit(1);
  }
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  const c = j.installed || j.web || {};
  clientId = c.client_id;
  clientSecret = c.client_secret;
  if (!clientId || !clientSecret) { console.error(`${file} has no client_id/client_secret.`); process.exit(1); }
  console.log(`Using Google client file: ${file}`);
}

const PORT = 53682;
const redirect = `http://127.0.0.1:${PORT}/callback`;
const auth = new URL('https://accounts.google.com/o/oauth2/v2/auth');
auth.search = new URLSearchParams({
  client_id: clientId,
  redirect_uri: redirect,
  response_type: 'code',
  scope: 'https://www.googleapis.com/auth/business.manage',
  access_type: 'offline',
  prompt: 'consent',
}).toString();

const code = await new Promise((resolve, reject) => {
  const srv = http.createServer((req, res) => {
    const u = new URL(req.url, redirect);
    if (u.pathname !== '/callback') { res.end(); return; }
    const c = u.searchParams.get('code');
    res.end(c ? 'Signed in. Go back to the terminal to finish.' : 'No code received.');
    srv.close();
    c ? resolve(c) : reject(new Error(u.searchParams.get('error') || 'no code'));
  });
  srv.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.error('\nAnother copy of this script is still waiting for sign-in. Close that terminal window and run this again.\n');
      process.exit(1);
    }
    reject(e);
  });
  srv.listen(PORT, '127.0.0.1', () => {
    console.log('\nOpening Google sign-in. If it does not open, visit:\n\n' + auth + '\n');
    exec(`${process.platform === 'darwin' ? 'open' : 'xdg-open'} "${auth}"`);
  });
});

const tok = await (await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    code, client_id: clientId, client_secret: clientSecret,
    redirect_uri: redirect, grant_type: 'authorization_code',
  }),
})).json();
if (!tok.refresh_token) {
  if (tok.error === 'invalid_client') {
    console.error(`
Google says this client secret is not valid (it was probably deleted or
replaced). In Google Cloud > Google Auth Platform > Clients, open the Desktop
client, click "Add secret", download the new JSON file, and run this again.
`);
  } else {
    console.error('No refresh token returned:', tok.error, tok.error_description || '');
  }
  process.exit(1);
}
const H = { authorization: `Bearer ${tok.access_token}` };

const accts = await (await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', { headers: H })).json();
if (accts.error?.code === 429 || accts.error?.status === 'RESOURCE_EXHAUSTED') {
  // Before Google approves Business Profile API access, every project's quota
  // for these APIs is 0 requests/minute, so the very first call "exceeds" it.
  const proj = (accts.error.message.match(/project_number:(\d+)/) || [])[1];
  console.error(`
Google has not approved Business Profile API access for this project yet.
Sign-in worked; the API itself is still at its default quota of 0.

  1. Make sure the access request form was sent with project number ${proj ?? '(see Cloud console)'}:
     https://support.google.com/business/contact/api_default
  2. Wait for Google's approval email. To check: Cloud console > APIs & Services >
     My Business Account Management API > Quotas. 0 = waiting, 300 = approved.
  3. Then run this script again.
`);
  process.exit(1);
}
if (!accts.accounts?.length) { console.error('No Business Profile accounts visible to this Google user:', accts.error?.message || ''); process.exit(1); }

const found = [];
for (const a of accts.accounts) {
  const l = await (await fetch(
    `https://mybusinessbusinessinformation.googleapis.com/v1/${a.name}/locations?readMask=name,title&pageSize=100`,
    { headers: H })).json();
  for (const loc of l.locations ?? []) found.push({ account: a.name.split('/')[1], location: loc.name.split('/')[1], title: loc.title });
}
if (!found.length) { console.error('No locations found.'); process.exit(1); }

const pick = found.find((f) => /nico/i.test(f.title)) ?? found[0];
console.log('\nLocations found:'); found.forEach((f) => console.log(`  ${f === pick ? '→' : ' '} ${f.title}`));

// --- save to Cloudflare ------------------------------------------------------
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const who = spawnSync(npx, ['--yes', 'wrangler', 'whoami'], { encoding: 'utf8' });
if (!/logged in/i.test(`${who.stdout}${who.stderr}`) || /not authenticated|not logged in/i.test(`${who.stdout}${who.stderr}`)) {
  console.log('\nLogging in to Cloudflare (a browser tab opens)…');
  const login = spawnSync(npx, ['--yes', 'wrangler', 'login'], { stdio: 'inherit' });
  if (login.status !== 0) { console.error('Cloudflare login did not finish. Run this script again.'); process.exit(1); }
}

const secrets = {
  GBP_CLIENT_ID: clientId,
  GBP_CLIENT_SECRET: clientSecret,
  GBP_REFRESH_TOKEN: tok.refresh_token,
  GBP_ACCOUNT_ID: pick.account,
  GBP_LOCATION_ID: pick.location,
};
console.log('\nSaving to Cloudflare:');
let failed = 0;
for (const [name, value] of Object.entries(secrets)) {
  const r = spawnSync(npx, ['--yes', 'wrangler', 'secret', 'put', name], { input: value, encoding: 'utf8' });
  const out = `${r.stdout}${r.stderr}`;
  if (r.status === 0) {
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    const hint = /already in use/i.test(out)
      ? 'a plain variable with this name already exists: delete it in Cloudflare → Workers → nicovitolock-astro → Settings → Variables and secrets, then run this again'
      : out.split('\n').find((l) => /error/i.test(l)) || 'wrangler failed';
    console.log(`  ✗ ${name}: ${hint.replace(value, '•••')}`);
  }
}
console.log(failed
  ? '\nSome values were not saved — see above.\n'
  : '\nDone. Live Google reviews start showing on the site within a minute or two.\n');
