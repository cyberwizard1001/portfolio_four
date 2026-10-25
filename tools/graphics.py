#!/usr/bin/env python3
"""Builds the case study diagrams in public/images as SVGs in the site's visual system.

White paper, ink rules, Pixelify Sans for machine labels, Instrument Sans for reading
text, Playfair Display for titles, tangerine only for "look here". The three site fonts
are embedded from node_modules/@fontsource so the SVGs render correctly as <img>.

Run from the repo root:  python3 tools/graphics.py
"""
import base64, html, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FS = os.path.join(ROOT, 'node_modules', '@fontsource')
OUT = os.path.join(ROOT, 'public', 'images')

PAPER, INK, INK2, MUTED = '#FFFFFF', '#000000', '#3A3A3A', '#5F5F5F'
RULE, GLIGHT, GMID, GDARK, PANEL = '#9A9A9A', '#D6D6D6', '#8C8C8C', '#1A1A1A', '#F2F2F2'
TANG, TINT = '#FF7A1A', '#FFF1E6'
CHI, CLO, BEVEL = '#E4E4E4', '#ABABAB', '#8A8A8A'


def font(family, path, weight):
    data = base64.b64encode(open(os.path.join(FS, path), 'rb').read()).decode()
    return (f"@font-face{{font-family:'{family}';font-weight:{weight};"
            f"src:url(data:font/woff2;base64,{data}) format('woff2');}}")


def fonts(px=True, text=(400, 600), display=False):
    rules = []
    if px:
        rules.append(font('PX', 'pixelify-sans/files/pixelify-sans-latin-400-normal.woff2', 400))
    for w in text:
        rules.append(font('IS', f'instrument-sans/files/instrument-sans-latin-{w}-normal.woff2', w))
    if display:
        rules.append(font('PF', 'playfair-display/files/playfair-display-latin-600-normal.woff2', 600))
    return ''.join(rules)


STYLE = """
.px{font-family:'PX',monospace;letter-spacing:.06em}
.t{font-family:'IS',sans-serif}
.d{font-family:'PF',Georgia,serif;font-weight:600}
"""


def svg(w, h, body, font_css, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img">'
            f'<title>{html.escape(title)}</title>'
            f'<style>{font_css}{STYLE}</style>'
            f'<rect width="{w}" height="{h}" fill="{PAPER}"/>{body}</svg>')


def T(x, y, s, cls='t', size=22, fill=INK, weight=400, anchor='start', extra=''):
    return (f'<text x="{x}" y="{y}" class="{cls}" font-size="{size}" fill="{fill}" '
            f'font-weight="{weight}" text-anchor="{anchor}" {extra}>{html.escape(s)}</text>')


def lines(x, y, rows, lh, **kw):
    return ''.join(T(x, y + i * lh, r, **kw) for i, r in enumerate(rows))


def wrap(s, size, width):
    """Breaks reading text into lines that fit `width`, estimating Instrument Sans at 0.52em a character."""
    out, row = [], ''
    for word in s.split(' '):
        test = f'{row} {word}'.strip()
        if row and len(test) * size * 0.52 > width:
            out.append(row)
            row = word
        else:
            row = test
    return out + [row]


def box(cx, cy, size=20, fill=CHI, bevel=True):
    """A bevelled title-bar box, the site's stop marker."""
    x, y = cx - size / 2, cy - size / 2
    out = f'<rect x="{x}" y="{y}" width="{size}" height="{size}" fill="{fill}" stroke="{INK}" stroke-width="2"/>'
    if bevel:
        out += (f'<path d="M{x+2} {y+size-2}V{y+2}H{x+size-2}" fill="none" stroke="{PAPER}" stroke-width="2"/>'
                f'<path d="M{x+2} {y+size-2}H{x+size-2}V{y+2}" fill="none" stroke="{BEVEL}" stroke-width="2"/>')
    return out


def chip(x, y, label, fill=PAPER, size=18, pad=10, h=30, anchor='start', w=None):
    w = w or int(len(label) * size * 0.62 + pad * 2)
    if anchor == 'end':
        x -= w
    if anchor == 'middle':
        x -= w / 2
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{INK}" stroke-width="1.5"/>'
            + T(x + w / 2, y + h / 2 + size * 0.35, label, cls='px', size=size, anchor='middle'))


