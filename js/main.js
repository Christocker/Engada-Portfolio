/* ============================================================
   Portfolio — interactions
   Boot sequence · clock · scroll spy & progress · reveal
   window close controls · dock magnification ·
   iOS-style tap bounce on every interactive element
   ============================================================ */
(() => {
  "use strict";

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

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

  const sections = ["home", "projects", "about", "interests", "contact"].map((id) => document.getElementById(id));
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
    <article class="interest-card reveal" data-idx="${String(i + 1).padStart(2, "0")}" style="--d:${Math.min(i * 0.07, 0.35)}s">
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

  let gridTimer = null;
  const renderGrid = (html) => {
    const cards = $$(".project-entry", grid);
    if (cards.length === 0) {
      grid.innerHTML = html;
      animateIn();
      return;
    }
    cards.forEach((c, i) => {
      c.classList.add("leaving");
      c.style.setProperty("--d", `${i * 0.03}s`);
    });
    clearTimeout(gridTimer);
    gridTimer = setTimeout(() => {
      grid.innerHTML = html;
      animateIn();
    }, 260);
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

    renderGrid(list.map(entryHTML).join(""));
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

  /* ---------------- Custom dropdowns (animated) ---------------- */

  const initDropdown = (ddEl) => {
    const select = ddEl.querySelector(".dd-native");
    const btn = ddEl.querySelector(".dd-btn");
    const val = ddEl.querySelector(".dd-val");
    const list = ddEl.querySelector(".dd-list");
    let open = false;
    let kbd = select.selectedIndex;
    let closeTimer = null;

    const paint = () => {
      val.textContent = select.options[select.selectedIndex].textContent;
      [...list.children].forEach((li, i) => {
        li.classList.toggle("sel-opt", i === select.selectedIndex);
        li.classList.toggle("kbd-hi", i === kbd);
        li.setAttribute("aria-selected", String(i === kbd));
      });
    };

    const buildList = () => {
      list.innerHTML = "";
      [...select.options].forEach((opt, i) => {
        const li = document.createElement("li");
        li.className = "dd-opt";
        li.setAttribute("role", "option");
        li.id = `${select.id}-opt-${i}`;
        li.textContent = opt.textContent;
        li.addEventListener("pointerenter", () => { kbd = i; paint(); });
        li.addEventListener("click", () => choose(i));
        list.appendChild(li);
      });
      paint();
    };

    const choose = (i) => {
      select.selectedIndex = i;
      paint();
      close();
      select.dispatchEvent(new Event("change", { bubbles: true }));
    };

    const openList = () => {
      if (open) return;
      open = true;
      clearTimeout(closeTimer);
      list.hidden = false;
      void list.offsetWidth;
      list.classList.add("open");
      ddEl.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-activedescendant", `${select.id}-opt-${kbd}`);
    };

    const close = () => {
      if (!open) return;
      open = false;
      list.classList.remove("open");
      ddEl.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.removeAttribute("aria-activedescendant");
      closeTimer = setTimeout(() => { list.hidden = true; }, 170);
    };

    btn.addEventListener("click", () => (open ? close() : openList()));
    btn.addEventListener("keydown", (e) => {
      const opts = list.children.length;
      if (!open) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          kbd = select.selectedIndex;
          openList();
        }
        return;
      }
      if (e.key === "ArrowDown") { e.preventDefault(); kbd = (kbd + 1) % opts; paint(); btn.setAttribute("aria-activedescendant", `${select.id}-opt-${kbd}`); }
      else if (e.key === "ArrowUp") { e.preventDefault(); kbd = (kbd - 1 + opts) % opts; paint(); btn.setAttribute("aria-activedescendant", `${select.id}-opt-${kbd}`); }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(kbd); }
      else if (e.key === "Escape") { e.preventDefault(); close(); btn.focus(); }
    });
    document.addEventListener("pointerdown", (e) => { if (!ddEl.contains(e.target)) close(); });
    buildList();
  };
  $$(".dd").forEach(initDropdown);

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

  let lockPad = 0;
  const lockScroll = () => {
    lockPad = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = lockPad + "px";
  };
  const unlockScroll = () => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  };

  let modalOpen = false;
  let closeTimer = null;

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

    if (modalOpen) return;

    modalOpen = true;
    clearTimeout(closeTimer);
    modal.hidden = false;
    void modal.offsetWidth;
    modal.classList.add("open");
    lockScroll();
    $(".modal-close", modal).focus();
  };

  const closeModal = () => {
    if (!modalOpen) return;
    modalOpen = false;
    modal.classList.remove("open");
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      modal.hidden = true;
      unlockScroll();
      if (lastFocused) lastFocused.focus();
    }, 300);
  };

  $$("[data-modal-close]", modal).forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOpen) closeModal();
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

    win.classList.remove("anim-open");
    win.classList.add("min", "anim-min");
    win.addEventListener("animationend", () => win.classList.remove("anim-min"), { once: true });
    btn.classList.add("bouncing");
    btn.addEventListener("animationend", () => btn.classList.remove("bouncing"), { once: true });
  });

  $$(".window .titlebar").forEach((tb) => {
    tb.addEventListener("click", (e) => {
      if (e.target.closest(".win-close")) return;
      const win = tb.closest(".window");
      if (win.classList.contains("min")) {
        win.classList.remove("min", "anim-min");
        win.classList.add("anim-open");
        win.addEventListener("animationend", () => win.classList.remove("anim-open"), { once: true });
      }
      focusWin(win);
    });
  });

  /* ---------------- Dock magnification (macOS-style) ---------------- */

  const dock = $(".dock");
  if (dock && matchMedia("(pointer: fine)").matches) {
    const links = $$(".dock-link", dock);
    const centers = new Array(links.length);
    const prevS = new Float32Array(links.length);
    const recache = () => {
      for (let i = 0; i < links.length; i++) {
        centers[i] = links[i].offsetLeft + links[i].offsetWidth / 2;
      }
    };
    recache();
    window.addEventListener("resize", recache);

    let raf = null;
    let lastEvt = null;
    const magnify = () => {
      raf = null;
      const rect = dock.getBoundingClientRect();
      const cx = lastEvt.clientX - rect.left;
      links.forEach((link, i) => {
        const dx = cx - centers[i];
        const d = Math.min(Math.abs(dx), 170);
        const s = 1 + 0.22 * (1 - d / 170);
        if (Math.abs(s - prevS[i]) < 0.001) return;
        prevS[i] = s;
        link.style.setProperty("--s", s.toFixed(3));
        const hot = Math.abs(dx) < 26;
        if (link.classList.contains("hot") !== hot) link.classList.toggle("hot", hot);
      });
    };
    dock.addEventListener("pointermove", (e) => {
      lastEvt = e;
      if (raf) return;
      raf = requestAnimationFrame(magnify);
    }, { passive: true });
    const reset = () => {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      links.forEach((link, i) => {
        if (prevS[i] !== 1) {
          prevS[i] = 1;
          link.style.setProperty("--s", "1");
          link.classList.remove("hot");
        }
      });
    };
    dock.addEventListener("pointerleave", reset);
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

  /* ---------------- Smooth scroll (in-page buttons) ---------------- */

  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const smoothScrollTo = (y, dur = 650) => {
    const start = window.scrollY;
    const diff = y - start;
    if (Math.abs(diff) < 2) return;
    scrollAnim && cancelAnimationFrame(scrollAnim);
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      window.scrollTo(0, start + diff * easeInOutCubic(p));
      if (p < 1) scrollAnim = requestAnimationFrame(step);
    };
    scrollAnim = requestAnimationFrame(step);
  };
  let scrollAnim = null;

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const target = Math.max(el.getBoundingClientRect().top + window.scrollY - 46, 0);
    smoothScrollTo(target);
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
