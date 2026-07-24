/* ============================================================
   DaZoX Studio — app.js (merged & production-ready)
   Vanilla JS. No dependencies. IIFE-scoped per module.
   ============================================================ */

/* ---------- core (nav, loader, form, back-to-top) ---------- */
/* DaZoX Studio — app boot, nav, loader, FAQ, form, back-to-top */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // --- Loader ------------------------------------------------------------
  window.addEventListener("load", () => {
    const loader = $("#loader");
    if (!loader) return;
    setTimeout(() => loader.classList.add("is-hidden"), 450);
  });

  // --- Year --------------------------------------------------------------
  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();

  // --- Nav scroll state --------------------------------------------------
  const nav = $("#nav");
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // --- Mobile menu -------------------------------------------------------
  const toggle = $("#navToggle");
  const mobile = $("#mobileMenu");
  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      const next = !open;
      toggle.setAttribute("aria-expanded", String(next));
      if (next) {
        mobile.hidden = false;
        requestAnimationFrame(() => mobile.classList.add("is-open"));
      } else {
        mobile.classList.remove("is-open");
        setTimeout(() => (mobile.hidden = true), 200);
      }
    });
    $$("a", mobile).forEach((a) =>
      a.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        mobile.classList.remove("is-open");
        setTimeout(() => (mobile.hidden = true), 200);
      })
    );
  }

  // --- Ripple effect -----------------------------------------------------
  $$(".ripple").forEach((el) => {
    el.addEventListener("click", (e) => {
      const rect = el.getBoundingClientRect();
      const rip = document.createElement("span");
      rip.className = "rip";
      const size = Math.max(rect.width, rect.height);
      rip.style.width = rip.style.height = size + "px";
      rip.style.left = e.clientX - rect.left - size / 2 + "px";
      rip.style.top = e.clientY - rect.top - size / 2 + "px";
      el.appendChild(rip);
      setTimeout(() => rip.remove(), 700);
    });
  });

  // --- Card mouse glow tracking -----------------------------------------
  $$(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  // --- Back to top -------------------------------------------------------
  const back = $("#backToTop");
  if (back) {
    const toggleBack = () => {
      if (window.scrollY > 600) back.classList.add("is-visible");
      else back.classList.remove("is-visible");
    };
    toggleBack();
    window.addEventListener("scroll", toggleBack, { passive: true });
    back.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  // --- Contact form ------------------------------------------------------
  const form = $("#contactForm");
  const note = $("#formNote");
  if (form && note) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      note.classList.remove("is-ok", "is-err");
      if (!data.name || !data.email || !data.message) {
        note.textContent = "Please fill in your name, email, and message.";
        note.classList.add("is-err");
        return;
      }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email));
      if (!emailOk) {
        note.textContent = "Please enter a valid email address.";
        note.classList.add("is-err");
        return;
      }
      // Compose a mailto handoff — no backend, honest delivery path.
      const subject = encodeURIComponent(
        `New project inquiry — ${data.topic || "General"}`
      );
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nTopic: ${data.topic || "-"}\n\n${data.message}`
      );
      window.location.href = `mailto:zakariaviknik@gmail.com?subject=${subject}&body=${body}`;
      note.textContent = "Opening your email client…";
      note.classList.add("is-ok");
    });
  }
})();

/* ---------- typing hero ---------- */
/* DaZoX Studio — hero typing rotator */
(function () {
  "use strict";
  const el = document.getElementById("typed");
  if (!el) return;

  const words = [
    "AI Automation",
    "Python",
    "Web Development",
    "OCR",
    "Chatbots",
    "Digital Transformation",
  ];

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    el.textContent = words[0];
    return;
  }

  let i = 0;
  let j = 0;
  let deleting = false;

  const type = () => {
    const word = words[i];
    if (!deleting) {
      j++;
      el.textContent = word.slice(0, j);
      if (j === word.length) {
        deleting = true;
        setTimeout(type, 1600);
        return;
      }
      setTimeout(type, 70 + Math.random() * 40);
    } else {
      j--;
      el.textContent = word.slice(0, j);
      if (j === 0) {
        deleting = false;
        i = (i + 1) % words.length;
        setTimeout(type, 260);
        return;
      }
      setTimeout(type, 32);
    }
  };
  setTimeout(type, 600);
})();

/* ---------- particles ---------- */
/* DaZoX Studio — lightweight particle field */
(function () {
  "use strict";
  const canvas = document.getElementById("particles");
  if (!canvas) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let particles = [];
  let raf = 0;
  let running = true;

  const COLORS = ["rgba(59,130,246,0.7)", "rgba(6,182,212,0.7)", "rgba(255,255,255,0.5)"];

  const resize = () => {
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  };

  const seed = () => {
    const density = Math.min(90, Math.floor((w * h) / 24000));
    particles = new Array(density).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      c: COLORS[(Math.random() * COLORS.length) | 0],
    }));
  };

  const step = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);

    // draw particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      ctx.beginPath();
      ctx.fillStyle = p.c;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // connect near neighbors
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < maxDist * maxDist) {
          const alpha = 1 - Math.sqrt(d2) / maxDist;
          ctx.strokeStyle = `rgba(148,163,184,${alpha * 0.18})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    raf = requestAnimationFrame(step);
  };

  resize();
  step();

  window.addEventListener("resize", () => {
    cancelAnimationFrame(raf);
    resize();
    step();
  }, { passive: true });

  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) step();
    else cancelAnimationFrame(raf);
  });
})();

