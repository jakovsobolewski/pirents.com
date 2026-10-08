#!/usr/bin/env node
/* Pre-renders SEO landing pages from the seed data:
   rentals/{city}/            city hub
   rentals/{city}/{category}/ city + category
   rentals/{city}/airport/    airport handover page
   gear/{category}/           category hub across cities
   sitemap.xml
   Run: node scripts/build-pages.js  (no dependencies) */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, ".."), BASE_URL = "https://pirents.com/", V = "v=20261008b";

/* --- load data.js + app.js in a tiny fake browser so we can reuse P.listingCard, P.icon, P.money --- */
const noop = () => {};
const fakeEl = { content: "../../../", innerHTML: "", setAttribute: noop, appendChild: noop, addEventListener: noop, querySelector: () => null, querySelectorAll: () => [], focus: noop, classList: { toggle: noop, add: noop, remove: noop } };
const sandbox = {
  console, encodeURIComponent, decodeURIComponent, URLSearchParams, setTimeout: noop,
  localStorage: { getItem: () => null, setItem: noop },
  location: { pathname: "/", search: "", href: "" }, history: { replaceState: noop },
  document: { documentElement: { lang: "en" }, querySelector: (s) => (s.includes("pirents-base") ? fakeEl : null), querySelectorAll: () => [], getElementById: () => null, addEventListener: noop, createElement: () => ({ ...fakeEl }), body: fakeEl, head: fakeEl }
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js/data.js"), "utf8"), sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js/app.js"), "utf8"), sandbox);
const P = sandbox.Pirents, LISTINGS = sandbox.PIRENTS_LISTINGS, CATS = sandbox.PIRENTS_CATEGORIES, CITY_META = sandbox.PIRENTS_CITY_META, CAT_SLUG = sandbox.PIRENTS_CATEGORY_SLUGS;
const esc = P.esc, money = P.money, icon = P.icon;