def dotted(x1, y1, x2, y2, color=INK, w=3):
    return (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{w}" '
            f'stroke-dasharray="0.1 {w*2.4:.1f}" stroke-linecap="round"/>')


def arrow(x, y1, y2, color=INK):
    return (f'<line x1="{x}" y1="{y1}" x2="{x}" y2="{y2-8}" stroke="{color}" stroke-width="2"/>'
            f'<path d="M{x-7} {y2-10}L{x} {y2}L{x+7} {y2-10}Z" fill="{color}"/>')


def window(x, y, w, h, title=None, bar=26, shadow=True):
    out = ''
    if shadow:
        out += f'<rect x="{x+4}" y="{y+4}" width="{w}" height="{h}" fill="{INK}"/>'
    out += f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{PAPER}" stroke="{INK}" stroke-width="1.5"/>'
    stripes = ''.join(f'<rect x="{x+1}" y="{y+1+i}" width="{w-2}" height="1" fill="{CLO}"/>'
                      for i in range(2, bar - 1, 3))
    out += f'<rect x="{x+1}" y="{y+1}" width="{w-2}" height="{bar-1}" fill="{CHI}"/>{stripes}'
    out += f'<line x1="{x}" y1="{y+bar}" x2="{x+w}" y2="{y+bar}" stroke="{INK}" stroke-width="1.5"/>'
    if title:
        tw = len(title) * 12 + 20
        out += f'<rect x="{x + w/2 - tw/2}" y="{y+2}" width="{tw}" height="{bar-3}" fill="{CHI}"/>'
        out += T(x + w / 2, y + bar / 2 + 6, title, cls='px', size=19, anchor='middle')
    return out


def write(name, content):
    path = os.path.join(OUT, name)
    with open(path, 'w') as f:
        f.write(content)
    print(f'{name}: {len(content)//1024} KB')


# ── Perro: where the original onboarding lost people ──────────────────────────
def perro_dropoff():
    W, H = 1000, 560
    b = T(48, 64, 'ORIGINAL FLOW', cls='px', size=20, fill=MUTED)
    track_y = 200
    stops = [  # x, label lines, dropped?
        (140, ['landing', '+ sign-in'], True),
        (430, ['dog profile', 'setup'], True),
        (710, ['user profile', 'setup'], True),
        (842, ['paywall'], False),
        (942, ['home'], False),
    ]
    # The line thins out as people leave: ink to the last drop-off, grey after it.
    b += dotted(140, track_y, 710, track_y, INK, 3)
    b += dotted(710, track_y, 942, track_y, GLIGHT, 3)
    for x, label, dropped in stops:
        # Text stays at 4.5:1 (MUTED); the grey markers and line carry the fade.
        col = INK if dropped else MUTED
        b += lines(x, track_y - 56 + (14 if len(label) == 1 else 0), label, 26, size=21, anchor='middle', fill=col)
        b += box(x, track_y, 24, TANG, bevel=False) if dropped else box(x, track_y, 20, PANEL)
    notes = [
        (140, 'SIGN-IN FRICTION', ['Cluttered landing,', 'no value shown']),
        (430, 'DOG PROFILE BLOCKERS', ['Photo upload sent users', 'out of the app to find', "a photo, and they didn't", 'return']),
        (710, 'LATE-FUNNEL FATIGUE', ['Fitness and location', 'questions after users', 'were already worn down']),
    ]
    for x, title, body in notes:
        b += arrow(x, track_y + 16, track_y + 76, INK)
        left = x - 92
        b += f'<line x1="{left}" y1="{track_y+92}" x2="{left+236}" y2="{track_y+92}" stroke="{INK}" stroke-width="1.5"/>'
        b += T(left, track_y + 124, title, cls='px', size=18)
        b += lines(left, track_y + 158, body, 28, size=21, fill=INK2)
    b += f'<line x1="48" y1="{H-58}" x2="{W-48}" y2="{H-58}" stroke="{RULE}" stroke-width="1.5" stroke-dasharray="5 5"/>'
    b += T(48, H - 24, 'Source: Mixpanel funnels via Twilio Segment, plus usability session recordings', size=17, fill=MUTED)
    # Legend
    b += box(W - 300, 58, 18, TANG, bevel=False) + T(W - 282, 65, 'drop-off', size=18, anchor='start', fill=INK2, extra='dx="8"')
    b += box(W - 170, 58, 16, PANEL) + T(W - 154, 65, 'reached', size=18, fill=INK2, extra='dx="8"')
    write('perro/drop-off-funnel.svg', svg(W, H, b, fonts(), 'Original Perro onboarding flow and where users dropped off'))


