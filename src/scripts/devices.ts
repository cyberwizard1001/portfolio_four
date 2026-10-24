// The three device behaviours:
//   1. Screens wake when the reader settles on them, dim and sleep when ignored,
//      and switch off when out of view or when the tab is hidden.
//   2. Project devices the reader has met (50% in view) collect on the home page shelf.
//   3. The shelf's "read next" list prefers met-but-unopened items, and rotates three at a time.
// Without JS every screen stays awake, the shelf is empty and the list shows its first three items.
// Storage is optional: every read and write is wrapped so private modes just lose memory.

/** Screen timings. With ?devices=debug the idle and out-of-view times are divided by 5. */
export const T = {
  VISIBLE_RATIO: 0.75,
  SETTLE_MS: 1200,
  BOOT_MS: 480,
  SLEEP_ANIM_MS: 240,
  // Keeps the page under 3 flashes a second (WCAG 2.3.1). Never lower below 334.
  STAGGER_MS: 350,
  MAX_BOOTING: 3,
  DIM_AFTER_MS: 20000,
  SLEEP_AFTER_MS: 30000,
  OUT_OF_VIEW_MS: 8000,
  TICK_MS: 250,
};

const MET_RATIO = 0.5;

function readList(store: () => Storage, key: string): string[] {
  try {
    const raw = store().getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

function writeList(store: () => Storage, key: string, list: string[]) {
  try {
    store().setItem(key, JSON.stringify(list));
  } catch {
    /* storage unavailable: behaviour just isn't remembered */
  }
}

const session = () => window.sessionStorage;
const local = () => window.localStorage;

/** One observer per threshold set, calling back per element. */
function watch(
  targets: Element[],
  thresholds: number[],
  onChange: (entry: IntersectionObserverEntry) => void
) {
  if (!targets.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => entries.forEach(onChange), { threshold: thresholds });
  targets.forEach((t) => io.observe(t));
}

/** In view "enough": by ratio, or by covering most of the viewport when taller than it. */
function enoughInView(entry: IntersectionObserverEntry, ratio: number) {
  if (!entry.isIntersecting) return false;
  if (entry.intersectionRatio >= ratio) return true;
  const vh = entry.rootBounds?.height ?? window.innerHeight;
  return entry.intersectionRect.height >= vh * ratio;
}

// ── 1. Screens wake, dim and sleep ────────────────────────────────────────

type Screen = 'off' | 'waking' | 'awake' | 'dim' | 'sleeping';

interface Dev {
  el: SVGElement;
  state: Screen;
  inView: boolean;
  outSince: number;
  queued: boolean;
  queuedAt: number;
  /** Slept from idleness: needs fresh input and a settle before it wakes again. */
  slept: boolean;
  sleptAt: number;
  order: number;
}

function initScreens() {
  const els = Array.from(document.querySelectorAll<SVGElement>('svg.device')).filter(
    (d) => !d.hasAttribute('data-screen-static') && !d.closest('[data-shelf]')
  );
  if (!els.length || !('IntersectionObserver' in window)) return;

  const debug = new URLSearchParams(location.search).get('devices') === 'debug';
  const dimAfter = debug ? T.DIM_AFTER_MS / 5 : T.DIM_AFTER_MS;
  const sleepAfter = debug ? T.SLEEP_AFTER_MS / 5 : T.SLEEP_AFTER_MS;
  const outOfView = debug ? T.OUT_OF_VIEW_MS / 5 : T.OUT_OF_VIEW_MS;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  // querySelectorAll already returns document order, top to bottom.
  const devs: Dev[] = els.map((el, order) => ({
    el, state: 'off', inView: false, outSince: 0, queued: false, queuedAt: 0,
    slept: false, sleptAt: 0, order,
  }));

  const set = (d: Dev, state: Screen) => {
    if (d.state === state) return;
    if (debug) console.log(`[devices] ${d.el.dataset.device}#${d.order}: ${d.state} → ${state}`);
    d.state = state;
    d.el.dataset.screen = state;
  };

  // Switch screens off without animating: nothing moves on load.
  document.documentElement.classList.add('devices-init');
  devs.forEach((d) => (d.el.dataset.screen = 'off'));
  requestAnimationFrame(() =>
    requestAnimationFrame(() => document.documentElement.classList.remove('devices-init'))
  );

  let lastInput = performance.now();
  let lastScroll = lastInput;
  let lastStart = -Infinity;
  let queue: Dev[] = [];
  let tickTimer = 0;
  let pumpTimer = 0;

  const wake = (d: Dev) => {
    d.slept = false;
    if (reduced.matches) return set(d, 'awake');
    set(d, 'waking');
    window.setTimeout(() => d.state === 'waking' && set(d, 'awake'), T.BOOT_MS);
  };

  const sleep = (d: Dev) => {
    d.slept = true;
    d.sleptAt = performance.now();
    if (reduced.matches) return set(d, 'off');
    set(d, 'sleeping');
    window.setTimeout(() => d.state === 'sleeping' && set(d, 'off'), T.SLEEP_ANIM_MS);
  };

  // Start queued wakes STAGGER_MS apart, at most MAX_BOOTING at once.
  const pump = () => {
    window.clearTimeout(pumpTimer);
    pumpTimer = 0;
    while (queue.length) {
      const now = performance.now();
      const wait = lastStart + T.STAGGER_MS - now;
      const booting = devs.filter((d) => d.state === 'waking').length;
      if (wait > 0 || booting >= T.MAX_BOOTING) {
        pumpTimer = window.setTimeout(pump, wait > 0 ? wait : T.TICK_MS);
        return;
      }
      const d = queue.shift()!;
      d.queued = false;
      if (!d.inView || d.state !== 'off' || lastScroll > d.queuedAt) continue;
      lastStart = now;
      wake(d);
    }
  };

  const tick = () => {
    const now = performance.now();
    const idle = now - lastInput;
    devs.forEach((d) => {
      if (d.inView) {
        if (d.state === 'awake' && idle >= dimAfter) set(d, 'dim');
        else if (d.state === 'dim' && idle >= sleepAfter) sleep(d);
      } else if ((d.state === 'awake' || d.state === 'dim') && now - d.outSince >= outOfView) {
        set(d, 'off');
      }
    });

    if (now - lastScroll >= T.SETTLE_MS) {
      const ready = devs.filter(
        (d) =>
          d.inView && d.state === 'off' && !d.queued &&
          (!d.slept || (lastInput > d.sleptAt && idle >= T.SETTLE_MS))
      );
      ready.forEach((d) => {
        d.queued = true;
        d.queuedAt = now;
      });
      if (ready.length) {
        queue = [...queue, ...ready].sort((a, b) => a.order - b.order);
        if (!pumpTimer) pump();
      }
    }
  };

  const start = () => {
    lastInput = lastScroll = performance.now();
    window.clearInterval(tickTimer);
    tickTimer = window.setInterval(tick, T.TICK_MS);
  };

  const stop = () => {
    window.clearInterval(tickTimer);
    window.clearTimeout(pumpTimer);
    tickTimer = pumpTimer = 0;
    queue.forEach((d) => (d.queued = false));
    queue = [];
    devs.forEach((d) => {
      d.slept = false;
      set(d, 'off');
    });
  };

  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        const d = devs.find((x) => x.el === entry.target)!;
        const inView = entry.intersectionRatio >= T.VISIBLE_RATIO;
        if (d.inView && !inView) d.outSince = performance.now();
        d.inView = inView;
      }),
    { threshold: [0, T.VISIBLE_RATIO, 1] }
  );
  devs.forEach((d) => io.observe(d.el));

  // Input resets the idle clock and brightens dimmed devices in view. It never
  // wakes devices that are off, and never interrupts a waking or sleeping animation.
  const onInput = () => {
    lastInput = performance.now();
    devs.forEach((d) => d.inView && d.state === 'dim' && set(d, 'awake'));
  };
  const onScroll = () => {
    lastScroll = performance.now();
    onInput();
  };
  let lastMove = 0;
  const onMove = () => {
    const now = performance.now();
    if (now - lastMove < T.TICK_MS) return;
    lastMove = now;
    onInput();
  };
  const passive = { passive: true };
  window.addEventListener('scroll', onScroll, passive);
  window.addEventListener('wheel', onScroll, passive);
  window.addEventListener('keydown', onInput, passive);
  window.addEventListener('pointerdown', onInput, passive);
  window.addEventListener('touchstart', onInput, passive);
  window.addEventListener('pointermove', onMove, passive);

  document.addEventListener('visibilitychange', () =>
    document.visibilityState === 'visible' ? start() : stop()
  );
  if (document.visibilityState === 'visible') start();
}

