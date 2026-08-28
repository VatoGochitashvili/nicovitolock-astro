/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Receives the quote form and emails it to the shop.
 *
 * SETUP (one-time, in the Cloudflare Pages dashboard →
 * Settings → Environment variables):
 *
 *   RESEND_API_KEY   required   API key from https://resend.com (free tier is
 *                               plenty for a form like this)
 *   CONTACT_TO       optional   defaults to nicoandvitolock@gmail.com
 *   CONTACT_FROM     optional   defaults to onboarding@resend.dev — replace
 *                               with an address on your verified domain,
 *                               e.g. website@nicovitolocksmith.com
 *
 * Until RESEND_API_KEY is set this returns 503, and the form falls back to
 * showing the phone number and a prefilled mailto link — so a lead is never
 * silently lost.
 */

const ESCAPE = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ESCAPE[c]);

export async function onRequestPost({ request, env }) {
  const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json' },
    });

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  // Honeypot — bots fill the hidden "company" field. Return 200 so they
  // don't learn anything, but don't send the mail.
  if ((form.get('company') || '').trim()) return json({ ok: true });

  const name = (form.get('name') || '').toString().trim().slice(0, 120);
  const phone = (form.get('phone') || '').toString().trim().slice(0, 40);
  const email = (form.get('email') || '').toString().trim().slice(0, 160);
  const service = (form.get('service') || '').toString().trim().slice(0, 120);
  const area = (form.get('area') || '').toString().trim().slice(0, 120);
  const message = (form.get('message') || '').toString().trim().slice(0, 4000);

  if (!name || !phone) return json({ ok: false, error: 'missing_fields' }, 400);

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — tell the client so it shows the phone fallback.
    return json({ ok: false, error: 'mail_not_configured' }, 503);
  }

  const to = env.CONTACT_TO || 'nicoandvitolock@gmail.com';
  const from = env.CONTACT_FROM || 'Nico & Vito Website <onboarding@resend.dev>';

  const rows = [
    ['Name', name],
    ['Phone', phone],
    ['Email', email || '—'],
    ['Service', service || '—'],
    ['Area', area || '—'],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#5d6f78;font:600 13px system-ui">${esc(k)}</td>` +
        `<td style="padding:6px 0;color:#1a2b33;font:15px system-ui">${esc(v)}</td></tr>`
    )
    .join('');

  const html = `<div style="font-family:system-ui,sans-serif;max-width:560px">
    <h2 style="color:#22414f;margin:0 0 4px">New website request</h2>
    <p style="color:#5d6f78;margin:0 0 18px;font-size:14px">nicovitolocksmith.com</p>
    <table style="border-collapse:collapse">${rows}</table>
    ${message ? `<p style="margin:18px 0 6px;color:#5d6f78;font:600 13px system-ui">DETAILS</p>
    <p style="white-space:pre-wrap;color:#1a2b33;font:15px/1.6 system-ui;margin:0">${esc(message)}</p>` : ''}
    <p style="margin-top:22px"><a href="tel:${esc(phone.replace(/[^\d+]/g, ''))}"
      style="background:#f2ae39;color:#102330;padding:10px 18px;border-radius:6px;
      text-decoration:none;font-weight:700">Call ${esc(name)}</a></p>
  </div>`;

  const text =
    `New website request — nicovitolocksmith.com\n\n` +
    `Name: ${name}\nPhone: ${phone}\nEmail: ${email || '—'}\n` +
    `Service: ${service || '—'}\nArea: ${area || '—'}\n\n${message || ''}`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email || undefined,
        subject: `Website: ${service || 'Locksmith request'} — ${name}${area ? ` (${area})` : ''}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      return json({ ok: false, error: 'mail_failed' }, 502);
    }
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: 'mail_failed' }, 502);
  }
}

// Anything other than POST. (Exporting method-specific handlers only —
// a catch-all `onRequest` would take precedence over `onRequestPost`.)
export const onRequestGet = () =>
  new Response('Method not allowed', { status: 405, headers: { allow: 'POST' } });
