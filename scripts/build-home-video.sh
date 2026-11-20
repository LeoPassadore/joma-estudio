#!/usr/bin/env bash
# Genera el video de fondo del home (v3) a partir del clip fuente de Veo.
#
# Reemplaza a build-home-frames.sh: en v3 el home ya no es scroll cuadro por
# cuadro sino un <video> de fondo en loop. Reusa las mismas dos limpiezas,
# ya validadas sobre este material (wiki/tecnico/scroll-frames.md):
#   1. crop  — saca la marca de agua de Gemini (esquina inferior derecha).
#   2. clean — borra la bajada de texto alucinado bajo el isotipo del monitor.
#
# Loop ida y vuelta: el clip es un travelling de camara de 10 s; si vuelve al
# primer cuadro se nota el salto. Se encadena el clip hacia adelante y despues
# en reversa (sin repetir los extremos), asi el loop es continuo.
#
# Resolucion: la fuente es 1280x720. Esa es la calidad maxima REAL del
# material; reescalar a 1080p/4K con lanczos no agrega detalle (el navegador
# ya escala igual). Se codifica a 1280x720 con bitrate alto, sin perdidas
# visibles respecto de la fuente. Para mas resolucion haria falta un
# upscaler con IA sobre la fuente.
#
# Salidas (public/video/):
#   home-1280.av1.mp4   AV1  — mejor calidad por byte (Chrome, Firefox, Safari 17+ con HW)
#   home-1280.h264.mp4  H.264 — compatibilidad universal (fallback)
#   home-720.h264.mp4   H.264 liviano para celulares
#   home-poster.webp    primer cuadro, se ve mientras carga el video
set -euo pipefail

SRC="${1:-assets-fuente/home-video-fuente.mp4}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CLEAN="$ROOT/scripts/clean-monitor-text.py"
OUT="$ROOT/public/video"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT" "$TMP/fwd" "$TMP/loop"

echo "==> extrayendo cuadros (24 fps nativos, sin marca de agua)"
ffmpeg -v error -y -i "$SRC" \
  -vf "crop=1130:636:0:0,scale=1280:720:flags=lanczos" \
  "$TMP/fwd/frame-%04d.png"

echo "==> limpiando texto del monitor"
python "$CLEAN" "$TMP/fwd"

echo "==> armando loop ida y vuelta"
mapfile -t FR < <(ls "$TMP/fwd"/frame-*.png | sort)
n=0
for f in "${FR[@]}"; do n=$((n+1)); cp "$f" "$TMP/loop/l-$(printf %04d $n).png"; done
for ((i=${#FR[@]}-2; i>=1; i--)); do n=$((n+1)); cp "${FR[$i]}" "$TMP/loop/l-$(printf %04d $n).png"; done
echo "    $n cuadros"

IN=(-framerate 24 -i "$TMP/loop/l-%04d.png")

echo "==> AV1 1280"
ffmpeg -v error -y "${IN[@]}" -c:v libsvtav1 -preset 4 -crf 24 -g 48 \
  -pix_fmt yuv420p -svtav1-params tune=0 -an -movflags +faststart \
  "$OUT/home-1280.av1.mp4"

echo "==> H.264 1280"
ffmpeg -v error -y "${IN[@]}" -c:v libx264 -preset slow -crf 18 \
  -tune film -profile:v high -pix_fmt yuv420p -g 48 -an -movflags +faststart \
  "$OUT/home-1280.h264.mp4"

echo "==> H.264 720 (mobile)"
ffmpeg -v error -y "${IN[@]}" -vf "scale=854:480:flags=lanczos" -c:v libx264 \
  -preset slow -crf 22 -tune film -profile:v high -pix_fmt yuv420p -g 48 \
  -an -movflags +faststart "$OUT/home-720.h264.mp4"

echo "==> poster"
ffmpeg -v error -y -i "${FR[0]}" -quality 80 "$OUT/home-poster.webp"

ls -la "$OUT"
