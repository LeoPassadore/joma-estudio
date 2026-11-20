"""Borra la bajada de texto bajo el isotipo del monitor, frame a frame.

Veo genero el logo de JOMA en la pantalla del estudio: el isotipo (JE) quedo
bien dibujado y se conserva, pero la bajada de texto es garabato ilegible (no
son letras reales, por eso espejar el video no lo arregla).

Dos decisiones que importan:

1. Se detecta con umbral ALTO (215). El logo tiene un glow suave alrededor; con
   umbral bajo el glow se pega al isotipo, corre su base hacia abajo y el
   borrado termina cayendo fuera de lugar.
2. El fondo del monitor es un degrade liso, asi que el area se RECONSTRUYE
   tomando, fila por fila, la mediana de los pixeles de esa misma fila a los
   costados del logo. Sin blur: difuminar dejaba un halo sucio y se comia el
   borde inferior del isotipo.

Uso: python clean-monitor-text.py <directorio-de-frames>
"""
import sys
from pathlib import Path
from statistics import median

from PIL import Image

REF_W = 1280
# Solo blanco casi puro: evita que el glow del logo corra la deteccion.
BRIGHT = 215
MIN_ISO_H = 18
MAX_TEXT_H = 14
MAX_GAP = 16


def _row_groups(g, x0, x1, y0, y1):
    on = []
    for y in range(y0, y1):
        c = sum(1 for x in range(x0, x1) if g[x, y] > BRIGHT)
        if c > 3:
            on.append(y)
    if not on:
        return []
    groups, cur = [], [on[0]]
    for y in on[1:]:
        if y - cur[-1] <= 2:
            cur.append(y)
        else:
            groups.append(cur)
            cur = [y]
    groups.append(cur)
    return groups


def locate_text(im):
    """bbox de la bajada de texto: banda fina justo debajo del isotipo."""
    w, h = im.size
    s = w / REF_W
    x0, x1 = int(380 * s), min(w, int(1010 * s))
    y0, y1 = int(240 * s), min(h, int(600 * s))
    g = im.convert("L").load()

    groups = _row_groups(g, x0, x1, y0, y1)
    if not groups:
        return None
    iso = max(groups, key=len)
    if len(iso) < MIN_ISO_H * s:
        return None

    for grp in groups:
        if grp[0] <= iso[-1]:
            continue
        if (grp[0] - iso[-1]) > MAX_GAP * s:
            continue
        if len(grp) > MAX_TEXT_H * s:
            continue
        xs = [x for y in grp for x in range(x0, x1) if g[x, y] > BRIGHT]
        if not xs:
            continue
        return (min(xs), grp[0], max(xs), grp[-1], iso[-1])
    return None


def clean(path):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    s = w / REF_W
    found = locate_text(im)
    if found is None:
        return False
    tx0, ty0, tx1, ty1, iso_bottom = found

    # Margen generoso a los lados y abajo (el texto tiene su propio glow),
    # pero arriba se frena antes del isotipo para no tocar su borde.
    padx = round(12 * s)
    x_from = max(0, tx0 - padx)
    x_to = min(w - 1, tx1 + padx)
    y_from = max(min(h - 1, iso_bottom + 2), ty0 - round(4 * s))
    y_to = min(h - 1, ty1 + round(5 * s))

    px = im.load()
    sw = max(10, round(30 * s))
    for y in range(y_from, y_to + 1):
        samples = []
        if x_from > 0:
            samples += [px[x, y] for x in range(max(0, x_from - sw), x_from)]
        samples += [px[x, y] for x in range(x_to + 1, min(w, x_to + 1 + sw))]
        samples = [c for c in samples if sum(c) < 500]  # descartar glow y brillos
        if len(samples) < 4:
            continue
        c = (
            int(median(p[0] for p in samples)),
            int(median(p[1] for p in samples)),
            int(median(p[2] for p in samples)),
        )
        for x in range(x_from, x_to + 1):
            px[x, y] = c

    im.save(path)
    return True


if __name__ == "__main__":
    frames = sorted(Path(sys.argv[1]).glob("frame-*.png"))
    done = sum(clean(f) for f in frames)
    print(f"    texto borrado en {done}/{len(frames)} frames")
