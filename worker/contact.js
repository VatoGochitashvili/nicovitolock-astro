/**
 * POST /api/contact — quote-form delivery.
 *
 * This was written as a Cloudflare PAGES function and lived in functions/.
 * The site is deployed as a WORKER, which does not read that directory, so
 * the endpoint 404'd from launch and no submission was ever delivered. It is
 * now a plain handler called from worker/index.js.
 *
 * Delivers quote-form submissions to the shop. Tries providers in order and
 * stops at the first success, so ONE of these being configured is enough:
 *
 *   1. RESEND_API_KEY      — resend.com, free tier, ~2 min signup
 *   2. WEB3FORMS_KEY       — web3forms.com, free, no account, key by email
 *   3. FORM_WEBHOOK_URL    — any endpoint (Zapier / Make / n8n / your own)
 *
 * SMS TO THE SHOP PHONE is separate and additive: if the TWILIO_* vars are
 * set, every submission also texts SMS_TO (default 718-618-6002) with the
 * name, number and job. It runs alongside whichever email provider is
 * configured — a failed text never fails the request, because the email is
 * the record and the text is only the nudge.
 *
 *   TWILIO_ACCOUNT_SID  ACxxxxxxxx
 *   TWILIO_AUTH_TOKEN   xxxxxxxx
 *   TWILIO_FROM         +1XXXXXXXXXX   (a number bought in the Twilio console)
 *   SMS_TO              +17186186002   (optional, this is the default)
 *
 * SETUP — Cloudflare dashboard → Workers & Pages → nicovitolock-astro →
 * Settings → Variables and Secrets. Add ONE of the above, then redeploy.
 *
 *   RESEND_API_KEY   re_xxxxxxxx
 *   CONTACT_TO       services@nicovitolocksmith.com  (optional, this is default;
 *                                    Cloudflare Email Routing forwards it to
 *                                    nicoandvitolock@gmail.com)
 *   CONTACT_FROM     noreply@nicovitolocksmith.com  (optional; the domain is
 *                                    verified in Resend, DKIM on the root and
 *                                    SPF on send.nicovitolocksmith.com)
 *
 * GETTING IT ON YOUR PHONE: install Gmail on the phone and turn notifications
 * on for that address — a submission then pushes within seconds. Real SMS
 * needs a paid gateway (Twilio); the form's "Text us" button is the free
 * equivalent and opens the customer's own SMS app addressed to the shop.
 *
 * With NOTHING configured this returns 503 and the form falls back to showing
 * the phone number plus a prefilled mailto, so a lead is never silently lost.
 */

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

