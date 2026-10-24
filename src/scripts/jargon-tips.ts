// Glossary tooltips for [[term]] markers rendered by src/lib/jargon.ts.
(function () {
  const buttons = document.querySelectorAll<HTMLButtonElement>('.jargon-term');
  if (buttons.length === 0) return;

  const isTouch = () => window.matchMedia('(hover: none)').matches;
  const GAP = 8;
  const EDGE = 8;

  let openButton: HTMLButtonElement | null = null;

  const tipFor = (button: HTMLButtonElement) => {
    const id = button.getAttribute('aria-describedby');
    return id ? document.getElementById(id) : null;
  };

  const position = (button: HTMLButtonElement, tip: HTMLElement) => {
    const btnRect = button.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();

    let top = btnRect.top - tipRect.height - GAP;
    if (top < EDGE) top = btnRect.bottom + GAP;

    let left = btnRect.left + btnRect.width / 2 - tipRect.width / 2;
    left = Math.max(EDGE, Math.min(left, window.innerWidth - tipRect.width - EDGE));

    tip.style.top = `${top}px`;
    tip.style.left = `${left}px`;
  };

  const close = (button: HTMLButtonElement | null) => {
    if (!button) return;
    const tip = tipFor(button);
    button.setAttribute('aria-expanded', 'false');
    tip?.classList.remove('open');
    if (tip) {
      tip.style.top = '-9999px';
      tip.style.left = '-9999px';
    }
    if (openButton === button) openButton = null;
  };

  const open = (button: HTMLButtonElement) => {
    const tip = tipFor(button);
    if (!tip) return;
    if (openButton && openButton !== button) close(openButton);
    button.setAttribute('aria-expanded', 'true');
    tip.classList.add('open');
    position(button, tip);
    openButton = button;
  };

  buttons.forEach((button) => {
    if (isTouch()) {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        if (openButton === button) close(button);
        else open(button);
      });
      return;
    }

    // WCAG 1.4.13: the tip must stay open while the pointer moves onto it, so
    // close after a short delay that entering the tip cancels.
    let closeTimer: ReturnType<typeof setTimeout> | null = null;
    const cancelClose = () => {
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = null;
    };
    const scheduleClose = () => {
      cancelClose();
      closeTimer = setTimeout(() => {
        if (document.activeElement !== button) close(button);
      }, 150);
    };
    const tip = tipFor(button);
    tip?.addEventListener('mouseenter', cancelClose);
    tip?.addEventListener('mouseleave', scheduleClose);

    button.addEventListener('mouseenter', () => {
      cancelClose();
      open(button);
    });
    button.addEventListener('mouseleave', scheduleClose);
    button.addEventListener('focus', () => open(button));
    button.addEventListener('blur', () => close(button));
  });

  document.addEventListener('click', (e) => {
    if (!openButton) return;
    if (e.target instanceof Node && openButton.contains(e.target)) return;
    close(openButton);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !openButton) return;
    close(openButton);
  });

  window.addEventListener(
    'resize',
    () => {
      if (openButton) close(openButton);
    },
    { passive: true }
  );
})();