# ── Perro: onboarding before and after ────────────────────────────────────────
# Each half is drawn from its own top edge, so it can sit in the combined diagram
# (the route) or stand alone as one side of the hero's before/after pair.
def perro_before(y0):
    W = 1000
    b = T(48, y0 + 24, 'BEFORE', cls='px', size=20, fill=MUTED)
    b += chip(W - 48, y0, '5 screens · 16 qs', anchor='end')
    ty = y0 + 92
    xs = [110, 300, 500, 700, 890]
    labels = [['sign-up'], ['verify'], ['pet info +', 'photo upload'], ['plans +', 'health fields'], ['user profile', 'fitness / location']]
    b += dotted(xs[0], ty, xs[-1], ty, GMID, 3)
    for x, lab in zip(xs, labels):
        b += box(x, ty, 20, PANEL)
        b += lines(x, ty + 46, lab, 26, size=20, anchor='middle', fill=INK2)
    return b


def perro_after(y1):
    W = 1000
    b = T(48, y1 + 46, 'AFTER', cls='px', size=20)
    b += chip(W - 48, y1 + 22, '4 screens · 11 qs', fill=TANG, anchor='end')
    ty = y1 + 146
    xs = [110, 370, 630, 890]
    tags = ['NEW', 'CHANGED', 'NEW', 'CHANGED']
    labels = [['feature carousel'], ['sign-up +', 'avatar (no photo)'], ['permissions', 'explainer'], ['subscription', '(value-first)']]
    b += f'<line x1="{xs[0]}" y1="{ty}" x2="{xs[-1]}" y2="{ty}" stroke="{INK}" stroke-width="4"/>'
    for x, tag, lab in zip(xs, tags, labels):
        b += chip(x, ty - 62, tag, fill=TINT if tag == 'CHANGED' else PAPER, size=16, h=26, anchor='middle')
        b += box(x, ty, 24, INK, bevel=False)
        b += lines(x, ty + 48, lab, 26, size=20, anchor='middle')
    return b


def perro_before_after():
    W, H = 1000, 470
    y1 = 236
    b = perro_before(40)
    b += f'<line x1="48" y1="{y1}" x2="{W-48}" y2="{y1}" stroke="{INK}" stroke-width="1.5"/>'
    b += perro_after(y1)
    write('perro/before-after-screens.svg', svg(W, H, b, fonts(), 'Perro onboarding before and after: five screens and sixteen questions became four screens and eleven questions'))
    # The hero pair: one half each, the same size so the toggle swaps like for like.
    # The headers line up: BEFORE at y0 + 24, AFTER at y1 + 46.
    H = 260
    write('perro/flow-before.svg', svg(W, H, perro_before(40), fonts(), 'Perro onboarding before: five screens and sixteen questions'))
    write('perro/flow-after.svg', svg(W, H, perro_after(18), fonts(), 'Perro onboarding after: four screens and eleven questions'))


