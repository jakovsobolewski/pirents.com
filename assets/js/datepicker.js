/* Pirents range date picker. Enhances a pair of <input type="date"> inside .search-seg segments:
   the inputs become hidden ISO fields (same id/name, so forms and page scripts keep working) and the
   whole segment opens a two-month calendar popover. */
(function () {
  const P = (window.Pirents = window.Pirents || {});
  const pad = (n) => String(n).padStart(2, "0");
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = (s) => (s ? new Date(s + "T00:00:00") : null);
  const fmt = (s) => (s ? parse(s).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) : "");
  const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return iso(d); };
  const daysBetween = (a, b) => Math.round((parse(b) - parse(a)) / 864e5);
  const DOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const chev = (dir) => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${dir < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}"/></svg>`;
  const valueDesc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");

  P.dateRange = function (from, to, opts = {}) {
    const inputs = [from, to];
    const host = opts.host || from.closest("form");
    const segs = inputs.map((inp) => inp.closest(".search-seg") || inp.parentElement);
    const placeholder = opts.placeholder || "Add date";
    const twoUp = matchMedia("(min-width: 720px)");
    let active = 0, view = null, hover = "", isOpen = false;

    const btns = inputs.map((inp, i) => {
      inp.type = "hidden";
      Object.defineProperty(inp, "value", { configurable: true, get() { return valueDesc.get.call(this); }, set(v) { valueDesc.set.call(this, v); sync(); } });
      const b = document.createElement("button");
      b.type = "button"; b.className = "dp-trigger"; b.id = inp.id + "-btn";
      b.setAttribute("aria-haspopup", "dialog"); b.setAttribute("aria-expanded", "false");
      const lab = segs[i].querySelector("label"); if (lab) lab.htmlFor = b.id;
      inp.after(b);
      segs[i].classList.add("dp-seg");
      segs[i].addEventListener("click", () => open(i));
      return b;
    });

    const pop = document.createElement("div");
    pop.className = "dp-pop"; pop.hidden = true;
    pop.setAttribute("role", "dialog"); pop.setAttribute("aria-label", "Choose rental dates");
    host.classList.add("dp-host"); host.appendChild(pop);

    const minDate = () => from.min || iso(new Date());
    function sync() {
      inputs.forEach((inp, i) => { btns[i].textContent = fmt(inp.value) || placeholder; btns[i].classList.toggle("is-empty", !inp.value); });
      if (isOpen) paint();
    }
    function set(f, t) {
      valueDesc.set.call(from, f); valueDesc.set.call(to, t);
      sync();
      inputs.forEach((inp) => inp.dispatchEvent(new Event("change", { bubbles: true })));
    }

    function render() {
      const months = twoUp.matches ? 2 : 1;
      const min = parse(minDate()); const firstAllowed = new Date(min.getFullYear(), min.getMonth(), 1);
      let html = `<div class="dp-months">`;
      for (let m = 0; m < months; m++) {
        const first = new Date(view.getFullYear(), view.getMonth() + m, 1);
        const lead = (first.getDay() + 6) % 7;
        const count = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
        html += `<div class="dp-month"><div class="dp-head">`;
        html += m === 0 ? `<button type="button" class="dp-nav" data-nav="-1" aria-label="Previous month" ${first <= firstAllowed ? "disabled" : ""}>${chev(-1)}</button>` : `<span class="dp-nav-spacer"></span>`;
        html += `<span class="dp-title">${first.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</span>`;
        html += m === months - 1 ? `<button type="button" class="dp-nav" data-nav="1" aria-label="Next month">${chev(1)}</button>` : `<span class="dp-nav-spacer"></span>`;
        html += `</div><div class="dp-grid" role="grid">${DOW.map((d) => `<span class="dp-dow" aria-hidden="true">${d}</span>`).join("")}`;
        html += `<span class="dp-cell"></span>`.repeat(lead);
        for (let d = 1; d <= count; d++) {
          const day = iso(new Date(first.getFullYear(), first.getMonth(), d));
          const label = parse(day).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
          html += `<span class="dp-cell" data-cell="${day}"><button type="button" class="dp-day" data-day="${day}" aria-label="${label}" tabindex="-1" ${day < minDate() ? "disabled" : ""}>${d}</button></span>`;
        }
        html += `</div></div>`;
      }
      html += `</div><div class="dp-foot"><span class="dp-summary" aria-live="polite"></span><span class="dp-actions"><button type="button" class="dp-clear">Clear</button><button type="button" class="btn btn-primary btn-sm dp-done">Done</button></span></div>`;
      pop.innerHTML = html;
      paint();
    }

    function paint() {
      const f = from.value, t = to.value, today = iso(new Date());
      const end = t || (active === 1 && f && hover > f ? hover : "");
      pop.querySelectorAll("[data-cell]").forEach((c) => {
        const d = c.dataset.cell;
        c.classList.toggle("is-start", d === f);
        c.classList.toggle("is-end", !!end && d === end);
        c.classList.toggle("has-end", !!end && d === f);
        c.classList.toggle("in-range", !!f && !!end && d > f && d < end);
        c.classList.toggle("is-preview", !t && !!end);
        const b = c.firstChild;
        b.classList.toggle("is-today", d === today);
        b.setAttribute("aria-pressed", d === f || d === t ? "true" : "false");
      });
      const sum = pop.querySelector(".dp-summary");
      if (f && t) { const n = daysBetween(f, t); sum.innerHTML = `<b>${n} ${n === 1 ? "day" : "days"}</b> · ${fmt(f)} → ${fmt(t)}`; }
      else sum.textContent = active === 0 || !f ? "Pick your start date" : "Now pick your return date";
      segs.forEach((s, i) => s.classList.toggle("is-active", isOpen && i === active));
      // keep one focusable day in the grid for keyboard users
      const days = [...pop.querySelectorAll(".dp-day:not(:disabled)")];
      const focusDay = days.find((b) => b.dataset.day === (active === 1 ? t || f : f)) || days[0];
      days.forEach((b) => (b.tabIndex = b === focusDay ? 0 : -1));
    }

    function open(i) {
      active = i === 1 && !from.value ? 0 : i;
      if (!isOpen) {
        const start = parse((active === 1 ? to.value || from.value : from.value) || minDate());
        view = new Date(start.getFullYear(), start.getMonth(), 1);
        isOpen = true; pop.hidden = false; render(); place();
        const r = pop.getBoundingClientRect(), gap = r.bottom + 16 - innerHeight;
        if (gap > 0) scrollBy({ top: Math.min(gap, r.top - 80), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        btns.forEach((b) => b.setAttribute("aria-expanded", "true"));
      } else paint();
    }
    function close(focus) {
      if (!isOpen) return;
      isOpen = false; pop.hidden = true; hover = "";
      btns.forEach((b) => b.setAttribute("aria-expanded", "false"));
      segs.forEach((s) => s.classList.remove("is-active"));
      if (focus) btns[active].focus();
    }
    function place() {
      if (!twoUp.matches) { pop.style.left = ""; return; }
      const max = host.clientWidth - pop.offsetWidth;
      pop.style.left = Math.max(0, Math.min(segs[0].offsetLeft, max)) + "px";
    }
    function pick(day) {
      const f = from.value;
      if (active === 0 || !f || day <= f) {
        set(day, to.value && to.value > day && active === 0 ? to.value : "");
        active = 1; paint();
        if (to.value) close(); // start changed but return still valid
      } else {
        set(f, day); close(true);
      }
    }
    function shiftView(n) { view = new Date(view.getFullYear(), view.getMonth() + n, 1); render(); }
    function focusDay(day) {
      let b = pop.querySelector(`[data-day="${day}"]`);
      if (!b) { shiftView(day < pop.querySelector("[data-day]").dataset.day ? -1 : 1); b = pop.querySelector(`[data-day="${day}"]`); }
      if (b && !b.disabled) { pop.querySelectorAll(".dp-day").forEach((x) => (x.tabIndex = -1)); b.tabIndex = 0; b.focus(); }
    }

    pop.addEventListener("click", (e) => {
      e.stopPropagation();
      const nav = e.target.closest("[data-nav]"), day = e.target.closest("[data-day]");
      if (nav) shiftView(+nav.dataset.nav);
      else if (day && !day.disabled) pick(day.dataset.day);
      else if (e.target.closest(".dp-clear")) { set("", ""); active = 0; paint(); }
      else if (e.target.closest(".dp-done")) close(true);
    });
    pop.addEventListener("mouseover", (e) => {
      const day = e.target.closest("[data-day]");
      const h = day && !day.disabled ? day.dataset.day : "";
      if (h !== hover) { hover = h; if (active === 1 && !to.value) paint(); }
    });
    pop.addEventListener("keydown", (e) => {
      const day = e.target.closest("[data-day]");
      const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
      if (e.key === "Escape") { e.preventDefault(); close(true); }
      else if (day && step) { e.preventDefault(); const next = addDays(day.dataset.day, step); if (next >= minDate()) focusDay(next); }
    });
    btns.forEach((b, i) => b.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown" && isOpen) { e.preventDefault(); const d = pop.querySelector('.dp-day[tabindex="0"]'); if (d) d.focus(); }
    }));
    document.addEventListener("pointerdown", (e) => { if (isOpen && !pop.contains(e.target) && !segs.some((s) => s.contains(e.target))) close(); });
    document.addEventListener("focusin", (e) => { if (isOpen && !pop.contains(e.target) && !segs.some((s) => s.contains(e.target))) close(); });
    twoUp.addEventListener("change", () => { if (isOpen) { render(); place(); } });
    window.addEventListener("resize", () => { if (isOpen) place(); });

    sync();
    return { open, close, refresh: sync };
  };
})();
