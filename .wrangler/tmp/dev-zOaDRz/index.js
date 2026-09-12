var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker/contact.js
var ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
var esc = /* @__PURE__ */ __name((v) => String(v ?? "").replace(/[&<>"']/g, (c) => ESC[c]), "esc");
var json = /* @__PURE__ */ __name((body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "content-type": "application/json", "cache-control": "no-store" }
}), "json");
function buildMessage(f) {
  const rows = [
    ["Name", f.name],
    ["Phone", f.phone],
    ["Email", f.email || "\u2014"],
    ["Service", f.service || "\u2014"],
    ["Area", f.area || "\u2014"]
  ];
  const text = `New request from nicovitolocksmith.com

` + rows.map(([k, v]) => `${k}: ${v}`).join("\n") + (f.message ? `

Details:
${f.message}` : "");
  const html = `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px">
    <h2 style="color:#22414f;margin:0 0 2px">New website request</h2>
    <p style="color:#5d6f78;margin:0 0 18px;font-size:13px">nicovitolocksmith.com</p>
    <table style="border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#5d6f78;font:600 13px system-ui">${esc(k)}</td><td style="padding:6px 0;color:#1a2b33;font:15px system-ui">${esc(v)}</td></tr>`).join("")}</table>
    ${f.message ? `<p style="margin:18px 0 4px;color:#5d6f78;font:600 13px system-ui">DETAILS</p>
      <p style="white-space:pre-wrap;color:#1a2b33;font:15px/1.6 system-ui;margin:0">${esc(f.message)}</p>` : ""}
    <p style="margin-top:22px">
      <a href="tel:${esc(f.phone.replace(/[^\d+]/g, ""))}"
         style="background:#f2ae39;color:#102330;padding:11px 20px;border-radius:6px;
                text-decoration:none;font-weight:700;display:inline-block">Call ${esc(f.name)}</a>
    </p>
  </div>`;
  const subject = `Website: ${f.service || "Locksmith request"} \u2014 ${f.name}${f.area ? ` (${f.area})` : ""}`;
  return { text, html, subject };
}
__name(buildMessage, "buildMessage");
async function viaResend(env, to, f) {
  const { text, html, subject } = buildMessage(f);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: env.CONTACT_FROM || "Nico & Vito Locksmith <noreply@nicovitolocksmith.com>",
      to: [to],
      reply_to: f.email || void 0,
      subject,
      html,
      text
    })
  });
  if (!res.ok) {
    console.log("resend rejected", res.status, (await res.text()).slice(0, 300));
  }
  return res.ok;
}
__name(viaResend, "viaResend");
async function viaWeb3Forms(env, to, f) {
  const { text, subject } = buildMessage(f);
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      access_key: env.WEB3FORMS_KEY,
      subject,
      from_name: "Nico & Vito Website",
      to_email: to,
      replyto: f.email || void 0,
      message: text,
      name: f.name,
      phone: f.phone
    })
  });
  if (!res.ok) console.log("web3forms rejected", res.status, (await res.text()).slice(0, 300));
  return res.ok;
}
__name(viaWeb3Forms, "viaWeb3Forms");
async function viaWebhook(env, f) {
  const res = await fetch(env.FORM_WEBHOOK_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ source: "nicovitolocksmith.com", receivedAt: (/* @__PURE__ */ new Date()).toISOString(), ...f })
  });
  return res.ok;
}
__name(viaWebhook, "viaWebhook");
async function textShop(env, f) {
  const sid = env.TWILIO_ACCOUNT_SID;
  const token = env.TWILIO_AUTH_TOKEN;
  const from = env.TWILIO_FROM;
  if (!sid || !token || !from) return false;
  const to = env.SMS_TO || "+17186186002";
  const body = `New ${f.service || "locksmith"} request
${f.name} \u2014 ${f.phone}
` + (f.area ? `${f.area}
` : "") + (f.message ? `
${f.message.slice(0, 320)}` : "");
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      authorization: "Basic " + btoa(`${sid}:${token}`),
      "content-type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({ To: to, From: from, Body: body })
  });
  if (!res.ok) console.log("twilio rejected", res.status, (await res.text()).slice(0, 300));
  return res.ok;
}
__name(textShop, "textShop");
async function handleContact(request, env) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: { allow: "POST" } });
  }
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }
  if ((form.get("company") || "").toString().trim()) return json({ ok: true });
  const get = /* @__PURE__ */ __name((k, max) => (form.get(k) || "").toString().trim().slice(0, max), "get");
  const f = {
    name: get("name", 120),
    phone: get("phone", 40),
    email: get("email", 160),
    service: get("service", 120),
    area: get("area", 120),
    message: get("message", 4e3)
  };
  if (!f.name || !f.phone) return json({ ok: false, error: "missing_fields" }, 400);
  const to = env.CONTACT_TO || "services@nicovitolocksmith.com";
  const providers = [];
  if (env.RESEND_API_KEY) providers.push(["resend", () => viaResend(env, to, f)]);
  if (env.WEB3FORMS_KEY) providers.push(["web3forms", () => viaWeb3Forms(env, to, f)]);
  if (env.FORM_WEBHOOK_URL) providers.push(["webhook", () => viaWebhook(env, f)]);
  if (!providers.length) {
    return json({ ok: false, error: "mail_not_configured" }, 503);
  }
  const sms = textShop(env, f).catch(() => false);
  const tried = [];
  for (const [name, send] of providers) {
    tried.push(name);
    try {
      if (await send()) return json({ ok: true, via: name, sms: await sms });
    } catch {
    }
  }
  return json({ ok: false, error: "send_failed", tried, sms: await sms }, 502);
}
__name(handleContact, "handleContact");

// worker/index.js
var worker_default = {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/contact" || pathname === "/api/contact/") {
      return handleContact(request, env);
    }
    return env.ASSETS.fetch(request);
  }
};

// ../../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-sD84l3/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// ../../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-sD84l3/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