# ── Counselling: an hour with a client ────────────────────────────────────────
def counselling_admin():
    W, H = 1000, 420
    b = T(48, 72, 'An hour with a client, broken down', cls='d', size=34)
    b += T(48, 108, 'Where the 15–20 minutes of admin goes', size=21, fill=MUTED)
    x0, bw, by, bh = 48, W - 96, 186, 72
    parts = [('prep', 5, True), ('client session', 40, False), ('notes', 8, True), ('billing / follow-up', 7, True)]
    x = x0
    for name, mins, admin in parts:
        w = bw * mins / 60
        b += f'<rect x="{x}" y="{by}" width="{w}" height="{bh}" fill="{TANG if admin else PANEL}" stroke="{INK}" stroke-width="1.5"/>'
        b += T(x + w / 2, by - 14, f'{mins} min', cls='px', size=18, anchor='middle', fill=INK if admin else MUTED)
        if name == 'billing / follow-up':
            b += lines(x + w / 2, by + 32, ['billing /', 'follow-up'], 22, size=17, anchor='middle', weight=600)
        else:
            b += T(x + w / 2, by + bh / 2 + 7, name, size=20 if admin else 22, anchor='middle', weight=600)
        x += w
    ly = by + bh + 58
    b += f'<rect x="48" y="{ly-15}" width="18" height="18" fill="{TANG}" stroke="{INK}" stroke-width="1.5"/>'
    b += T(76, ly, 'admin: 20 of 60 minutes', size=20)
    b += f'<rect x="340" y="{ly-15}" width="18" height="18" fill="{PANEL}" stroke="{INK}" stroke-width="1.5"/>'
    b += T(368, ly, 'client practice: 40 of 60 minutes', size=20, fill=INK2)
    b += f'<line x1="48" y1="{H-58}" x2="{W-48}" y2="{H-58}" stroke="{RULE}" stroke-width="1.2" stroke-dasharray="5 5"/>'
    b += T(48, H - 24, 'Interview finding', size=17, fill=MUTED)
    write('counselling/admin-breakdown.svg', svg(W, H, b, fonts(display=True), 'An hour with a client: 40 minutes of session and 20 minutes of admin'))


# ── Counselling: persona avatars, as pixel sprites like the devices ───────────
SOLO = """
................
................
.......##.......
......#oo#......
......#oo#......
.......##.......
.....######.....
....#oooooo#....
....#oooooo#....
################
#++++++++++++++#
################
.#............#.
.#............#.
.#............#.
................"""

TEAM = """
................
................
..##...##...##..
.#oo#.#oo#.#oo#.
.#oo#.#oo#.#oo#.
..##...##...##..
.####.####.####.
#oooo#oooo#oooo#
#oooo#oooo#oooo#
################
#++++++++++++++#
################
.#............#.
.#............#.
.#............#.
................"""


def pixel_avatar(name, art, title):
    rows = art.strip('\n').split('\n')
    px = 7
    size = 112
    off = (size - 16 * px) // 2
    cols = {'#': GDARK, 'o': GMID, '+': GLIGHT}
    rects = ''.join(
        f'<rect x="{off + x*px}" y="{off + y*px}" width="{px}" height="{px}" fill="{cols[c]}"/>'
        for y, r in enumerate(rows) for x, c in enumerate(r) if c in cols)
    body = f'<rect width="{size}" height="{size}" fill="{PANEL}"/>' + rects
    content = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 {size} {size}" '
               f'shape-rendering="crispEdges" role="img"><title>{title}</title>{body}</svg>')
    write(name, content)