// ── 2 & 3. The shelf ──────────────────────────────────────────────────────

function initShelf() {
  const shelf = document.querySelector<HTMLElement>('[data-shelf]');
  const met = readList(session, 'met');

  const projectDevices = Array.from(
    document.querySelectorAll<SVGElement>('svg.device[data-project]')
  ).filter((d) => !d.closest('[data-shelf], footer, header'));

  if (!shelf) {
    // Other pages still collect, so the shelf remembers what was met across the visit.
    watch(projectDevices, [MET_RATIO], (entry) => {
      const slug = (entry.target as SVGElement).dataset.project;
      if (slug && enoughInView(entry, MET_RATIO) && !met.includes(slug)) {
        met.push(slug);
        writeList(session, 'met', met);
      }
    });
    return;
  }

  const row = shelf.querySelector<HTMLElement>('[data-shelf-row]')!;
  const list = shelf.querySelector<HTMLElement>('[data-shelf-list]')!;
  const items = Array.from(list.querySelectorAll<HTMLElement>('[data-shelf-item]'));
  const empty = shelf.querySelector<HTMLElement>('[data-shelf-empty]');
  const more = shelf.querySelector<HTMLButtonElement>('[data-shelf-more]');
  const status = shelf.querySelector<HTMLElement>('[data-shelf-status]');
  const visited = new Set(readList(local, 'visited'));
  let offset = 0;

  const placeOnShelf = (slug: string) => {
    if (row.querySelector(`[data-project="${slug}"]`)) return;
    const source = list.querySelector<SVGElement>(`[data-shelf-item="${slug}"] svg.device`);
    if (!source) return;
    const copy = source.cloneNode(true) as SVGElement;
    const [, , w, h] = (copy.getAttribute('viewBox') ?? '0 0 0 0').split(' ').map(Number);
    copy.setAttribute('width', String(w * 3));
    copy.setAttribute('height', String(h * 3));
    copy.setAttribute('data-screen', 'awake');
    copy.setAttribute('data-screen-static', '');
    row.appendChild(copy);
  };

  const pool = () => {
    const open = items.filter((i) => !visited.has(i.dataset.shelfItem!));
    const metFirst = met
      .map((slug) => open.find((i) => i.dataset.shelfItem === slug))
      .filter((i): i is HTMLElement => Boolean(i));
    return [...metFirst, ...open.filter((i) => !metFirst.includes(i))];
  };

  const render = () => {
    const ordered = pool();
    items.forEach((i) => (i.hidden = true));
    if (!ordered.length) {
      list.hidden = true;
      if (empty) empty.hidden = false;
      if (more) more.hidden = true;
      return;
    }
    if (offset >= ordered.length) offset = 0;
    const shown = Array.from({ length: Math.min(3, ordered.length) }, (_, k) => ordered[(offset + k) % ordered.length]);
    shown.forEach((i) => {
      i.hidden = false;
      list.appendChild(i);
    });
    if (more) more.hidden = ordered.length <= 3;
  };

  met.forEach(placeOnShelf);
  render();

  more?.addEventListener('click', () => {
    offset += 3;
    render();
    if (status) {
      status.textContent = '';
      window.setTimeout(() => (status.textContent = 'Showing three other items'), 50);
    }
  });

  watch(projectDevices, [MET_RATIO], (entry) => {
    const slug = (entry.target as SVGElement).dataset.project;
    if (!slug || !enoughInView(entry, MET_RATIO) || met.includes(slug)) return;
    met.push(slug);
    writeList(session, 'met', met);
    placeOnShelf(slug);
  });
}

// ── Visited ───────────────────────────────────────────────────────────────

function recordVisit() {
  const slug = document.querySelector<HTMLElement>('[data-visit]')?.dataset.visit;
  if (!slug) return;
  const visited = readList(local, 'visited');
  if (!visited.includes(slug)) writeList(local, 'visited', [...visited, slug]);
}

recordVisit();
initScreens();
initShelf();