/* --- local copy: the part competitors get wrong --- */
const CITY = {
  Lisbon: { intro: "Lisbon is built on seven hills and paved in slippery calçada, so the right gear matters more here than almost anywhere. The riverside from Cais do Sodré to Belém is flat and smooth, the metro has lifts at most stations, and Tram 15E is low-floor while the famous Tram 28 is not.", transit: "Metro: lifts at most stations. Tram 15E to Belém is accessible; Tram 28 is not. Buses have ramps. The Santa Justa lift and the Baixa-Chiado escalators save the steepest climbs.", terrain: "Steep hills in Alfama, Bairro Alto and Graça; flat along the river and in Baixa. Calçada is slippery when wet.", landmarks: ["Belém riverside path", "Baixa and Praça do Comércio", "Parque das Nações", "Cascais beaches (adapted access at Praia de Carcavelos)"], cruise: "Lisbon Cruise Terminal (Santa Apolónia)", station: "Santa Apolónia or Oriente station" },
  Barcelona: { intro: "Barcelona is one of Europe's easiest big cities to get around on wheels: the Eixample grid is flat, almost every metro station has lifts, every bus has a ramp and Barceloneta beach has an adapted access point with amphibious chairs in summer.", transit: "Metro: lifts at more than 90% of stations. All buses have ramps. Mobility scooters are allowed on the metro and buses.", terrain: "Flat in Eixample, Barceloneta and the seafront. Steep around Park Güell, Montjuïc and Gràcia's upper streets.", landmarks: ["Sagrada Família (step-free entry)", "Barceloneta beach and the seafront promenade", "La Rambla and the Gothic Quarter", "Montjuïc by cable car or bus"], cruise: "Barcelona cruise port (Moll Adossat terminals)", station: "Sants station" },
  Amsterdam: { intro: "Amsterdam is flat, but its cobbled streets, humped canal bridges and narrow pavements can be tiring. The metro and the newer low-floor trams are accessible, the museum district is smooth, and cycle paths are open to mobility scooters.", transit: "Metro and low-floor trams (lines with the newer stock) are accessible; older trams are not. Mobility scooters and e-bikes use the cycle paths. Direct train from Schiphol to Centraal.", terrain: "Flat everywhere, but cobbles and steep little canal bridges in the centre. Smooth around Museumplein, Vondelpark and the Zuidas.", landmarks: ["Museumplein (Rijksmuseum, Van Gogh)", "Vondelpark", "Canal belt", "Amsterdam Noord via the free ferry"], cruise: "Passenger Terminal Amsterdam (PTA)", station: "Amsterdam Centraal" },
  Athens: { intro: "Athens, Greece has changed a lot for visitors with reduced mobility: the Acropolis has a lift for wheelchair users, the metro has lifts at every station, and the coastal tram runs down to the beaches at Glyfada. Plaka's marble lanes are still uneven, and summer heat makes a scooter with a good battery worth having.", transit: "Metro: lifts at all stations. Trams and newer buses are accessible. The metro runs directly to Athens International Airport and to Piraeus port.", terrain: "Uneven, polished marble in Plaka and around the Acropolis; smoother in Syntagma, Kolonaki and along the coast.", landmarks: ["Acropolis (lift for wheelchair users, book ahead)", "Acropolis Museum", "Plaka and Monastiraki", "Athenian Riviera and Glyfada beaches"], cruise: "Piraeus cruise port", station: "Syntagma or Larissa station" },
  Split: { intro: "Split's Riva promenade is flat and smooth, Diocletian's Palace is narrow polished stone, and Bačvice beach has matting and shallow water. Ferries to Hvar and Brač leave from the port next to the old town, and a beach wheelchair turns a Dalmatian beach day from impossible into easy.", transit: "The centre is walkable and flat along the Riva. Local buses are partly accessible. Ferries take mobility gear on the vehicle deck; ask the owner about the ferry ramp.", terrain: "Flat along the Riva and the port; steps and polished stone inside the palace; Marjan hill is steep.", landmarks: ["Riva promenade", "Diocletian's Palace", "Bačvice and Žnjan beaches", "Ferries to Hvar and Brač"], cruise: "Split ferry and cruise port (Gat sv. Petra)", station: "Split bus and train station by the port" },
  Rome: { intro: "Rome is cobblestones: the sampietrini of the centro storico shake strollers and manual chairs alike, so a chair with larger wheels or a scooter with suspension makes a real difference. The Vatican Museums are fully accessible with lifts, the main buses have ramps, and the Leonardo Express runs from Fiumicino to Termini.", transit: "Metro A and B are partly accessible (check the station). Buses have ramps. The Leonardo Express train connects Fiumicino Airport and Termini in 32 minutes.", terrain: "Cobbles across the historic centre; smooth in the Vatican Museums, Villa Borghese paths and EUR.", landmarks: ["Vatican Museums (step-free, free entry for wheelchair users)", "Colosseum (lift to the first tier)", "Villa Borghese", "Trastevere (cobbled)"], cruise: "Civitavecchia cruise port (80 km, train to Rome)", station: "Termini station" },
  Vienna: { intro: "Vienna is probably the most accessible capital in Europe: every U-Bahn station has lifts, the ULF trams are low-floor, and the Ringstrasse, Schönbrunn and the museum quarter are all smooth. Renting from a local here is about convenience: delivered to your hotel, no shop opening hours.", transit: "U-Bahn: lifts at every station. Low-floor ULF trams and all buses are accessible. CAT and S7 trains run from the airport to the centre.", terrain: "Flat and smooth almost everywhere; cobbles only in a few old-town lanes and courtyards.", landmarks: ["Schönbrunn Palace and gardens", "Ringstrasse and the Museumsquartier", "Prater", "Naschmarkt"], cruise: "Danube river-cruise piers at Reichsbrücke", station: "Wien Hauptbahnhof" }
};
const CAT = {
  wheelchair: { s: "wheelchair", p: "wheelchairs", intro: "Manual, lightweight folding and power wheelchairs from local owners. Every listing shows weight, seat width and max user weight so you can pick a chair that fits you and fits in a taxi.", tip: "A lightweight folding chair (under 12 kg) is easiest for taxis and cobbles when someone is pushing; a power chair is better for long museum days.", transitQ: "Can I take a wheelchair on public transport in {city}?" },
  scooter: { s: "mobility scooter", p: "mobility scooters", intro: "Foldable and full-size mobility scooters, delivered charged with the charger included. Listings show range, max speed and whether the scooter dismantles to fit in a car boot.", tip: "Check the range against your plans: a full day of sightseeing in summer can use 15 to 20 km. Four wheels are more stable on cobbles; three wheels turn tighter in shops and lifts.", transitQ: "Are mobility scooters allowed on public transport in {city}?" },
  bike: { s: "e-bike", p: "e-bikes and city bikes", intro: "City bikes, e-bikes, cargo bikes and trikes from locals who ride them every day, with locks, lights and helmets included.", tip: "In hilly cities choose an e-bike with a mid-drive motor and at least 400 Wh. Cargo bikes are the easiest way to move two children and a beach bag.", transitQ: "Can I take a bike on public transport in {city}?" },
  car: { s: "wheelchair-accessible car", p: "accessible cars and vans", intro: "Wheelchair-accessible vans with ramps and cars with hand controls, insured for you as the driver, handed over at the airport or in town.", tip: "Ramp vans need a driver over 25 in most listings; hand-control cars can usually be handed over at the airport so you never need a taxi.", transitQ: "Do I need my own insurance to drive an accessible car in {city}?" },
  stroller: { s: "stroller", p: "strollers", intro: "Travel strollers, twins and all-terrain pushchairs that fold to cabin size, delivered to your hotel or handed over at the airport.", tip: "For cobbled old towns choose larger wheels or an all-terrain model; for planes and buses a cabin-size fold.", transitQ: "Can I take a stroller on public transport in {city}?" },
  walker: { s: "rollator", p: "rollators and walkers", intro: "Lightweight rollators with seats, walkers, crutches and canes, so you can sit down whenever you like between sights.", tip: "A carbon rollator under 7 kg lifts easily into a taxi; a seat and a bag make queues and cafés far more comfortable.", transitQ: "Can I take a rollator on public transport in {city}?" },
  beach: { s: "beach wheelchair", p: "beach and all-terrain wheelchairs", intro: "Balloon-wheel beach chairs that float, and all-terrain chairs for trails and parks, delivered to the beach or your accommodation.", tip: "Beach chairs need a companion to push in soft sand; many owners deliver straight to the beach and collect afterwards.", transitQ: "Which beaches in {city} are accessible?" },
  other: { s: "mobility aid", p: "ramps, shower chairs and other aids", intro: "Portable ramps, shower chairs, hoists and other aids that make a rental apartment usable for a week.", tip: "A folding suitcase ramp solves the two steps into most old-town apartments; check the length against the step height.", transitQ: "What other mobility aids can I rent in {city}?" }
};

