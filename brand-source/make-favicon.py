#!/usr/bin/env python3
"""
Regenerate the favicon set.

    python3 brand-source/make-favicon.py

The favicon is NOT the full logo. At 16px — the size Google renders in search
results and the size a browser tab uses — the logo's rim lettering disappears
and the two figures collapse into a grey blob. This mark is built to survive
that size instead: "N&V" over a key, on the brand navy.

Two details that matter and are easy to lose:
  • The letters carry manual tracking. Without it the N and the & merge at
    16px and the mark reads as "H&V".
  • Sizes are multiples of 48 (48/96/144/192) because Google documents that
    requirement. 16 and 32 alone do not qualify.
"""
from PIL import Image, ImageDraw, ImageFont
import pathlib

DEEP = (16, 35, 48)      # --color-navy-950
BRASS = (242, 174, 57)   # --color-brass-400
WHITE = (255, 255, 255)
FONT = '/System/Library/Fonts/Supplemental/Arial Black.ttf'
S = 512
TEXT, TRACKING = 'N&V', 8
OUT = pathlib.Path(__file__).resolve().parent.parent / 'public'


def _fit(text, w, h, tracking):
    d = ImageDraw.Draw(Image.new('RGB', (10, 10)))
    lo, hi = 8, 600
    while lo < hi:
        m = (lo + hi + 1) // 2
        f = ImageFont.truetype(FONT, m)
        wid = sum(d.textlength(c, font=f) for c in text) + tracking * m / 100 * (len(text) - 1)
        b = d.textbbox((0, 0), text, font=f)
        if wid <= w and (b[3] - b[1]) <= h:
            lo = m
        else:
            hi = m - 1
    return ImageFont.truetype(FONT, lo)


def _tracked(im, text, font, fill, cy, tracking):
    d = ImageDraw.Draw(im)
    sp = tracking * font.size / 100
    widths = [d.textlength(c, font=font) for c in text]
    total = sum(widths) + sp * (len(text) - 1)
    b = d.textbbox((0, 0), text, font=font)
    x = (im.width - total) / 2
    for c, w in zip(text, widths):
        d.text((x, cy - (b[3] - b[1]) / 2 - b[1]), c, font=font, fill=fill)
        x += w + sp


def _key(d, cy, color, scale=1.14):
    bw = int(S * 0.125 * scale)
    cx = int(S * 0.285)
    d.ellipse([cx - bw, cy - bw, cx + bw, cy + bw], outline=color, width=int(S * 0.072 * scale))
    sh = int(S * 0.072 * scale)
    d.rectangle([cx + bw - int(S * 0.015), cy - sh // 2, int(S * 0.815), cy + sh // 2], fill=color)
    tw, th = int(S * 0.05 * scale), int(S * 0.105 * scale)
    d.rectangle([int(S * 0.585), cy, int(S * 0.585) + tw, cy + th], fill=color)
    d.rectangle([int(S * 0.695), cy, int(S * 0.695) + tw, cy + th], fill=color)


def build():
    im = Image.new('RGB', (S, S), DEEP)
    d = ImageDraw.Draw(im)
    f = _fit(TEXT, int(S * 0.90), int(S * 0.40), TRACKING)
    _tracked(im, TEXT, f, WHITE, int(S * 0.29), TRACKING)
    _key(d, int(S * 0.70), BRASS)
    return im


if __name__ == '__main__':
    master = build()
    master.save(pathlib.Path(__file__).parent / 'favicon-master.png')
    for size in (16, 32, 48, 96, 144, 192):
        master.resize((size, size), Image.LANCZOS).save(
            OUT / f'favicon-{size}x{size}.png', optimize=True)
    master.resize((180, 180), Image.LANCZOS).save(OUT / 'apple-touch-icon.png', optimize=True)
    master.resize((64, 64), Image.LANCZOS).save(
        OUT / 'favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print('favicons written to public/')