function buildMessage(f) {
  const rows = [
    ['Name', f.name],
    ['Phone', f.phone],
    ['Email', f.email || '—'],
    ['Service', f.service || '—'],
    ['Area', f.area || '—'],
  ];
  const text =
    `New request from nicovitolocksmith.com\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join('\n') +
    (f.message ? `\n\nDetails:\n${f.message}` : '');

  const html = `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px">
    <h2 style="color:#22414f;margin:0 0 2px">New website request</h2>
    <p style="color:#5d6f78;margin:0 0 18px;font-size:13px">nicovitolocksmith.com</p>
    <table style="border-collapse:collapse">${rows.map(([k, v]) =>
      `<tr><td style="padding:6px 14px 6px 0;color:#5d6f78;font:600 13px system-ui">${esc(k)}</td>` +
      `<td style="padding:6px 0;color:#1a2b33;font:15px system-ui">${esc(v)}</td></tr>`).join('')}</table>
    ${f.message ? `<p style="margin:18px 0 4px;color:#5d6f78;font:600 13px system-ui">DETAILS</p>
      <p style="white-space:pre-wrap;color:#1a2b33;font:15px/1.6 system-ui;margin:0">${esc(f.message)}</p>` : ''}
    <p style="margin-top:22px">
      <a href="tel:${esc(f.phone.replace(/[^\d+]/g, ''))}"
         style="background:#f2ae39;color:#102330;padding:11px 20px;border-radius:6px;
                text-decoration:none;font-weight:700;display:inline-block">Call ${esc(f.name)}</a>
    </p>
  </div>`;

  const subject = `Website: ${f.service || 'Locksmith request'} — ${f.name}${f.area ? ` (${f.area})` : ''}`;
  return { text, html, subject };
}

async function viaResend(env, to, f) {
  const { text, html, subject } = buildMessage(f);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM || 'Nico & Vito Locksmith <noreply@nicovitolocksmith.com>',
      to: [to],
      reply_to: f.email || undefined,
      subject, html, text,
    }),
  });
  if (!res.ok) {
    // Logged to Workers observability, which wrangler.jsonc enables. Without
    // this a rejected send looks identical to a network failure.
    console.log('resend rejected', res.status, (await res.text()).slice(0, 300));
  }
  return res.ok;
}

async function viaWeb3Forms(env, to, f) {
  const { text, subject } = buildMessage(f);
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      access_key: env.WEB3FORMS_KEY,
      subject,
      from_name: 'Nico & Vito Website',
      to_email: to,
      replyto: f.email || undefined,
      message: text,
      name: f.name,
      phone: f.phone,
    }),
  });
  if (!res.ok) console.log('web3forms rejected', res.status, (await res.text()).slice(0, 300));
  return res.ok;
}

async function viaWebhook(env, f) {
  const res = await fetch(env.FORM_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ source: 'nicovitolocksmith.com', receivedAt: new Date().toISOString(), ...f }),
  });
  return res.ok;
}

/**
 * Text the shop. Deliberately fire-and-forget: the email is the record of the
 * lead, so a Twilio outage or an expired token must not turn a captured lead
 * into a 502 for the customer.
 */
async function textShop(env, f) {
  const sid = env.TWILIO_ACCOUNT_SID;
  const token = env.TWILIO_AUTH_TOKEN;
  const from = env.TWILIO_FROM;
  if (!sid || !token || !from) return false;

  const to = env.SMS_TO || '+17186186002';
  const body =
    `New ${f.service || 'locksmith'} request\n` +
    `${f.name} — ${f.phone}\n` +
    (f.area ? `${f.area}\n` : '') +
    (f.message ? `\n${f.message.slice(0, 320)}` : '');

  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      authorization: 'Basic ' + btoa(`${sid}:${token}`),
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ To: to, From: from, Body: body }),
  });
  if (!res.ok) console.log('twilio rejected', res.status, (await res.text()).slice(0, 300));
  return res.ok;
}

export async function handleContact(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: { allow: 'POST' } });
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  // Honeypot: bots fill the hidden field. Return 200 so they learn nothing.
  if ((form.get('company') || '').toString().trim()) return json({ ok: true });

  const get = (k, max) => (form.get(k) || '').toString().trim().slice(0, max);
  const f = {
    name: get('name', 120),
    phone: get('phone', 40),
    email: get('email', 160),
    service: get('service', 120),
    area: get('area', 120),
    message: get('message', 4000),
  };
  if (!f.name || !f.phone) return json({ ok: false, error: 'missing_fields' }, 400);

  const to = env.CONTACT_TO || 'services@nicovitolocksmith.com';

  const providers = [];
  if (env.RESEND_API_KEY) providers.push(['resend', () => viaResend(env, to, f)]);
  if (env.WEB3FORMS_KEY) providers.push(['web3forms', () => viaWeb3Forms(env, to, f)]);
  if (env.FORM_WEBHOOK_URL) providers.push(['webhook', () => viaWebhook(env, f)]);

  if (!providers.length) {
    // Nothing configured yet — tell the client so it shows the phone fallback.
    return json({ ok: false, error: 'mail_not_configured' }, 503);
  }

  // Kick the text off before the email so the phone buzzes as early as
  // possible; it is awaited at the end so the Worker is not torn down first.
  const sms = textShop(env, f).catch(() => false);

  const tried = [];
  for (const [name, send] of providers) {
    tried.push(name);
    try {
      if (await send()) return json({ ok: true, via: name, sms: await sms });
    } catch {
      /* try the next provider */
    }
  }
  // The email failed. If the text got through the lead is not lost, and the
  // response says so rather than reporting a flat failure.
  return json({ ok: false, error: 'send_failed', tried, sms: await sms }, 502);
}
