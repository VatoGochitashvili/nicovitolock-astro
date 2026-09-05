/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Delivers quote-form submissions to the shop. Tries providers in order and
 * stops at the first success, so ONE of these being configured is enough:
 *
 *   1. RESEND_API_KEY      — resend.com, free tier, ~2 min signup
 *   2. WEB3FORMS_KEY       — web3forms.com, free, no account, key by email
 *   3. FORM_WEBHOOK_URL    — any endpoint (Zapier / Make / n8n / your own)
 *
 * SETUP — Cloudflare dashboard → Pages project → Settings → Environment
 * variables → Production. Add ONE of the above, then redeploy.
 *
 *   RESEND_API_KEY   re_xxxxxxxx
 *   CONTACT_TO       nicoandvitolock@gmail.com   (optional, this is default)
 *   CONTACT_FROM     onboarding@resend.dev       (optional; use your own
 *                                                 domain once verified)
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
      from: env.CONTACT_FROM || 'Nico & Vito Website <onboarding@resend.dev>',
      to: [to],
      reply_to: f.email || undefined,
      subject, html, text,
    }),
  });
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

export async function onRequestPost({ request, env }) {
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

  const to = env.CONTACT_TO || 'nicoandvitolock@gmail.com';

  const providers = [];
  if (env.RESEND_API_KEY) providers.push(['resend', () => viaResend(env, to, f)]);
  if (env.WEB3FORMS_KEY) providers.push(['web3forms', () => viaWeb3Forms(env, to, f)]);
  if (env.FORM_WEBHOOK_URL) providers.push(['webhook', () => viaWebhook(env, f)]);

  if (!providers.length) {
    // Nothing configured yet — tell the client so it shows the phone fallback.
    return json({ ok: false, error: 'mail_not_configured' }, 503);
  }

  const tried = [];
  for (const [name, send] of providers) {
    tried.push(name);
    try {
      if (await send()) return json({ ok: true, via: name });
    } catch {
      /* try the next provider */
    }
  }
  return json({ ok: false, error: 'send_failed', tried }, 502);
}

// Method-specific handlers only: a catch-all `onRequest` would take precedence.
export const onRequestGet = () =>
  new Response('Method not allowed', { status: 405, headers: { allow: 'POST' } });