const depthPrefix = (n) => "../".repeat(n);
const head = ({ title, desc, canonical, prefix, noindex, jsonld, ogimg }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${BASE_URL}${canonical}">
<meta name="robots" content="${noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}">
<meta name="pirents-base" content="${prefix}">
<meta name="theme-color" content="#F7F3EC">
<meta property="og:site_name" content="Pirents"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${BASE_URL}${canonical}"><meta property="og:image" content="${BASE_URL}${ogimg || "assets/img/hero/mobility-scooter@2x.webp"}"><meta property="og:locale" content="en_GB">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${BASE_URL}${ogimg || "assets/img/hero/mobility-scooter@2x.webp"}">
<link rel="icon" href="${prefix}assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet">
${[].concat(jsonld).map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n")}
<link rel="stylesheet" href="${prefix}assets/css/tokens.css?${V}"><link rel="stylesheet" href="${prefix}assets/css/base.css?${V}"><link rel="stylesheet" href="${prefix}assets/css/components.css?${V}">
<style>
  .lp { padding-block: var(--space-8) var(--space-16); display: grid; gap: var(--space-12); }
  .lp-intro { max-width: 70ch; }
  .lp-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-5); }
  @media (max-width: 1099px) { .lp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 639px) { .lp-grid { grid-template-columns: 1fr; } }
  .crumbs { display: flex; gap: 8px; align-items: center; font-size: var(--text-sm); color: var(--color-muted); padding-top: var(--space-5); flex-wrap: wrap; }
  .crumbs a { color: var(--color-ink-2); }
  .faq details { border-bottom: 1px solid var(--color-border); }
  .faq details:last-child { border-bottom: 0; }
  .faq summary { list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: var(--space-4); padding: var(--space-4) 0; font-weight: 800; font-size: var(--text-lg); }
  .faq summary::-webkit-details-marker { display: none; }
  .faq details[open] summary .icon { transform: rotate(180deg); }
  .faq details p { padding-bottom: var(--space-4); color: var(--color-ink-2); max-width: 65ch; }
  .link-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--space-3); }
  @media (max-width: 899px) { .link-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .link-card { display: grid; gap: 4px; padding: var(--space-4); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); color: var(--color-ink); }
  .link-card:hover { text-decoration: none; box-shadow: var(--shadow-md); color: var(--color-ink); }
  .link-card b { font-weight: 800; }
  .link-card span { font-size: var(--text-sm); color: var(--color-muted); }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6); }
  @media (max-width: 899px) { .two-col { grid-template-columns: 1fr; } }
  .owner-cta { background: var(--color-cocoa); color: #fff; border-radius: var(--radius-xl); padding: var(--space-8); display: flex; justify-content: space-between; align-items: center; gap: var(--space-6); flex-wrap: wrap; }
  .owner-cta h2 { color: #fff; font-size: var(--text-h3); }
  .owner-cta p { color: #CFC7BE; }
</style>
</head>
<body>
<header id="site-header" class="site-header"></header>
<main id="main"><div class="container lp">`;
const foot = (prefix) => `</div></main>
<footer id="site-footer" class="site-footer"></footer>
<script src="${prefix}assets/js/data.js?${V}"></script>
<script src="${prefix}assets/js/app.js?${V}"></script>
</body>
</html>
`;
const crumbs = (items) => `<nav class="crumbs" aria-label="Breadcrumb">${items.map((it, i) => (it.href ? `<a href="${it.href}">${esc(it.name)}</a>` : `<span aria-current="page" style="color:var(--color-ink)">${esc(it.name)}</span>`) + (i < items.length - 1 ? icon("arrowRight", "icon-sm") : "")).join("")}</nav>`;
const breadcrumbLd = (items) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": items.map((it, i) => Object.assign({ "@type": "ListItem", "position": i + 1, "name": it.name }, it.url ? { item: BASE_URL + it.url } : {})) });
const faqBlock = (faqs) => `<section class="stack" id="faq"><h2>Questions about renting here</h2><div class="faq card" style="padding:0 var(--space-6)">${faqs.map(([q, a]) => `<details><summary>${esc(q)}<span>${icon("chevronDown")}</span></summary><p>${a}</p></details>`).join("")}</div></section>`;
const faqLd = (faqs) => ({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a.replace(/<[^>]+>/g, "") } })) });
const productLd = (l) => ({ "@type": "Product", "name": l.title, "description": l.description, "category": P.category(l.category).name, "url": BASE_URL + "listing.html?id=" + l.id, "offers": { "@type": "Offer", "priceCurrency": "EUR", "price": l.price, "unitText": "per day", "availability": "https://schema.org/InStock", "areaServed": l.city, "seller": { "@type": "Person", "name": l.owner.name } }, ...(l.reviews ? { "aggregateRating": { "@type": "AggregateRating", "ratingValue": l.rating, "reviewCount": l.reviews } } : {}) });
const itemListLd = (name, list) => ({ "@context": "https://schema.org", "@type": "ItemList", "name": name, "numberOfItems": list.length, "itemListElement": list.map((l, i) => ({ "@type": "ListItem", "position": i + 1, "item": productLd(l) })) });
const serviceLd = (name, city) => ({ "@context": "https://schema.org", "@type": "Service", "serviceType": name, "provider": { "@type": "Organization", "name": "Pirents", "url": BASE_URL }, "areaServed": { "@type": "City", "name": city.display || city.name, "containedInPlace": { "@type": "Country", "name": city.country } }, "offers": { "@type": "Offer", "priceCurrency": "EUR", "businessFunction": "http://purl.org/goodrelations/v1#LeaseOut" } });
const ownerCta = (prefix, city, cat) => `<section class="owner-cta"><div><h2>Own a ${cat ? esc(cat.s) : "wheelchair, scooter or bike"} in ${esc(city)}?</h2><p>List it in ten minutes. Verified renters, deposit and €3,000 damage cover, paid 48 hours after handover.</p></div><a class="btn btn-primary btn-lg" href="${prefix}list-item.html">Rent it out</a></section>`;
const grid = (list, emptyHtml) => list.length ? `<div class="lp-grid">${list.map(P.listingCard).join("")}</div>` : emptyHtml;
const write = (rel, html) => { const f = path.join(ROOT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
const cityName = (c) => CITY_META[c].display || c;
const minPrice = (list) => list.length ? Math.min(...list.map(l => l.price)) : null;
const sitemap = [{ loc: "", p: "1.0", f: "weekly" }, { loc: "browse.html", p: "0.6", f: "daily" }, { loc: "how-it-works.html", p: "0.7", f: "monthly" }, { loc: "list-item.html", p: "0.8", f: "monthly" }];
let built = 0;

/* ---------- city + category pages ---------- */
for (const c of Object.keys(CITY_META)) {
  const m = CITY_META[c], cn = cityName(c), copy = CITY[c], prefix = depthPrefix(3), cityList = LISTINGS.filter(l => l.city === c);
  for (const cat of CATS) {
    const list = cityList.filter(l => l.category === cat.id), cc = CAT[cat.id], slug = CAT_SLUG[cat.id];
    const url = `rentals/${m.slug}/${slug}/`, min = minPrice(list), n = list.length;
    const title = `${tc(cc.s)} Rental in ${cn}${min ? ` from ${money(min)}/day` : ""} | Pirents`;
    const desc = n ? `Rent a ${cc.s} in ${cn} from a local owner. ${n} listing${n > 1 ? "s" : ""} from ${money(min)}/day, delivery to your hotel or ${m.airport.iata} airport handover, 1-day minimum, damage cover included.` : `No ${cc.p} listed in ${cn} yet. Tell us what you need and when, and Pirents will find a local owner before you arrive. Nearby cities and other gear in ${cn} are available now.`;
    const faqs = [
      [`Can I rent a ${cc.s} in ${cn} for one day?`, `Yes. Most Pirents owners in ${cn} rent by the day with a one-day minimum; the minimum is shown on each listing. Competing hire companies usually require three days.`],
      [`Do owners deliver to hotels in ${cn}?`, `Many do. Listings marked "Delivery available" bring the ${cc.s} to your hotel or apartment. Others hand over at ${esc(m.airport.name)} (${m.airport.iata}), at ${esc(copy.station)} or at the owner's address.`],
      [`Can I get a ${cc.s} handed over at ${esc(m.airport.name)}?`, `Owners marked "Airport handover" meet you at ${m.airport.iata} arrivals. <a href="${prefix}rentals/${m.slug}/airport/">See ${cn} listings with airport handover</a>.`],
      [cc.transitQ.replace("{city}", cn), esc(copy.transit) + " " + esc(cc.tip)],
      [`How much does it cost to rent a ${cc.s} in ${cn}?`, n ? `From ${money(min)} per day plus a 10% service fee, with a refundable deposit held from pick-up to return. The full total is shown before you book.` : `Prices are set by owners and shown per day with the fee and deposit before you book. There are no ${cc.p} in ${cn} yet; request one and we will find an owner.`]
    ];
    const body = `${crumbs([{ name: "Home", href: prefix + "index.html" }, { name: cn, href: `${prefix}rentals/${m.slug}/` }, { name: cat.name }])}
<section class="stack"><span class="eyebrow">${esc(cn)} · ${esc(cat.name)}</span><h1>${esc(cap(cc.s))} rental in ${esc(cn)}</h1><h2 style="font-size:var(--text-h4);font-family:var(--font-sans)">${n ? `${n} ${n === 1 ? cc.s : cc.p} from local owners in ${esc(cn)}${min ? `, from ${money(min)} a day` : ""}` : `No ${esc(cc.p)} in ${esc(cn)} yet`}</h2><p class="lead lp-intro">${esc(copy.intro)}</p><p class="lp-intro ink-2">${esc(cc.intro)}</p></section>
<section class="stack"><h2>${n ? `Available ${esc(cc.p)}` : "Tell us what you need"}</h2>${grid(list, `<div class="card card-pad stack"><p class="ink-2">Nothing listed here yet. Tell us where, what and when, and we will find a local owner before you arrive. Most requests get an answer within 48 hours.</p><div class="row wrap"><a class="btn btn-primary" href="${prefix}browse.html?where=${encodeURIComponent(c)}&category=${cat.id}">Request a ${esc(cc.s)} in ${esc(cn)}</a><a class="btn btn-outline" href="${prefix}rentals/${m.slug}/">All gear in ${esc(cn)}</a></div></div>`)}</section>
<section class="two-col"><div class="card card-pad stack-sm"><h2 style="font-size:var(--text-h3)">Handover in ${esc(cn)}</h2><ul class="plain stack-sm"><li class="row" style="gap:10px">${icon("truck")}<span>Delivery to hotels and apartments across ${esc(cn)}</span></li><li class="row" style="gap:10px">${icon("plane")}<span>Airport handover at ${esc(m.airport.name)} (${m.airport.iata})</span></li><li class="row" style="gap:10px">${icon("pin")}<span>Meet at ${esc(copy.station)}</span></li>${copy.cruise ? `<li class="row" style="gap:10px">${icon("pin")}<span>Cruise passengers: ${esc(copy.cruise)}</span></li>` : ""}</ul></div><div class="card card-pad stack-sm"><h2 style="font-size:var(--text-h3)">Getting around ${esc(cn)}</h2><p class="ink-2 text-sm">${esc(copy.terrain)}</p><p class="ink-2 text-sm">${esc(cc.tip)}</p><ul class="plain text-sm ink-2" style="display:grid;gap:4px">${copy.landmarks.map(x => `<li class="row" style="gap:8px">${icon("check", "icon-sm")}<span>${esc(x)}</span></li>`).join("")}</ul></div></section>
${faqBlock(faqs)}
<section class="stack"><h2>Other gear in ${esc(cn)}</h2><div class="link-grid">${CATS.filter(x => x.id !== cat.id).map(x => { const k = cityList.filter(l => l.category === x.id).length; return `<a class="link-card" href="${prefix}rentals/${m.slug}/${CAT_SLUG[x.id]}/"><b>${esc(x.name)}</b><span>${k ? `${k} listing${k > 1 ? "s" : ""}` : "Request one"}</span></a>`; }).join("")}</div></section>
<section class="stack"><h2>${esc(cap(cc.p))} in other cities</h2><div class="link-grid">${Object.keys(CITY_META).filter(x => x !== c).map(x => { const k = LISTINGS.filter(l => l.city === x && l.category === cat.id).length; return `<a class="link-card" href="${prefix}rentals/${CITY_META[x].slug}/${slug}/"><b>${esc(cityName(x))}</b><span>${k ? `${k} listing${k > 1 ? "s" : ""}` : "Request one"}</span></a>`; }).join("")}</div></section>
${ownerCta(prefix, cn, cc)}`;
    const ld = [breadcrumbLd([{ name: "Home", url: "" }, { name: cn, url: `rentals/${m.slug}/` }, { name: cat.name, url }]), serviceLd(`${cap(cc.s)} rental`, Object.assign({ name: c }, m)), faqLd(faqs)];
    if (n) ld.push(itemListLd(`${cap(cc.s)} rental in ${cn}`, list));
    write(url + "index.html", head({ title, desc, canonical: url, prefix, noindex: !n, jsonld: ld }) + body + foot(prefix)); built++;
    if (n) sitemap.push({ loc: url, p: "0.8", f: "daily" });
  }

  /* ---------- city hub ---------- */
  {
    const prefix = depthPrefix(2), url = `rentals/${m.slug}/`, n = cityList.length, min = minPrice(cityList);
    const title = `Wheelchair, Mobility Scooter & Stroller Rental in ${cn} | Pirents`;
    const desc = `Rent wheelchairs, mobility scooters, e-bikes, strollers and accessible cars from verified locals in ${cn}. Hotel delivery or ${m.airport.iata} airport handover${min ? `, prices from ${money(min)}/day` : ""}, no minimum stay.`;
    const faqs = [
      [`What mobility gear can I rent in ${cn}?`, `Wheelchairs, mobility scooters, e-bikes, wheelchair-accessible cars, strollers, rollators, beach wheelchairs and aids like ramps, all from local owners. ${n} item${n === 1 ? " is" : "s are"} listed in ${cn} right now.`],
      [`Is ${cn} wheelchair accessible?`, esc(copy.terrain) + " " + esc(copy.transit)],
      [`How do I get my rental at ${esc(m.airport.name)}?`, `Choose a listing with "Airport handover" and the owner meets you at ${m.airport.iata} arrivals with the gear. <a href="${prefix}rentals/${m.slug}/airport/">See airport handover in ${cn}</a>.`],
      [`How much does it cost?`, `Owners set a daily price; Pirents adds a 10% service fee and holds a refundable deposit from pick-up to return. Everything is shown before you book.${min ? ` Prices in ${cn} start at ${money(min)} a day.` : ""}`],
      [`Who are the owners?`, `Locals in ${cn} who own the gear and rent it out when they are not using it. Each has a verified identity, reviews and a typical response time, and you message them directly.`]
    ];
    const body = `${crumbs([{ name: "Home", href: prefix + "index.html" }, { name: cn }])}
<section class="stack"><span class="eyebrow">${esc(c)}, ${esc(m.country)}</span><h1>Mobility and travel gear rental in ${esc(cn)}</h1><h2 style="font-size:var(--text-h4);font-family:var(--font-sans)">${n} item${n === 1 ? "" : "s"} from local owners${min ? `, from ${money(min)} a day` : ""}. Delivered to your hotel or handed over at ${m.airport.iata}.</h2><p class="lead lp-intro">${esc(copy.intro)}</p></section>
<section class="stack"><h2>What do you need in ${esc(cn)}?</h2><div class="cat-grid">${CATS.map(x => { const sub = cityList.filter(l => l.category === x.id), k = sub.length, mn = minPrice(sub); return `<a class="cat-tile" href="${prefix}rentals/${m.slug}/${CAT_SLUG[x.id]}/"><span class="ico" style="background:${x.tile}">${icon(x.icon)}</span><span><strong>${esc(x.name)}</strong><br><small>${k ? `${k} · from ${money(mn)}/day` : "Request one"}</small></span></a>`; }).join("")}</div></section>
<section class="stack"><div class="section-head" style="margin-bottom:0"><h2>Popular in ${esc(cn)}</h2><a class="btn btn-outline" href="${prefix}browse.html?where=${encodeURIComponent(c)}">Search with dates ${icon("arrowRight")}</a></div>${grid(cityList.slice().sort((a, b) => b.rating * Math.log(b.reviews + 2) - a.rating * Math.log(a.reviews + 2)).slice(0, 6), `<div class="card card-pad"><p class="ink-2">No gear listed in ${esc(cn)} yet. <a href="${prefix}browse.html?where=${encodeURIComponent(c)}">Tell us what you need</a> and we will find a local owner.</p></div>`)}</section>
<section class="two-col"><div class="card card-pad stack-sm"><h2 style="font-size:var(--text-h3)">Handover options</h2><ul class="plain stack-sm"><li class="row" style="gap:10px">${icon("truck")}<span>Delivery to hotels and apartments</span></li><li class="row" style="gap:10px">${icon("plane")}<span><a href="${prefix}rentals/${m.slug}/airport/">${esc(m.airport.name)} (${m.airport.iata}) arrivals</a></span></li><li class="row" style="gap:10px">${icon("pin")}<span>${esc(copy.station)}</span></li>${copy.cruise ? `<li class="row" style="gap:10px">${icon("pin")}<span>${esc(copy.cruise)}</span></li>` : ""}</ul></div><div class="card card-pad stack-sm"><h2 style="font-size:var(--text-h3)">Getting around</h2><p class="ink-2 text-sm">${esc(copy.transit)}</p><ul class="plain text-sm ink-2" style="display:grid;gap:4px">${copy.landmarks.map(x => `<li class="row" style="gap:8px">${icon("check", "icon-sm")}<span>${esc(x)}</span></li>`).join("")}</ul></div></section>
${faqBlock(faqs)}
<section class="stack"><h2>Other cities</h2><div class="link-grid">${Object.keys(CITY_META).filter(x => x !== c).map(x => `<a class="link-card" href="${prefix}rentals/${CITY_META[x].slug}/"><b>${esc(cityName(x))}</b><span>${LISTINGS.filter(l => l.city === x).length} listings</span></a>`).join("")}</div></section>
${ownerCta(prefix, cn, null)}`;
    const ld = [breadcrumbLd([{ name: "Home", url: "" }, { name: cn, url }]), serviceLd("Mobility equipment rental", Object.assign({ name: c }, m)), faqLd(faqs), { "@context": "https://schema.org", "@type": "ItemList", "name": `Gear categories in ${cn}`, "itemListElement": CATS.map((x, i) => ({ "@type": "ListItem", "position": i + 1, "name": x.name, "url": BASE_URL + `rentals/${m.slug}/${CAT_SLUG[x.id]}/` })) }];
    if (n) ld.push(itemListLd(`Popular rentals in ${cn}`, cityList.slice(0, 12)));
    write(url + "index.html", head({ title, desc, canonical: url, prefix, noindex: false, jsonld: ld }) + body + foot(prefix)); built++;
    sitemap.push({ loc: url, p: "0.9", f: "daily" });
  }

  /* ---------- airport page ---------- */
  {
    const prefix = depthPrefix(3), url = `rentals/${m.slug}/airport/`, list = cityList.filter(l => (l.features || []).includes("airport")), n = list.length;
    const title = `${m.airport.name} (${m.airport.iata}) Wheelchair & Scooter Rental Handover | Pirents`;
    const desc = `Meet a local owner at ${m.airport.name} arrivals with your rented wheelchair, mobility scooter, stroller or accessible car. Book by the day, pay only when confirmed.`;
    const faqs = [
      [`How does airport handover work at ${m.airport.iata}?`, `After booking you agree a time with the owner. They wait in the arrivals hall with the gear, do a two-minute handover and you leave with it. Return handover at departures works the same way.`],
      [`Which gear can I collect at ${esc(m.airport.name)}?`, n ? `Right now: ${list.map(l => l.title.toLowerCase()).slice(0, 4).join(", ")}${n > 4 ? " and more" : ""}. Owners in ${cn} who offer airport handover are listed on this page.` : `No owner in ${cn} offers airport handover yet. Request it and we will ask local owners; delivery to your hotel is available meanwhile.`],
      [`Can I also get it delivered to my hotel instead?`, `Yes. Most owners who do airport handover also deliver in ${cn}. Pick whichever suits your arrival time.`],
      [`How do I get from ${m.airport.iata} to the centre with a scooter or wheelchair?`, esc(copy.transit)]
    ];
    const body = `${crumbs([{ name: "Home", href: prefix + "index.html" }, { name: cn, href: `${prefix}rentals/${m.slug}/` }, { name: "Airport handover" }])}
<section class="stack"><span class="eyebrow">${esc(cn)} · Airport</span><h1>Rent mobility gear at ${esc(m.airport.name)} (${m.airport.iata})</h1><h2 style="font-size:var(--text-h4);font-family:var(--font-sans)">${n ? `${n} owner${n === 1 ? "" : "s"} in ${esc(cn)} meet you at arrivals.` : `No airport handover in ${esc(cn)} yet. Delivery to your accommodation is available.`}</h2><p class="lead lp-intro">Land, walk out of arrivals and leave with the ${n ? "gear" : "wheelchair, scooter or stroller"} you need. No taxi to a shop, no opening hours, no three-day minimum.</p></section>
<section class="stack"><h2>Listings with airport handover</h2>${grid(list, `<div class="card card-pad stack"><p class="ink-2">Nobody in ${esc(cn)} offers airport handover yet. Tell us what you need and when and we will ask local owners.</p><div class="row wrap"><a class="btn btn-primary" href="${prefix}browse.html?where=${encodeURIComponent(c)}&features=airport">Request airport handover</a><a class="btn btn-outline" href="${prefix}rentals/${m.slug}/">All gear in ${esc(cn)}</a></div></div>`)}</section>
<section class="grid grid-3"><article class="card step-card"><div class="step-num">1</div><h3>Book and agree a time</h3><p class="muted" style="margin-top:8px">Pick a listing marked "Airport handover", enter your flight time in the message to the owner.</p></article><article class="card step-card"><div class="step-num">2</div><h3>Meet at arrivals</h3><p class="muted" style="margin-top:8px">The owner waits in the ${m.airport.iata} arrivals hall with the gear and does a two-minute handover.</p></article><article class="card step-card"><div class="step-num">3</div><h3>Return at departures</h3><p class="muted" style="margin-top:8px">Hand it back before your flight, or arrange a hotel pick-up the evening before.</p></article></section>
${faqBlock(faqs)}
${ownerCta(prefix, cn, null)}`;
    const ld = [breadcrumbLd([{ name: "Home", url: "" }, { name: cn, url: `rentals/${m.slug}/` }, { name: "Airport handover", url }]), { "@context": "https://schema.org", "@type": "Airport", "name": m.airport.name, "iataCode": m.airport.iata, "address": { "@type": "PostalAddress", "addressLocality": c, "addressCountry": m.country } }, serviceLd("Airport handover of rented mobility equipment", Object.assign({ name: c }, m)), faqLd(faqs)];
    if (n) ld.push(itemListLd(`Airport handover at ${m.airport.iata}`, list));
    write(url + "index.html", head({ title, desc, canonical: url, prefix, noindex: !n, jsonld: ld }) + body + foot(prefix)); built++;
    if (n) sitemap.push({ loc: url, p: "0.7", f: "weekly" });
  }
}

