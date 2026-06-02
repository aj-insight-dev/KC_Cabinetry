/* ============================================================
   KC CABINETRY — site interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Owner theme studio ---------- */
  const themePresets = {
    heritage: {
      '--navy': '#14221E',
      '--navy-deep': '#0B1512',
      '--gold': '#B48A42',
      '--gold-lt': '#D2B36C',
      '--walnut': '#33261A'
    },
    walnut: {
      '--navy': '#2B1D15',
      '--navy-deep': '#20150F',
      '--gold': '#A8733B',
      '--gold-lt': '#D7A15A',
      '--walnut': '#3A2417'
    },
    iron: {
      '--navy': '#171C21',
      '--navy-deep': '#101418',
      '--gold': '#9A7A48',
      '--gold-lt': '#C7A76E',
      '--walnut': '#2A2520'
    },
    evergreen: {
      '--navy': '#163326',
      '--navy-deep': '#10251C',
      '--gold': '#C49A4D',
      '--gold-lt': '#D8BB72',
      '--walnut': '#3A2A1B'
    }
  };

  const root = document.documentElement;
  const shadeHex = (hex, percent) => {
    const raw = hex.replace('#', '');
    if (raw.length !== 6) return hex;
    const num = parseInt(raw, 16);
    const amt = Math.round(2.55 * percent);
    const r = Math.max(0, Math.min(255, (num >> 16) + amt));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 255) + amt));
    const b = Math.max(0, Math.min(255, (num & 255) + amt));
    return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
  };
  const vibeLabel = value => {
    const n = Number(value) || 0;
    if (n <= -18) return 'Moody';
    if (n < -5) return 'Deep';
    if (n >= 18) return 'Bright';
    if (n > 5) return 'Warm';
    return 'Balanced';
  };
  const themeWithVibe = (base, vibe = 0) => {
    const v = Number(vibe) || 0;
    return {
      '--navy-deep': shadeHex(base['--navy-deep'], v * 0.28),
      '--navy': shadeHex(base['--navy'], v * 0.34),
      '--walnut': shadeHex(base['--walnut'], v * 0.25),
      '--gold': shadeHex(base['--gold'], v * 0.18),
      '--gold-lt': shadeHex(base['--gold-lt'], v * 0.15)
    };
  };
  const applyTheme = theme => {
    Object.entries(theme).forEach(([key, value]) => root.style.setProperty(key, value));
  };
  let currentThemeBase = { ...themePresets.heritage };
  let currentVibe = 0;
  try {
    const saved = JSON.parse(localStorage.getItem('kcCabinetryTheme') || 'null');
    if (saved) {
      if (saved.base) {
        currentThemeBase = saved.base;
        currentVibe = Number(saved.vibe) || 0;
        applyTheme(themeWithVibe(currentThemeBase, currentVibe));
      } else {
        currentThemeBase = saved;
        applyTheme(saved);
      }
    }
  } catch (err) {
    console.warn('Theme preference could not be loaded.', err);
  }

  const themeStudio = document.querySelector('[data-theme-studio]');
  if (themeStudio) {
    const presetButtons = Array.from(themeStudio.querySelectorAll('[data-theme-option]'));
    const colorInputs = Array.from(themeStudio.querySelectorAll('[data-theme-color]'));
    const vibeInput = themeStudio.querySelector('[data-theme-vibe]');
    const vibeValue = themeStudio.querySelector('[data-theme-vibe-value]');
    const saveTheme = () => localStorage.setItem('kcCabinetryTheme', JSON.stringify({ base: currentThemeBase, vibe: currentVibe }));
    const updateVibeLabel = () => {
      if (vibeInput) vibeInput.value = String(currentVibe);
      if (vibeValue) vibeValue.textContent = vibeLabel(currentVibe);
    };
    const setActive = name => {
      presetButtons.forEach(btn => btn.classList.toggle('is-active', btn.getAttribute('data-theme-option') === name));
    };
    updateVibeLabel();
    colorInputs.forEach(input => {
      if (input.getAttribute('data-theme-color') === 'gold') input.value = currentThemeBase['--gold'] || themePresets.heritage['--gold'];
      if (input.getAttribute('data-theme-color') === 'navy-deep') input.value = currentThemeBase['--navy-deep'] || themePresets.heritage['--navy-deep'];
    });
    presetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-theme-option');
        const theme = themePresets[name];
        if (!theme) return;
        currentThemeBase = { ...theme };
        applyTheme(themeWithVibe(currentThemeBase, currentVibe));
        saveTheme();
        setActive(name);
        const foundation = themeStudio.querySelector('[data-theme-color="navy-deep"]');
        const accent = themeStudio.querySelector('[data-theme-color="gold"]');
        if (foundation) foundation.value = currentThemeBase['--navy-deep'];
        if (accent) accent.value = currentThemeBase['--gold'];
      });
    });
    colorInputs.forEach(input => {
      input.addEventListener('input', () => {
        const foundation = themeStudio.querySelector('[data-theme-color="navy-deep"]')?.value || themePresets.heritage['--navy-deep'];
        const accent = themeStudio.querySelector('[data-theme-color="gold"]')?.value || themePresets.heritage['--gold'];
        currentThemeBase = {
          '--navy-deep': foundation,
          '--navy': shadeHex(foundation, 12),
          '--walnut': shadeHex(foundation, 20),
          '--gold': accent,
          '--gold-lt': shadeHex(accent, 18)
        };
        applyTheme(themeWithVibe(currentThemeBase, currentVibe));
        saveTheme();
        setActive('');
      });
    });
    if (vibeInput) {
      vibeInput.addEventListener('input', () => {
        currentVibe = Number(vibeInput.value) || 0;
        applyTheme(themeWithVibe(currentThemeBase, currentVibe));
        updateVibeLabel();
        saveTheme();
      });
    }
    const reset = themeStudio.querySelector('[data-theme-reset]');
    if (reset) {
      reset.addEventListener('click', () => {
        localStorage.removeItem('kcCabinetryTheme');
        currentThemeBase = { ...themePresets.heritage };
        currentVibe = 0;
        applyTheme(currentThemeBase);
        setActive('heritage');
        colorInputs.forEach(input => {
          input.value = input.getAttribute('data-theme-color') === 'gold' ? themePresets.heritage['--gold'] : themePresets.heritage['--navy-deep'];
        });
        updateVibeLabel();
      });
    }
  }

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.header-nav');
  const scrim = document.querySelector('.nav-scrim');
  if (toggle && nav) {
    toggle.setAttribute('aria-expanded', 'false');
    const close = () => {
      nav.classList.remove('open');
      scrim && scrim.classList.remove('show');
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      scrim && scrim.classList.toggle('show', open);
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    scrim && scrim.addEventListener('click', close);
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ---------- Sticky header shadow ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ---------- Lightbox ---------- */
  const lb = document.getElementById('lightbox');
  if (lb) {
    const lbImg = lb.querySelector('img');
    const items = Array.from(document.querySelectorAll('[data-lightbox]'));
    let idx = 0;
    const srcOf = el => el.getAttribute('data-full') || (el.querySelector('img') && el.querySelector('img').src);
    const openLightbox = i => {
      lb.classList.add('open');
      document.body.classList.add('lb-open');
      show(i);
      lb.querySelector('.lb-close').focus();
    };
    const closeLightbox = () => {
      lb.classList.remove('open');
      document.body.classList.remove('lb-open');
    };
    const show = i => {
      idx = (i + items.length) % items.length;
      const item = items[idx];
      const image = item.querySelector('img');
      lbImg.src = srcOf(item);
      lbImg.alt = image ? image.alt : 'Project photo enlarged';
    };
    items.forEach((el, i) => el.addEventListener('click', () => openLightbox(i)));
    lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
    lb.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
    lb.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });
  }

  /* ---------- Single-select chip groups ---------- */
  function bindChips(scope) {
    scope.querySelectorAll('[data-chips]').forEach(group => {
      const pre = group.querySelector('.chip.sel');
      if (pre) group.setAttribute('data-value', pre.getAttribute('data-value'));
      group.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
          group.querySelectorAll('.chip').forEach(c => c.classList.remove('sel'));
          chip.classList.add('sel');
          group.setAttribute('data-value', chip.getAttribute('data-value'));
          if (scope.id === 'calculator') updateEstimate();
        });
      });
    });
  }

  /* ---------- COST CALCULATOR ---------- */
  const calc = document.getElementById('calculator');
  function updateEstimate() {
    if (!calc) return;
    const get = key => {
      const g = calc.querySelector(`[data-chips="${key}"]`);
      return g ? g.getAttribute('data-value') : null;
    };
    const room = get('room'), style = get('style'), size = get('size');
    // base ranges by room + size (USD)
    const base = {
      kitchen:  { small: [9000, 16000],  medium: [18000, 34000], large: [34000, 60000], unsure: [16000, 42000] },
      bar:      { small: [6000, 11000],  medium: [12000, 24000], large: [22000, 40000], unsure: [10000, 30000] },
      bath:     { small: [4500, 9000],   medium: [9000, 17000],  large: [16000, 27000], unsure: [7000, 20000] },
      whole:    { small: [28000, 50000], medium: [50000, 90000], large: [85000, 150000], unsure: [40000, 100000] }
    };
    const styleMult = { transitional: 1.08, modern: 1.12, shaker: 1.0, raised: 1.05 };
    const out = document.getElementById('estimate-val');
    if (!room || !size) { out.textContent = 'Select options above'; out.classList.add('small'); return; }
    out.classList.remove('small');
    let [lo, hi] = base[room][size];
    const m = styleMult[style] || 1.0;
    lo *= m; hi *= m;
    const upgrades = calc.querySelectorAll('.check.sel').length;
    lo += upgrades * 1400; hi += upgrades * 2600;
    const fmt = n => '$' + (Math.round(n / 500) * 500).toLocaleString();
    out.textContent = fmt(lo) + ' \u2013 ' + fmt(hi);
  }
  if (calc) {
    bindChips(calc);
    calc.querySelectorAll('.check').forEach(c => c.addEventListener('click', () => { c.classList.toggle('sel'); updateEstimate(); }));
    updateEstimate();
  }

  /* ---------- REFACING vs REPLACING ASSESSMENT ---------- */
  const quiz = document.getElementById('assessment');
  if (quiz) {
    bindChips(quiz);
    const getQ = k => { const g = quiz.querySelector(`[data-chips="${k}"]`); return g ? g.getAttribute('data-value') : null; };
    quiz.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', () => {
      const q1 = getQ('q1'), q2 = getQ('q2'), q3 = getQ('q3');
      if (q1 && q2 && q3) {
        // Logic: refacing fits when layout is kept, boxes are sound, and goal is cosmetic.
        let reface = (q1 === 'yes') && (q2 === 'yes') && (q3 === 'look');
        let unsure = (q2 === 'unsure');
        const card = document.getElementById('quiz-result');
        const title = document.getElementById('quiz-result-title');
        const body = document.getElementById('quiz-result-body');
        if (reface) {
          title.textContent = 'Refacing looks like a smart fit \u2014 pending a quick check';
          body.textContent = 'You love your layout and your cabinet boxes sound solid, so refacing the doors, drawer fronts and hardware could give you a fresh 2026 look for less time and money. Complete the form to get this confirmed and see refacing examples.';
        } else if (unsure) {
          title.textContent = 'A quick in-home look will give you the clearest answer';
          body.textContent = "It's hard to know if existing boxes are sound without seeing them. We'll assess the structure in person and recommend the most cost-effective path \u2014 reface or replace. Complete the form to schedule.";
        } else {
          title.textContent = 'A full custom replacement is likely your best long-term investment';
          body.textContent = 'Because you want to change the layout or add intuitive smart storage, a custom replacement built with our artisan craftsmanship will serve you best. Complete the form for your tailored recommendation.';
        }
        card.classList.add('show');
      }
    }));
  }

  /* ---------- Forms (front-end confirmation; wire to CRM later) ---------- */
  document.querySelectorAll('form[data-capture]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      data.page = document.title;
      data.submitted_at = new Date().toISOString();
      try {
        const leads = JSON.parse(localStorage.getItem('kcCabinetryLeads') || '[]');
        leads.push(data);
        localStorage.setItem('kcCabinetryLeads', JSON.stringify(leads.slice(-50)));
      } catch (err) {
        console.warn('Lead could not be saved locally.', err);
      }
      const success = form.querySelector('.form-success');
      const btn = form.querySelector('.btn[type="submit"]');
      if (btn) btn.disabled = true;
      form.querySelectorAll('.field, .btn[type="submit"], .field-row').forEach(el => el.style.display = 'none');
      if (success) success.classList.add('show');
    });
  });

  /* ---------- Footer year ---------- */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