# ── Direct quote: research and evidence map ───────────────────────────────────
def evidence_map():
    # Drawn at about 0.65x in the case study column, so nothing here is under 19 units
    # (12px on screen). The lightbox shows it full size.
    W, H = 1200, 916
    b = T(48, 64, 'Research & Evidence Map', cls='d', size=34)
    b += T(48, 98, 'Direct Quote Flow Redesign', size=20, fill=MUTED)
    cols = [(48, 'RESEARCH STREAMS'), (500, 'THEMES'), (900, 'OUTPUT')]
    hy = 150
    for x, label in cols:
        b += T(x, hy, label, cls='px', size=19, fill=MUTED)
    b += f'<line x1="48" y1="{hy+16}" x2="{W-48}" y2="{hy+16}" stroke="{INK}" stroke-width="1.5"/>'
    streams = [
        ('Nielsen Heuristic Analysis', 'June 2026'),
        ('Baymard Institute UX Audit', 'June 2026'),
        ('UX Audits Synthesis', 'Cross-audit analysis'),
        ('Heuristic Eval Workshop', 'Miro board · cross-functional'),
        ('Customer Call Analysis', 'May 2026'),
        ('Pre-Purchase Contact Analysis', 'Connex'),
        ('Analytics & Change Document', 'Conversion data · June 2026'),
        ('Question Audit', 'Full field inventory · CSV'),
    ]
    sy, rh = hy + 40, 84
    collector_x = 445
    for i, (name, meta) in enumerate(streams):
        y = sy + i * rh
        if i:
            b += f'<line x1="48" y1="{y-14}" x2="400" y2="{y-14}" stroke="{RULE}" stroke-width="1.2" stroke-dasharray="5 5"/>'
        b += T(48, y + 20, name, size=21, weight=600)
        b += T(48, y + 48, meta, size=19, fill=MUTED)
        b += dotted(410, y + 14, collector_x, y + 14, INK, 2.5)
    top, bot = sy + 14, sy + 7 * rh + 14
    b += f'<line x1="{collector_x}" y1="{top}" x2="{collector_x}" y2="{bot}" stroke="{INK}" stroke-width="3"/>'
    themes = [
        ('Are We Nearly There Yet?', 'Form length, progress, early drop-off'),
        ('The Grey Area', 'Pre-existing conditions, #1 call driver'),
        ('Back to Square One', 'Save and resume, losing progress'),
        ('Go On Then', 'Quote confidence, price trust'),
    ]
    tx, tw, th = 500, 340, 132
    span = bot - top
    gap = (span - 4 * th) / 3 + th
    t_mid = []
    for i, (name, sub) in enumerate(themes):
        y = top - 14 + i * gap
        mid = y + 26 + (th - 26) / 2
        t_mid.append(mid)
        b += dotted(collector_x, mid, tx - 6, mid, INK, 2.5)
        b += window(tx, y, tw, th, title=f'station {i+1}')
        b += T(tx + 16, y + 62, name, size=20, weight=600)
        b += lines(tx + 16, y + 90, wrap(sub, 19, tw - 32), 24, size=19, fill=INK2)
    # Themes into the workshop.
    ox, ow, oh = 900, 252, 240
    oy = (top + bot) / 2 - oh / 2
    omid = oy + 26 + (oh - 26) / 2
    jx = 870
    for m in t_mid:
        b += dotted(tx + tw + 8, m, jx, m, INK, 2.5)
    b += f'<line x1="{jx}" y1="{t_mid[0]}" x2="{jx}" y2="{t_mid[-1]}" stroke="{INK}" stroke-width="3"/>'
    b += f'<line x1="{jx}" y1="{omid}" x2="{ox-6}" y2="{omid}" stroke="{INK}" stroke-width="3"/>'
    b += window(ox, oy, ow, oh, title='workshop')
    b += f'<rect x="{ox+1}" y="{oy+27}" width="{ow-2}" height="8" fill="{TANG}"/>'
    b += T(ox + 18, oy + 80, 'Co-Design Workshop', size=22, weight=600)
    b += lines(ox + 18, oy + 118, ['4 stations', 'How Might We + Crazy 8s', '90 minutes', 'Design Studio format'], 30, size=19, fill=INK2)
    b += f'<line x1="48" y1="{H-58}" x2="{W-48}" y2="{H-58}" stroke="{RULE}" stroke-width="1.2" stroke-dasharray="5 5"/>'
    b += T(48, H - 24, 'Eight research streams fed four themes, and each theme became a station in the co-design workshop.', size=19, fill=MUTED)
    write('direct-quote/research/evidence-map.svg', svg(W, H, b, fonts(display=True), 'Research and evidence map: eight research streams, four themes, one co-design workshop'))


# ── Placeholder: the site's dither placeholder ────────────────────────────────
def placeholder():
    W, H = 800, 500
    body = (f'<defs><pattern id="d" width="4" height="4" patternUnits="userSpaceOnUse">'
            f'<rect width="4" height="4" fill="#E9E9E9"/><rect width="2" height="2" fill="#C9C9C9"/>'
            f'<rect x="2" y="2" width="2" height="2" fill="#C9C9C9"/></pattern></defs>'
            f'<rect width="{W}" height="{H}" fill="url(#d)"/>')
    body += chip(W / 2, H / 2 - 20, '[ image coming soon ]', size=20, h=40, anchor='middle')
    write('placeholder.svg', svg(W, H, body, fonts(text=()), 'Image coming soon'))


