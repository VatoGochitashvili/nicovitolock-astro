#!/usr/bin/env python3
"""
Regenerate the favicon set.

    python3 brand-source/make-favicon.py

The favicon is the two brothers from the logo, without the rim lettering:
at 16px that text is unreadable noise, so the mark is cut from inside the
logo's inner circle and zoomed to the faces, which still read at tab size.
It sits on a white disc with a brass ring so it holds up on light and dark
tab strips alike.

  • The crop is the intersection of the logo's inner circle and a circle
    around the faces, so no letter of "NICO & VITO" can creep into the edge.
  • apple-touch-icon is opaque (navy square): iOS fills transparency with black.
  • Sizes are multiples of 48 (48/96/144/192) because Google documents that
    requirement. 16 and 32 alone do not qualify.
"""
from PIL import Image, ImageDraw, ImageChops
import pathlib

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parent / 'public'
DEEP = (16, 35, 48, 255)      # --color-navy-950
BRASS = (242, 174, 57, 255)   # --color-brass-400
WHITE = (255, 255, 255, 255)
S = 1024

# Logo geometry (brand-source/logo-original.png, 1024px)
INNER = (512, 520, 298)   # the circle inside the lettering
FACES = (505, 440, 250)   # crop circle around both faces


def _disc(size, cx, cy, r):
    m = Image.new('L', size, 0)
    ImageDraw.Draw(m).ellipse((cx - r, cy - r, cx + r, cy + r), fill=255)
    return m


def build(bg=(0, 0, 0, 0)):
    src = Image.open(HERE / 'logo-original.png').convert('RGBA')
    mask = ImageChops.multiply(_disc(src.size, *INNER), _disc(src.size, *FACES))
    piece = Image.new('RGBA', src.size, (0, 0, 0, 0))
    piece.paste(src, (0, 0), mask)
    cx, cy, r = FACES
    piece = piece.crop((cx - r, cy - r, cx + r, cy + r))

    im = Image.new('RGBA', (S, S), bg)
    d = ImageDraw.Draw(im)
    ring, pad = 44, 44
    d.ellipse((0, 0, S - 1, S - 1), fill=BRASS)
    d.ellipse((ring, ring, S - ring, S - ring), fill=WHITE)
    inner = S - 2 * pad
    im.alpha_composite(piece.resize((inner, inner), Image.LANCZOS), (pad, pad))
    return im


if __name__ == '__main__':
    master = build()
    master.save(HERE / 'favicon-master.png')
    for size in (16, 32, 48, 96, 144, 192):
        master.resize((size, size), Image.LANCZOS).save(
            OUT / f'favicon-{size}x{size}.png', optimize=True)
    touch = Image.new('RGBA', (S, S), DEEP)
    touch.alpha_composite(build().resize((int(S * 0.86),) * 2, Image.LANCZOS), (int(S * 0.07),) * 2)
    touch.convert('RGB').resize((180, 180), Image.LANCZOS).save(OUT / 'apple-touch-icon.png', optimize=True)
    master.resize((64, 64), Image.LANCZOS).save(
        OUT / 'favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print('favicons written to public/')