/* ---------- category hubs across cities ---------- */
for (const cat of CATS) {
  const cc = CAT[cat.id], slug = CAT_SLUG[cat.id], prefix = depthPrefix(2), url = `gear/${slug}/`, list = LISTINGS.filter(l => l.category === cat.id), n = list.length, min = minPrice(list);
  const title = `${tc(cc.s)} Rental in Europe's Tourist Cities | Pirents`;
  const desc = `Rent ${cc.p} from locals in Lisbon, Barcelona, Amsterdam, Athens (Greece), Split, Rome and Vienna. ${n} listing${n === 1 ? "" : "s"}${min ? ` from ${money(min)}/day` : ""}, hotel delivery or airport handover, 1-day minimum.`;
  const faqs = [[`Where can I rent a ${cc.s} with Pirents?`, `In ${Object.keys(CITY_META).map(cityName).join(", ")}, with owners joining in more cities each month.`], [`What should I look for in a rented ${cc.s}?`, esc(cc.tip)], [`Is delivery or airport handover available?`, `Both, depending on the owner. Every listing shows its handover options, and each city has an airport handover page.`]];
  const body = `${crumbs([{ name: "Home", href: prefix + "index.html" }, { name: cat.name }])}
<section class="stack"><span class="eyebrow">${esc(cat.name)}</span><h1>${esc(cap(cc.s))} rental from locals</h1><h2 style="font-size:var(--text-h4);font-family:var(--font-sans)">${n} ${n === 1 ? cc.s : cc.p} across seven cities${min ? `, from ${money(min)} a day` : ""}</h2><p class="lead lp-intro">${esc(cc.intro)}</p></section>
<section class="stack"><h2>Choose a city</h2><div class="link-grid">${Object.keys(CITY_META).map(x => { const k = list.filter(l => l.city === x).length, mn = minPrice(list.filter(l => l.city === x)); return `<a class="link-card" href="${prefix}rentals/${CITY_META[x].slug}/${slug}/"><b>${esc(cityName(x))}</b><span>${k ? `${k} listing${k > 1 ? "s" : ""} · from ${money(mn)}/day` : "Request one"}</span></a>`; }).join("")}</div></section>
<section class="stack"><h2>Popular ${esc(cc.p)}</h2>${grid(list.slice().sort((a, b) => b.rating - a.rating).slice(0, 6), `<div class="card card-pad"><p class="ink-2">Nothing listed yet. <a href="${prefix}browse.html?category=${cat.id}">Tell us what you need</a>.</p></div>`)}</section>
${faqBlock(faqs)}
${ownerCta(prefix, "your city", cc)}`;
  const ld = [breadcrumbLd([{ name: "Home", url: "" }, { name: cat.name, url }]), faqLd(faqs)];
  if (n) ld.push(itemListLd(`${cap(cc.s)} rental`, list.slice(0, 12)));
  write(url + "index.html", head({ title, desc, canonical: url, prefix, noindex: !n, jsonld: ld }) + body + foot(prefix)); built++;
  if (n) sitemap.push({ loc: url, p: "0.8", f: "weekly" });
}

/* ---------- listings in sitemap ---------- */
LISTINGS.forEach(l => sitemap.push({ loc: "listing.html?id=" + l.id, p: "0.6", f: "weekly" }));
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap.map(u => `  <url><loc>${BASE_URL}${u.loc.replace(/&/g, "&amp;")}</loc><changefreq>${u.f}</changefreq><priority>${u.p}</priority></url>`).join("\n")}\n</urlset>\n`);
console.log(`Built ${built} pages, sitemap with ${sitemap.length} URLs`);
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function tc(s) { return s.replace(/(^|[\s-])([a-z])/g, (m, p, ch) => p + ch.toUpperCase()); }
