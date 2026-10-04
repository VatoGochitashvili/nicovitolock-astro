// One-time setup for live Google reviews (worker/reviews.js).
//
//   node scripts/gbp-connect.mjs <OAUTH_CLIENT_ID> <OAUTH_CLIENT_SECRET>
//
// Opens Google's consent screen in your browser. Sign in with the Google
// account that manages the Nico & Vito Business Profile. The script catches
// the redirect on 127.0.0.1, exchanges it for a refresh token, looks up your
// account and location IDs, and prints the exact `wrangler secret put`
// commands to run. Nothing is written to disk and nothing is sent anywhere
// except Google.
//
// Prerequisites (Google Cloud console, once):
//   1. Request access to the Google Business Profile APIs for your project.
//   2. Enable "Google My Business API", "My Business Account Management API"
//      and "My Business Business Information API".
//   3. Create an OAuth client of type "Desktop app".
import http from 'node:http';
import { exec } from 'node:child_process';

const [clientId, clientSecret] = process.argv.slice(2);
if (!clientId || !clientSecret) {
  console.error('usage: node scripts/gbp-connect.mjs <OAUTH_CLIENT_ID> <OAUTH_CLIENT_SECRET>');
  process.exit(1);
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
    res.end(c ? 'Connected. You can close this tab and go back to the terminal.' : 'No code received.');
    srv.close();
    c ? resolve(c) : reject(new Error(u.searchParams.get('error') || 'no code'));
  }).listen(PORT, '127.0.0.1', () => {
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
if (!tok.refresh_token) { console.error('No refresh token returned:', tok); process.exit(1); }
const H = { authorization: `Bearer ${tok.access_token}` };

const accts = await (await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', { headers: H })).json();
if (!accts.accounts?.length) { console.error('No Business Profile accounts visible to this Google user:', accts); process.exit(1); }

const found = [];
for (const a of accts.accounts) {
  const l = await (await fetch(
    `https://mybusinessbusinessinformation.googleapis.com/v1/${a.name}/locations?readMask=name,title&pageSize=100`,
    { headers: H })).json();
  for (const loc of l.locations ?? []) found.push({ account: a.name.split('/')[1], location: loc.name.split('/')[1], title: loc.title });
}
if (!found.length) { console.error('No locations found.'); process.exit(1); }

const pick = found.find((f) => /nico/i.test(f.title)) ?? found[0];
console.log('\nLocations found:'); found.forEach((f) => console.log(`  ${f === pick ? '→' : ' '} ${f.title}  (account ${f.account}, location ${f.location})`));
console.log('\nRun these from the project folder (each asks you to paste the value):\n');
const put = (k, v) => console.log(`  echo '${v}' | npx wrangler secret put ${k}`);
put('GBP_CLIENT_ID', clientId);
put('GBP_CLIENT_SECRET', clientSecret);
put('GBP_REFRESH_TOKEN', tok.refresh_token);
put('GBP_ACCOUNT_ID', pick.account);
put('GBP_LOCATION_ID', pick.location);
console.log('\nOr add the same five as encrypted variables under Workers → nicovitolock-astro → Settings.\n');