/* ---------- scroll (progress + reveal + magnetic) ---------- */
/* DaZoX Studio — scroll progress + smooth anchor scroll + parallax */
(function () {
  "use strict";

  const progress = document.getElementById("scrollProgress");

  const updateProgress = () => {
    if (!progress) return;
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    progress.style.width = pct + "%";
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });

  // Enhanced smooth-scroll for in-page anchors (accounting for sticky nav)
  document.addEventListener("click", (e) => {
    const target = e.target.closest('a[href^="#"]');
    if (!target) return;
    const href = target.getAttribute("href");
    if (!href || href.length < 2) return;
    const dest = document.querySelector(href);
    if (!dest) return;
    e.preventDefault();
    const navH = document.getElementById("nav")?.offsetHeight || 0;
    const top = dest.getBoundingClientRect().top + window.scrollY - (navH + 8);
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", href);
  });

  // Subtle parallax on hero blobs
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;
  const blobs = document.querySelectorAll(".blob");
  let ticking = false;
  const parallax = () => {
    const y = window.scrollY;
    blobs.forEach((b, i) => {
      const factor = 0.06 + i * 0.03;
      b.style.transform = `translate3d(0, ${y * factor * -1}px, 0)`;
    });
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(parallax);
      ticking = true;
    }
  }, { passive: true });
})();

/* ---------- custom cursor ---------- */
/* DaZoX Studio — custom cursor + magnetic buttons */
(function () {
  "use strict";
  const isTouch = matchMedia("(hover: none), (pointer: coarse)").matches;
  if (isTouch) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ring = document.getElementById("cursor");
  const dot = document.getElementById("cursorDot");
  if (!ring || !dot) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  const onMove = (e) => {
    mx = e.clientX; my = e.clientY;
    ring.classList.add("is-visible");
    dot.classList.add("is-visible");
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  };
  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseleave", () => {
    ring.classList.remove("is-visible");
    dot.classList.remove("is-visible");
  });

  const loop = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  };
  loop();

  const hoverTargets = "a, button, .card, .project, .faq__item summary, input, textarea, select";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.add("is-hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.remove("is-hover");
  });

  // Magnetic buttons
  if (reduced) return;
  document.querySelectorAll(".magnetic").forEach((el) => {
    const strength = 18;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${(dx / r.width) * strength}px, ${(dy / r.height) * strength}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
})();

/* ---------- misc animations ---------- */
/* DaZoX Studio — IntersectionObserver-based reveals */
(function () {
  "use strict";
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || "0", 10);
          setTimeout(() => el.classList.add("is-in"), delay);
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  els.forEach((el) => io.observe(el));
})();