# ── About: a pixel-art portrait for the headshot frame ───────────────────────
# Drawn like the device sprites (ink outline, greys, one tangerine accent) so it
# reads as part of the site rather than a stand-in. The pencil behind the ear is
# the "scribbling down ideas" from the About intro.
def pfp():
    GW, GH, PX = 32, 40, 8
    grid = [['.'] * GW for _ in range(GH)]
    fig = set()

    def put(x, y, c, figure=True):
        if 0 <= x < GW and 0 <= y < GH:
            grid[y][x] = c
            if figure:
                fig.add((x, y))

    def ell(x, y, cx, cy, rx, ry):
        return ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1

    # Backdrop: a tangerine disc behind the head.
    for y in range(GH):
        for x in range(GW):
            if ell(x, y, 16, 18, 13, 13):
                put(x, y, 'b', figure=False)
    # Pencil first, so the head and hair overlap its end: it reads as tucked
    # behind the ear. Two pixels thick, tangerine body, grey eraser.
    for i in range(7):
        x, y = 22 + i, 13 - i
        put(x, y, 't'); put(x + 1, y, 't')
    put(29, 6, 'r'); put(30, 6, 'r'); put(30, 5, 'r')
    # Shoulders and shirt.
    for y in range(28, GH):
        w = min(15, 5 + (y - 28) * 1.7)
        for x in range(int(16 - w), int(16 + w)):
            put(x, y, 'o')
    # Neck, running down into a small V at the collar.
    for y in range(24, 29):
        for x in range(14, 18):
            put(x, y, 'S')
    for (x, y) in [(15, 29), (16, 29), (15, 30), (16, 30)]:
        put(x, y, 'S')
    for (x, y) in [(14, 28), (17, 28), (14, 29), (17, 29)]:
        put(x, y, 'c')
    # Ears.
    for y in (16, 17, 18, 19):
        put(8, y, 'S'); put(23, y, 'S')
    # Head.
    for y in range(GH):
        for x in range(GW):
            if ell(x, y, 16, 17, 7, 8.5):
                put(x, y, 's')
    # Hair: a rounded cap one pixel proud of the head, short at the sides,
    # with a fringe sweeping across the left of the forehead.
    for y in range(GH):
        for x in range(GW):
            if ell(x, y, 16, 16.5, 8, 9.5) and (y <= 11 or (y <= 14 and (x <= 9 or x >= 22))):
                put(x, y, 'H')
    for (x, y) in [(10, 12), (11, 12), (12, 12), (13, 12), (10, 13), (11, 13)]:
        put(x, y, 'H')
    # Face: brows, eyes and a small smile.
    for (x, y) in [(11, 15), (12, 15), (19, 15), (20, 15),
                   (12, 17), (12, 18), (19, 17), (19, 18),
                   (14, 21), (15, 22), (16, 22), (17, 21)]:
        grid[y][x] = 'e'
    # Ink outline round everything that isn't backdrop, like the device sprites.
    for (x, y) in list(fig):
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < GW and 0 <= ny < GH and (nx, ny) not in fig:
                grid[ny][nx] = '#'

    cols = {'b': TANG, 'o': GMID, 'c': CHI, 'S': '#B8B8B8', 's': GLIGHT, 'H': GDARK,
            'e': GDARK, '#': GDARK, 't': TANG, 'r': '#B0B0B0'}
    rects = []
    for y, row in enumerate(grid):
        x = 0
        while x < GW:
            c = row[x]
            end = x + 1
            while end < GW and row[end] == c:
                end += 1
            if c in cols:
                rects.append(f'<rect x="{x*PX}" y="{y*PX}" width="{(end-x)*PX}" height="{PX}" fill="{cols[c]}"/>')
            x = end
    W, H = GW * PX, GH * PX
    body = f'<rect width="{W}" height="{H}" fill="{PANEL}"/>' + ''.join(rects)
    content = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" '
               f'shape-rendering="crispEdges" role="img"><title>Pixel-art portrait of Nirmal</title>{body}</svg>')
    os.makedirs(os.path.join(OUT, 'about'), exist_ok=True)
    write('about/pfp.svg', content)


if __name__ == '__main__':
    perro_dropoff()
    perro_before_after()
    counselling_admin()
    pixel_avatar('counselling/persona-solo.svg', SOLO, 'A counsellor working alone at a desk')
    pixel_avatar('counselling/persona-institution.svg', TEAM, 'Counsellors working together in an institution')
    evidence_map()
    placeholder()
    pfp()
