/* Pirents shared runtime: icons, shell, store, helpers. No framework, no build step. */
(function () {
  const P = (window.Pirents = window.Pirents || {});

  /* ---------- Icons (Lucide-style paths) ---------- */
  const paths = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    star: '<path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 3z"/>',
    heart: '<path d="M19.5 12.6 12 20l-7.5-7.4a4.6 4.6 0 0 1 6.5-6.5l1 1 1-1a4.6 4.6 0 0 1 6.5 6.5Z"/>',
    check: '<path d="m5 12 5 5L20 7"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    shield: '<path d="M12 3 5 6v6c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6l-7-3z"/><path d="m9 12 2 2 4-4"/>',
    truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    plane: '<path d="M2 16l20-8-6 12-3-6-6-3 15-3"/>',
    zap: '<path d="M13 3 4 14h7l-1 7 9-11h-7l1-7z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    message: '<path d="M4 5h16v11H8l-4 4V5z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    weight: '<circle cx="12" cy="6" r="3"/><path d="M6.5 9h11l2 12h-15l2-12z"/>',
    ruler: '<path d="M3 17 17 3l4 4L7 21l-4-4z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>',
    fold: '<path d="M4 6h10l6 6-6 6H4z"/><path d="M14 6v12"/>',
    tag: '<path d="M3 12V4h8l9 9-8 8-9-9z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 14h2"/>',
    camera: '<path d="M4 8h4l2-3h4l2 3h4v11H4z"/><circle cx="12" cy="13" r="3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    /* categories */
    wheelchair: '<circle cx="10" cy="16" r="5"/><circle cx="18" cy="19" r="2"/><path d="M10 11V5l6 1-1 6h4l2 6"/><circle cx="9" cy="3.5" r="1.5"/>',
    scooter: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 18h7M6 15V9h5M10 9l2 6M16 15h1l1-8h3"/><path d="M11 12h5"/>',
    bike: '<circle cx="6" cy="17" r="4"/><circle cx="18" cy="17" r="4"/><path d="M6 17 10 8h5l3 9M10 8h-2M12 17l-2-9M12 17h6"/>',
    car: '<path d="M4 16v-4l2-5h12l2 5v4z"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/><path d="M4 12h16"/>',
    stroller: '<path d="M5 6h3l2 7h9V7h-6"/><path d="M19 13a6 6 0 0 1-9 0"/><circle cx="9" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>',
    walker: '<path d="M6 21V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v13M6 12h12M9 5V3M15 5V3"/><circle cx="6" cy="21" r="1"/><circle cx="18" cy="21" r="1"/>',
    beach: '<path d="M3 19c3-2 6-2 9 0s6 2 9 0"/><path d="M12 15V6"/><path d="M4 8a8 8 0 0 1 16 0z"/>',
    other: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'
  };
  P.icon = (name, cls = "") => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.other}</svg>`;


  /* ---------- Pie mark ---------- */
  P.pie = (cls = "logo-pie") => `<svg class="${cls}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <g stroke="#2F2A27" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
      <path d="M4 36 L60 19 L52 42 L4 53 Z" fill="#F5E6C3"/>
      <path d="M4 42 L57.2 27 L55.2 32.8 L4 46.2 Z" fill="#C8294A" stroke="none"/>
      <path d="M4 49.6 L53.6 37.4 L52 42 L4 53 Z" fill="#E8A93A" stroke="none"/>
      <path d="M4 36 L60 19 L52 42 L4 53 Z" fill="none"/>
      <path d="M4 36 L30 4 Q36.3 0.7 37.5 7.75 Q43.9 4.4 45 11.5 Q51.4 8.2 52.5 15.25 Q58.9 11.9 60 19 Z" fill="#A7712F"/>
    </g></svg>`;

  /* ---------- Store (localStorage) ---------- */
  const KEY = "pirents.v1";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const save = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} };
  let state = Object.assign({ user: null, listings: [], bookings: [], favourites: [], requests: [] }, load());
  const commit = () => save(state);

  P.store = {
    get user() { return state.user; },
    signIn(u) { state.user = u; commit(); P.renderShell(); },
    signOut() { state.user = null; commit(); P.renderShell(); },
    listings() { return [...state.listings, ...window.PIRENTS_LISTINGS]; },
    listing(id) { return this.listings().find(l => l.id === id); },
    addListing(l) { l.id = "u" + Date.now().toString(36); l.rating = 0; l.reviews = 0; l.mine = true; l.created = new Date().toISOString(); state.listings.unshift(l); commit(); return l; },
    removeListing(id) { state.listings = state.listings.filter(l => l.id !== id); commit(); },
    bookings() { return state.bookings; },
    addBooking(b) { b.id = "b" + Date.now().toString(36); b.created = new Date().toISOString(); b.status = b.instant ? "confirmed" : "pending"; state.bookings.unshift(b); commit(); return b; },
    updateBooking(id, patch) { const b = state.bookings.find(x => x.id === id); if (b) Object.assign(b, patch); commit(); },
    favourites() { return state.favourites; },
    toggleFavourite(id) { const i = state.favourites.indexOf(id); if (i > -1) state.favourites.splice(i, 1); else state.favourites.push(id); commit(); return i === -1; },
    isFavourite(id) { return state.favourites.includes(id); },
    requests() { return state.requests; },
    addRequest(r) { r.id = "r" + Date.now().toString(36); r.created = new Date().toISOString(); r.status = "searching"; state.requests.unshift(r); commit(); return r; },
    removeRequest(id) { state.requests = state.requests.filter(r => r.id !== id); commit(); }
  };

  /* ---------- Helpers ---------- */
  P.money = (n) => "€" + Math.round(n).toLocaleString("en-IE");
  P.fmtDate = (iso) => iso ? new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) : "";
  P.days = (a, b) => { if (!a || !b) return 0; const d = (new Date(b) - new Date(a)) / 86400000; return d > 0 ? Math.round(d) : 0; };
  P.today = (offset = 0) => { const d = new Date(); d.setDate(d.getDate() + offset); return d.toISOString().slice(0, 10); };
  P.qs = () => Object.fromEntries(new URLSearchParams(location.search));
  P.category = (id) => window.PIRENTS_CATEGORIES.find(c => c.id === id) || window.PIRENTS_CATEGORIES[7];
  P.featureName = (f) => window.PIRENTS_FEATURES[f] || f;
  P.initials = (name) => name.split(" ").map(s => s[0]).join("").slice(0, 2).toUpperCase();
  P.esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  P.serviceFee = (subtotal) => Math.max(2, Math.round(subtotal * 0.1));
  P.quote = (listing, from, to, qty = 1) => {
    const days = P.days(from, to);
    const subtotal = listing.price * days * qty;
    const fee = days ? P.serviceFee(subtotal) : 0;
    return { days, subtotal, fee, deposit: listing.deposit, total: subtotal + fee };
  };

  /* ---------- Toasts ---------- */
  P.toast = (msg, icon = "check") => {
    let region = document.querySelector(".toast-region");
    if (!region) { region = document.createElement("div"); region.className = "toast-region"; region.setAttribute("role", "status"); region.setAttribute("aria-live", "polite"); document.body.appendChild(region); }
    const t = document.createElement("div"); t.className = "toast"; t.innerHTML = P.icon(icon) + "<span>" + P.esc(msg) + "</span>"; region.appendChild(t);
    setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity 200ms"; setTimeout(() => t.remove(), 220); }, 4000);
  };

  /* ---------- Listing card ---------- */
  P.listingCard = (l) => {
    const cat = P.category(l.category);
    const feats = (l.features || []).slice(0, 3).map(f => `<span class="tag">${P.esc(P.featureName(f))}</span>`).join("");
    const rating = l.reviews ? `<span class="rating">${P.icon("star")}${l.rating.toFixed(1)}</span><span class="muted">(${l.reviews})</span>` : `<span class="badge badge-accent">New</span>`;
    const fav = P.store.isFavourite(l.id);
    const name = `${l.title}, ${l.city}, ${P.money(l.price)} per day${l.reviews ? ", rated " + l.rating.toFixed(1) : ""}`;
    return `<article class="card listing-card">
      <div class="media"><div class="tile" style="background:${cat.tile}">${P.icon(cat.icon)}</div><span class="badge badge-paper">${P.esc(cat.short)}</span></div>
      <button class="fav" type="button" aria-pressed="${fav}" aria-label="${fav ? "Remove from" : "Save to"} favourites" data-fav="${l.id}">${P.icon("heart")}</button>
      <div class="body">
        <h3 class="title">${P.esc(l.title)}</h3>
        <div class="meta">${P.icon("pin", "icon-sm")}<span>${P.esc(l.area ? l.area + ", " : "")}${P.esc(l.city)}</span><span class="dot">·</span>${rating}</div>
        <div class="features">${feats}</div>
        <div class="foot"><span class="price">${P.money(l.price)} <span class="unit">/ day</span></span>${l.features?.includes("instant") ? `<span class="badge badge-accent">${P.icon("zap", "icon-sm")} Instant</span>` : ""}</div>
      </div>
      <a class="stretch" href="listing.html?id=${encodeURIComponent(l.id)}" aria-label="${P.esc(name)}"></a>
    </article>`;
  };
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-fav]"); if (!b) return;
    e.preventDefault();
    const on = P.store.toggleFavourite(b.dataset.fav);
    b.setAttribute("aria-pressed", on); b.setAttribute("aria-label", (on ? "Remove from" : "Save to") + " favourites");
    P.toast(on ? "Saved to favourites" : "Removed from favourites", "heart");
  });


  /* ---------- Scout: the no-results character and request form ---------- */
  const piRider = () => `
    <g class="pi-rider"><g class="pi-flip">
      <g class="pi-puffs"><circle class="pi-puff" cx="-6" cy="118" r="5" fill="#CBC7C0"/><circle class="pi-puff" cx="-2" cy="122" r="4" fill="#CBC7C0"/><circle class="pi-puff" cx="-10" cy="121" r="3" fill="#CBC7C0"/></g>
      <g class="pi-body">
        <rect x="0" y="62" width="56" height="13" rx="6.5" fill="#2F2A27"/>
        <rect x="8" y="70" width="12" height="40" rx="6" fill="#2F2A27"/>
        <rect x="36" y="70" width="12" height="40" rx="6" fill="#2F2A27"/>
        <circle cx="19" cy="68" r="5.5" fill="#fff"/><circle cx="37" cy="68" r="5.5" fill="#fff"/>
        <circle class="pi-pupil" cx="20" cy="68.5" r="2.4" fill="#2F2A27"/><circle class="pi-pupil" cx="38" cy="68.5" r="2.4" fill="#2F2A27"/>
        <g class="pi-glass"><circle cx="66" cy="56" r="11" fill="none" stroke="#2F2A27" stroke-width="4"/><circle cx="66" cy="56" r="8" fill="#fff" opacity=".7"/><path d="M74 64 84 74" stroke="#2F2A27" stroke-width="5" stroke-linecap="round"/></g>
        <text class="pi-q" x="28" y="52" text-anchor="middle" font-size="26" fill="#B5434B">?</text>
      </g>
      <g class="pi-wheel"><circle cx="14" cy="116" r="10" fill="#E8A93A" stroke="#2F2A27" stroke-width="4"/><path d="M14 108v16M6 116h16" stroke="#2F2A27" stroke-width="2.5"/></g>
      <g class="pi-wheel"><circle cx="42" cy="116" r="10" fill="#E8A93A" stroke="#2F2A27" stroke-width="4"/><path d="M42 108v16M34 116h16" stroke="#2F2A27" stroke-width="2.5"/></g>
    </g></g>`;
  const scene = (celebrate) => `<svg class="scout-scene ${celebrate ? "pi-celebrate" : ""}" viewBox="-10 20 320 120" aria-hidden="true" focusable="false">
      <g class="pi-cloud"><ellipse cx="0" cy="34" rx="22" ry="8" fill="#fff"/><ellipse cx="12" cy="30" rx="14" ry="9" fill="#fff"/></g>
      <g class="pi-cloud"><ellipse cx="0" cy="46" rx="16" ry="6" fill="#fff"/><ellipse cx="8" cy="43" rx="10" ry="7" fill="#fff"/></g>
      <line x1="-10" y1="126" x2="310" y2="126" stroke="#CBC7C0" stroke-width="2" stroke-dasharray="6 8"/>
      ${celebrate ? `<g>${[20, 60, 110, 150, 200, 240, 280].map((x, i) => `<rect class="pi-confetti" x="${x}" y="24" width="7" height="10" rx="2" fill="${["#B5434B", "#E8A93A", "#F5E6C3", "#2F2A27", "#C8294A"][i % 5]}"/>`).join("")}</g>` : `
      <g class="pi-pins">
        <g class="pi-pin"><path d="M120 124c-9-11-13-17-13-24a13 13 0 0 1 26 0c0 7-4 13-13 24z" fill="#F5E6C3" stroke="#B5434B" stroke-width="2.5"/><circle cx="120" cy="100" r="4.5" fill="#B5434B"/></g>
        <g class="pi-pin"><path d="M225 124c-9-11-13-17-13-24a13 13 0 0 1 26 0c0 7-4 13-13 24z" fill="#F5E6C3" stroke="#B5434B" stroke-width="2.5"/><circle cx="225" cy="100" r="4.5" fill="#B5434B"/></g>
        <g class="pi-pin"><path d="M280 124c-9-11-13-17-13-24a13 13 0 0 1 26 0c0 7-4 13-13 24z" fill="#F5E6C3" stroke="#B5434B" stroke-width="2.5"/><circle cx="280" cy="100" r="4.5" fill="#B5434B"/></g>
      </g>`}
      <g transform="translate(${celebrate ? 122 : 0} 0)">${piRider()}</g>
    </svg>`;

  P.scout = ({ where = "", category = "", from = "", to = "", filtered = false } = {}) => {
    const u = P.store.user;
    const catName = category ? P.category(category).name.toLowerCase() : "gear";
    const place = where ? P.esc(where) : "that spot";
    const cats = window.PIRENTS_CATEGORIES.map(c => `<option value="${c.id}"${c.id === category ? " selected" : ""}>${c.name}</option>`).join("");
    return `<section class="card scout" aria-labelledby="scout-title">
      <div>${scene(false)}<p class="text-sm muted" style="text-align:center;margin-top:8px">π is scouting ${place}. No luck so far.</p></div>
      <div class="scout-copy stack">
        <span class="eyebrow">Nothing here yet</span>
        <h2 id="scout-title">No ${catName} in ${place}… yet.</h2>
        <p class="ink-2">Pirents exists so you can rent mobility gear wherever you go. Tell us where, what and when, and we'll find a local owner or bring one on board before you arrive. Most requests get an answer within 48 hours.</p>
        <form class="scout-form" data-scout novalidate>
          <div class="form-grid">
            <div class="field"><label for="sc-where">Where do you need it?</label><div class="input-group">${P.icon("pin")}<input class="input" id="sc-where" name="where" list="cities" placeholder="e.g. Naxos" value="${P.esc(where)}" required></div><span class="error-msg">${P.icon("alert", "icon-sm")} Tell us the place</span></div>
            <div class="field"><label for="sc-cat">What do you need?</label><select class="select" id="sc-cat" name="category" required><option value="">Choose…</option>${cats}</select><span class="error-msg">${P.icon("alert", "icon-sm")} Choose a category</span></div>
            <div class="field"><label for="sc-from">From</label><input class="input" id="sc-from" name="from" type="date" min="${P.today()}" value="${P.esc(from)}" required><span class="error-msg">${P.icon("alert", "icon-sm")} Pick a start date</span></div>
            <div class="field"><label for="sc-to">Until</label><input class="input" id="sc-to" name="to" type="date" min="${P.today(1)}" value="${P.esc(to)}" required><span class="error-msg">${P.icon("alert", "icon-sm")} Pick an end date after the start</span></div>
            <div class="field span-2"><label for="sc-details">Anything specific? <span class="muted" style="font-weight:500">(optional)</span></label><input class="input" id="sc-details" name="details" maxlength="160" placeholder="e.g. seat width 46 cm, needs to fit in a taxi boot"></div>
            <div class="field span-2"><label for="sc-email">Where should we send the good news?</label><input class="input" id="sc-email" name="email" type="email" autocomplete="email" placeholder="e.g. you@example.com" value="${P.esc(u?.email || "")}" required><span class="error-msg">${P.icon("alert", "icon-sm")} Enter a valid email</span></div>
          </div>
          <div class="row wrap"><button class="btn btn-primary btn-lg" type="submit">${P.icon("search")} Find it for me</button>${filtered ? `<button class="btn btn-ghost" type="button" data-scout-reset>Clear filters instead</button>` : `<a class="btn btn-ghost" href="browse.html">See everything, everywhere</a>`}</div>
        </form>
      </div>
    </section>`;
  };
  P.scoutSuccess = (r) => {
    const cat = P.category(r.category).name.toLowerCase();
    return `<section class="card scout-success" aria-live="polite">
      <span class="speech">On it!</span>
      ${scene(true)}
      <h2>π is on the case in ${P.esc(r.where)}.</h2>
      <p class="ink-2">We'll look for a ${cat} owner in ${P.esc(r.where)} for ${P.fmtDate(r.from)} to ${P.fmtDate(r.to)} and email <b>${P.esc(r.email)}</b> as soon as we have one. You can follow the request from your dashboard.</p>
      <div class="row wrap" style="justify-content:center"><a class="btn btn-primary" href="dashboard.html?tab=requests">See my requests</a><a class="btn btn-outline" href="browse.html">Browse other cities</a></div>
    </section>`;
  };
  document.addEventListener("submit", (e) => {
    const f = e.target.closest("form[data-scout]"); if (!f) return;
    e.preventDefault();
    const v = (n) => f.elements[n].value.trim();
    const bad = (n, cond) => { f.elements[n].closest(".field").classList.toggle("error", cond); return cond; };
    const errors = [bad("where", !v("where")), bad("category", !v("category")), bad("from", !v("from")), bad("to", !v("to") || (v("from") && v("to") <= v("from"))), bad("email", !/^\S+@\S+\.\S+$/.test(v("email")))];
    if (errors.some(Boolean)) { f.querySelector(".field.error input, .field.error select")?.focus(); return; }
    const r = P.store.addRequest({ where: v("where"), category: v("category"), from: v("from"), to: v("to"), details: v("details"), email: v("email") });
    const host = f.closest(".scout"); host.outerHTML = P.scoutSuccess(r);
    P.toast("Request sent. We'll be in touch.", "check");
    document.querySelector(".scout-success h2")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  document.addEventListener("input", (e) => { const f = e.target.closest("form[data-scout] .field.error"); if (f) f.classList.remove("error"); });

  /* ---------- Shell: header, footer, auth ---------- */
  const page = location.pathname.split("/").pop() || "index.html";
  const navItems = [["browse.html", "Browse"], ["how-it-works.html", "How it works"], ["list-item.html", "List your item"], ["dashboard.html", "Dashboard"]];
  const logo = (inverse) => `<a class="logo${inverse ? " inverse" : ""}" href="index.html" aria-label="Pirents home">${P.pie()}<span>Pi Rents</span></a>`;
  P.logo = logo;

  P.renderShell = () => {
    const u = P.store.user;
    const account = u
      ? `<a class="btn btn-ghost" href="dashboard.html" style="padding:0 8px 0 4px"><span class="avatar" aria-hidden="true">${P.initials(u.name)}</span><span class="hide-mobile">${P.esc(u.name.split(" ")[0])}</span></a>`
      : `<button class="btn btn-ghost hide-mobile" type="button" data-auth>Sign in</button>`;
    const header = document.getElementById("site-header");
    if (header) header.innerHTML = `<a class="skip-link" href="#main">Skip to content</a><div class="container">
      ${logo(false)}
      <ul class="nav-links">${navItems.slice(0, 2).concat([navItems[3]]).map(([h, t]) => `<li><a href="${h}"${page === h ? ' aria-current="page"' : ""}>${t}</a></li>`).join("")}</ul>
      <div class="nav-actions">
        <a class="btn btn-outline hide-mobile" href="list-item.html">${P.icon("plus")} List your item</a>
        ${account}
        <button class="btn btn-ghost btn-icon menu-btn" type="button" aria-label="Open menu" aria-expanded="false" data-menu>${P.icon("menu", "icon-lg")}</button>
      </div></div>
      <div class="mobile-sheet" data-open="false" id="mobile-sheet">
        <div class="row between" style="margin-bottom:16px">${logo(false)}<button class="btn btn-ghost btn-icon" type="button" aria-label="Close menu" data-menu-close>${P.icon("x", "icon-lg")}</button></div>
        <nav>${navItems.map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}${u ? `<a href="#" data-signout>Sign out</a>` : `<a href="#" data-auth>Sign in</a>`}</nav>
        <a class="btn btn-primary btn-block btn-lg" href="list-item.html" style="margin-top:24px">${P.icon("plus")} List your item</a>
      </div>`;
    const footer = document.getElementById("site-footer");
    if (footer) footer.innerHTML = `<div class="container">
      <div class="footer-grid">
        <div class="stack">${logo(true)}<p class="measure" style="max-width:36ch">Rent wheelchairs, scooters, bikes, cars and more from local owners. Get around wherever you are.</p></div>
        <div><h4>Rent</h4><ul>${window.PIRENTS_CATEGORIES.slice(0, 5).map(c => `<li><a href="browse.html?category=${c.id}">${c.name}</a></li>`).join("")}</ul></div>
        <div><h4>Cities</h4><ul>${window.PIRENTS_CITIES.slice(0, 5).map(c => `<li><a href="browse.html?where=${c}">${c}</a></li>`).join("")}</ul></div>
        <div><h4>Pirents</h4><ul><li><a href="how-it-works.html">How it works</a></li><li><a href="list-item.html">List your item</a></li><li><a href="how-it-works.html#trust">Trust &amp; safety</a></li><li><a href="styleguide.html">Design system</a></li></ul></div>
      </div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} Pirents. Made for getting around.</span><span>Prototype. Bookings and accounts are stored in this browser only.</span></div>
    </div>`;
  };

  const closeMenu = () => { const s = document.getElementById("mobile-sheet"); if (!s || s.dataset.open !== "true") return; s.dataset.open = "false"; const b = document.querySelector("[data-menu]"); b.setAttribute("aria-expanded", "false"); b.focus(); };
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-menu]")) { const s = document.getElementById("mobile-sheet"); s.dataset.open = "true"; document.querySelector("[data-menu]").setAttribute("aria-expanded", "true"); s.querySelector("a,button").focus(); }
    if (e.target.closest("[data-menu-close]")) closeMenu();
    if (e.target.closest("[data-auth]")) { e.preventDefault(); P.openAuth(); }
    if (e.target.closest("[data-signout]")) { e.preventDefault(); P.store.signOut(); P.toast("Signed out"); }
  });

  P.openAuth = (onDone) => {
    let dlg = document.getElementById("auth-dialog");
    if (!dlg) {
      dlg = document.createElement("dialog"); dlg.id = "auth-dialog";
      dlg.innerHTML = `<form class="modal stack" method="dialog" novalidate>
        <div class="row between"><h3>Sign in or create an account</h3><button class="btn btn-ghost btn-icon btn-sm" type="button" value="cancel" aria-label="Close" data-close>${P.icon("x")}</button></div>
        <p class="muted text-sm">This prototype keeps your account in this browser. No password needed.</p>
        <div class="field"><label for="auth-name">Full name</label><input class="input" id="auth-name" name="name" autocomplete="name" placeholder="e.g. Maria Kostas" required></div>
        <div class="field"><label for="auth-email">Email</label><input class="input" id="auth-email" name="email" type="email" autocomplete="email" placeholder="e.g. maria@example.com" required><span class="error-msg">${P.icon("alert", "icon-sm")} Enter a valid email address</span></div>
        <button class="btn btn-primary btn-block btn-lg" type="submit">Continue</button>
        <p class="muted text-xs" style="text-align:center">By continuing you agree to the rental terms and community rules.</p>
      </form>`;
      document.body.appendChild(dlg);
      dlg.querySelector("[data-close]").addEventListener("click", () => dlg.close());
      dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
      dlg.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const f = e.target, name = f.name.value.trim(), email = f.email.value.trim();
        const emailField = f.email.closest(".field"); emailField.classList.toggle("error", !/^\S+@\S+\.\S+$/.test(email));
        f.name.closest(".field").classList.toggle("error", !name);
        if (!name || !/^\S+@\S+\.\S+$/.test(email)) return;
        P.store.signIn({ name, email, since: new Date().getFullYear() });
        dlg.close(); P.toast(`Welcome, ${name.split(" ")[0]}`);
        if (typeof dlg._onDone === "function") dlg._onDone();
      });
    }
    dlg._onDone = onDone; dlg.showModal(); dlg.querySelector("input").focus();
  };
  P.requireAuth = (cb) => (P.store.user ? cb() : P.openAuth(cb));

  P.renderShell();
})();
