/* ============================================================
   Portfolio — interactions
   Boot sequence · clock · scroll spy & progress · reveal
   window close controls · dock magnification ·
   iOS-style tap bounce on every interactive element
   ============================================================ */
(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------------- Boot screen ---------------- */

  const boot = $("#boot");
  const bootedKey = "chrisos_booted_v2";
  const finishBoot = () => {
    boot.classList.add("off");
    boot.addEventListener("transitionend", () => { boot.style.display = "none"; }, { once: true });
    setTimeout(() => { boot.style.display = "none"; }, 650);
    sessionStorage.setItem(bootedKey, "1");
  };
  if (sessionStorage.getItem(bootedKey)) {
    boot.style.display = "none";
  } else {
    boot.addEventListener("click", finishBoot, { once: true });
    setTimeout(finishBoot, 1550);
  }

  /* ---------------- Menu bar clock ---------------- */

  const clock = $("#clock");
  const tick = () => {
    const d = new Date();
    clock.textContent = d.toLocaleString("en-US", {
      weekday: "short", month: "short", day: "numeric",
      hour: "numeric", minute: "2-digit",
    });
  };
  tick();
  setInterval(tick, 1000);

  /* ---------------- Scroll: spy, progress, parallax ---------------- */

  const sections = ["home", "projects", "about", "contact"].map((id) => document.getElementById(id));
  const spyTargets = $$(".menu-link, .dock-link");
  const wallpaper = $("#wallpaper");

  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    wallpaper.style.translate = `0 ${Math.min(y * 0.06, 90)}px`;

    const probe = y + window.innerHeight * 0.3;
    let current = "home";
    sections.forEach((s) => { if (s && s.offsetTop <= probe) current = s.id; });
    spyTargets.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------------- Reveal on scroll ---------------- */

  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          revealObs.unobserve(en.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  const observeAll = (els) => els.forEach((el) => revealObs.observe(el));
  observeAll($$(".reveal"));

  /* ---------------- Render static sections ---------------- */

  $("#skillsGroups").innerHTML = SKILL_GROUPS.map(
    (g) => `
    <div class="skill-group">
      <h4>${g.name}</h4>
      <div class="skills">${g.skills.map((s) => `<span class="skill-chip">${s}</span>`).join("")}</div>
    </div>`
  ).join("");

  $("#workTimeline").innerHTML = EXPERIENCE.map(
    (j) => `
    <div class="work-entry">
      <div class="work-meta">
        <span class="work-years">${j.years}</span>
        <span class="work-tag">${j.tag.toUpperCase()}</span>
      </div>
      <div class="work-body">
        <h4>${j.title}</h4>
        <p>${j.text}</p>
      </div>
    </div>`
  ).join("");

  $("#eduGrid").innerHTML = EDUCATION.map(
    (e) => `
    <div class="edu-card">
      <span class="edu-status">${e.status.toUpperCase()}</span>
      <h4>${e.degree}</h4>
      <p class="edu-school">${e.school}</p>
      <p class="edu-years">${e.years}</p>
      <ul class="edu-honors">${e.honors.map((h) => `<li>${h}</li>`).join("")}</ul>
      ${e.extra ? `<div class="edu-extra">${e.extra.map((x) => `<span>${x}</span>`).join("")}</div>` : ""}
    </div>`
  ).join("");

  $("#certGrid").innerHTML = CERTIFICATIONS.map(
    (c) => `
    <div class="cert-card">
      <span class="cert-issuer">${c.issuer}</span>
      <h4>${c.name}</h4>
    </div>`
  ).join("");

  $("#awardsGrid").innerHTML = AWARDS.map(
    (a) => `
    <div class="award-item">
      <b>${a.title}</b>
      <span>${a.meta}</span>
    </div>`
  ).join("");

  $("#interestsGrid").innerHTML = INTERESTS.map(
    (it, i) => `
    <article class="interest-card reveal" data-idx="${String(i + 1).padStart(2, "0")}" style="--d:${(i % 3) * 0.06}s">
      <div class="interest-icon">${it.icon}</div>
      <h4>${it.title}</h4>
      <p>${it.text}</p>
    </article>`
  ).join("");
  observeAll($$("#interestsGrid .reveal"));

  /* ---------------- Projects: filters ---------------- */

  const grid = $("#projectsGrid");
  const countEl = $("#projectsCount");
  const emptyState = $("#emptyState");
  const searchInput = $("#filterSearch");
  const selCat = $("#filterCat");
  const selSort = $("#filterSort");

  const uniq = (arr) => [...new Set(arr)].sort();
  const cats = uniq(PROJECTS.map((p) => p.category));
  cats.forEach((v) => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    selCat.appendChild(opt);
  });

  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const entryHTML = (p, i) => `
    <article class="project-entry reveal" data-id="${p.id}" tabindex="0" role="button" aria-label="Open ${esc(p.title)} project">
      <div class="entry-num">${String(i + 1).padStart(2, "0")}</div>
      <div class="entry-main">
        <div class="entry-head">
          <h3>${esc(p.title)}</h3>
          <span class="project-cat">${esc(p.category.toUpperCase())}</span>
          ${p.badge ? `<span class="project-badge">${esc(p.badge)}</span>` : ""}
        </div>
        ${p.subtitle ? `<p class="project-sub">${esc(p.subtitle.toUpperCase())}</p>` : ""}
        <p class="project-desc">${esc(p.desc)}</p>
        ${p.note ? `<p class="project-note">${esc(p.note)}</p>` : ""}
        <div class="project-tags">
          ${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}
        </div>
        <div class="project-links">
          ${p.links.map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">${esc(l.label)} &nearr;</a>`).join("")}
        </div>
      </div>
      <div class="entry-meta">
        <span class="project-year">${p.year}</span>
        <span class="entry-arrow" aria-hidden="true">&rarr;</span>
      </div>
    </article>`;

  const animateIn = () => {
    requestAnimationFrame(() => {
      $$(".project-entry", grid).forEach((card, i) => {
        card.style.setProperty("--d", `${Math.min(i * 0.07, 0.45)}s`);
        card.classList.add("in");
      });
    });
  };

  const applyFilters = () => {
    const q = searchInput.value.trim().toLowerCase();
    const cat = selCat.value;
    const sort = selSort.value;

    let list = PROJECTS.filter((p) => {
      const hitQ = !q || (p.title + " " + (p.subtitle || "") + " " + p.desc + " " + p.tags.join(" ") + " " + p.language).toLowerCase().includes(q);
      const hitCat = !cat || p.category === cat;
      return hitQ && hitCat;
    });

    if (sort === "newest") list.sort((a, b) => b.year - a.year);
    else if (sort === "oldest") list.sort((a, b) => a.year - b.year);
    else list.sort((a, b) => a.title.localeCompare(b.title));

    grid.innerHTML = list.map(entryHTML).join("");
    countEl.textContent = list.length === 1 ? "1 entry found" : `${list.length} entries found`;
    emptyState.hidden = list.length > 0;

    $$(".project-entry", grid).forEach((card) => {
      const open = (e) => {
        if (e.target.closest("a")) return;
        openModal(card.dataset.id);
      };
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(card.dataset.id); }
      });
    });

    animateIn();
  };

  searchInput.addEventListener("input", applyFilters);
  selCat.addEventListener("change", applyFilters);
  selSort.addEventListener("change", applyFilters);
  $("#clearFilters").addEventListener("click", () => {
    searchInput.value = "";
    selCat.value = "";
    selSort.value = "newest";
    applyFilters();
  });

  applyFilters();

  /* ---------------- Project modal ---------------- */

  const modal = $("#projectModal");
  const modalTitle = $("#modalTitle");
  const modalSub = $("#modalSub");
  const modalDesc = $("#modalDesc");
  const modalLang = $("#modalLang");
  const modalTool = $("#modalTool");
  const modalCat = $("#modalCat");
  const modalYear = $("#modalYear");
  const modalKey = $("#modalKey");
  const modalHighlights = $("#modalHighlights");
  const modalLinks = $("#modalLinks");
  let lastFocused = null;

  const openModal = (id) => {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;
    lastFocused = document.activeElement;

    modalTitle.textContent = p.title;
    modalSub.textContent = (p.badge ? p.badge.toUpperCase() + " \u00b7 " : "") + (p.subtitle ? p.subtitle.toUpperCase() : "");
    modalDesc.textContent = p.desc;
    modalLang.textContent = p.language;
    modalTool.textContent = p.tool;
    modalCat.textContent = p.category;
    modalYear.textContent = p.year;
    modalKey.textContent = p.key;
    modalHighlights.innerHTML = p.highlights.map((h) => `<li>${esc(h)}</li>`).join("");
    modalLinks.innerHTML = p.links
      .map((l, i) => `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer" class="btn ${i === 0 ? "primary" : "outline"}">${esc(l.label)} &nearr;</a>`)
      .join("");

    modal.classList.remove("closing");
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal-close", modal).focus();
  };

  const closeModal = () => {
    if (modal.hidden) return;
    modal.classList.add("closing");
    setTimeout(() => {
      modal.hidden = true;
      modal.classList.remove("closing");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }, 200);
  };

  $$("[data-modal-close]", modal).forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  /* ---------------- Window close control ---------------- */

  const focusWin = (win) => {
    $$(".window.focused").forEach((w) => w.classList.remove("focused"));
    win.classList.add("focused");
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".win-close");
    if (!btn) return;
    const win = btn.closest(".window");
    if (!win) return;

    win.classList.toggle("min");
    btn.classList.add("bouncing");
    btn.addEventListener("animationend", () => btn.classList.remove("bouncing"), { once: true });
  });

  $$(".window .titlebar").forEach((tb) => {
    tb.addEventListener("click", (e) => {
      if (e.target.closest(".win-close")) return;
      const win = tb.closest(".window");
      if (win.classList.contains("min")) win.classList.remove("min");
      focusWin(win);
    });
  });

  /* ---------------- Dock magnification (macOS-style) ---------------- */

  const dock = $(".dock");
  if (dock && matchMedia("(pointer: fine)").matches) {
    let raf = null;
    const magnify = (e) => {
      const rect = dock.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      dock.querySelectorAll(".dock-link").forEach((link) => {
        const r = link.getBoundingClientRect();
        const dx = cx - (r.left - rect.left + r.width / 2);
        const d = Math.min(Math.abs(dx), 170);
        const s = 1 + 0.32 * (1 - d / 170);
        link.style.setProperty("--s", s.toFixed(3));
        link.classList.toggle("hot", s > 1.1);
      });
    };
    dock.addEventListener("pointermove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => { magnify(e); raf = null; });
    }, { passive: true });
    dock.addEventListener("pointerleave", () => {
      dock.querySelectorAll(".dock-link").forEach((link) => {
        link.style.setProperty("--s", "1");
        link.classList.remove("hot");
      });
    });
  }

  /* ---------------- iOS-style tap bounce (delegated) ---------------- */

  const BOUNCE_SEL = ".btn, .sc, .dock-link, .modal-close, .win-close, .interest-card, .edu-card, .award-item, .skill-chip, .menu-link, .contact-socials a";
  document.addEventListener("click", (e) => {
    const el = e.target.closest(BOUNCE_SEL);
    if (!el) return;
    el.classList.remove("bouncing");
    void el.offsetWidth;
    el.classList.add("bouncing");
    el.addEventListener("animationend", () => el.classList.remove("bouncing"), { once: true });
  });

  /* ---------------- Contact form: proper mailto ---------------- */

  const form = $("#msgForm");
  const formStatus = $("#formStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const subject = form.elements["subject"].value.trim();
    const body = form.elements["body"].value.trim();
    if (!subject || !body) {
      formStatus.textContent = "Please fill in both subject and message first.";
      formStatus.classList.add("form-error");
      return;
    }
    formStatus.classList.remove("form-error");
    formStatus.textContent = "Opening your email app\u2026";
    window.location.href =
      "mailto:" + SITE.email +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });

  /* ---------------- Footer year ---------------- */

  $("#year").textContent = new Date().getFullYear();
})();
