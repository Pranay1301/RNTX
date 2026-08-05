#!/bin/zsh
set -euo pipefail

ROOT="/Users/pranay/Documents/RNTX"
CAP="$ROOT/output/video/rntx-website-reel/captures"
WORK="$ROOT/output/video/rntx-website-reel/work"
OUT="$ROOT/output/video/rntx-website-reel"
MUSIC="$OUT/audio/KDH_x_Tatsunoshin_-_Fly_High_NCS.mp3"

mkdir -p "$WORK"

render_clip() {
  local source="$1"
  local speed="$2"
  local output="$3"
  if [[ -s "$output" ]]; then
    return
  fi
  ffmpeg -hide_banner -loglevel error -y \
    -framerate 8 -i "$source/frame-%04d.jpg" \
    -vf "setpts=${speed}*PTS,minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,scale=1080:1920:flags=lanczos,unsharp=5:5:0.28:3:3:0.12,eq=contrast=1.035:saturation=1.04,vignette=PI/7" \
    -an -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$output"
}

render_clip "$CAP/01-loader" 0.48 "$WORK/01-loader.mp4"
render_clip "$CAP/02-hero" 0.64 "$WORK/02-hero.mp4"
render_clip "$CAP/03-home-scroll" 0.50 "$WORK/03-home-scroll.mp4"
render_clip "$CAP/04-teams" 0.50 "$WORK/04-teams.mp4"
render_clip "$CAP/05-achievements" 0.52 "$WORK/05-achievements.mp4"
render_clip "$CAP/06-shop" 0.50 "$WORK/06-shop.mp4"

ffmpeg -hide_banner -loglevel error -y \
  -i "$WORK/01-loader.mp4" \
  -i "$WORK/02-hero.mp4" \
  -i "$WORK/03-home-scroll.mp4" \
  -i "$WORK/04-teams.mp4" \
  -i "$WORK/05-achievements.mp4" \
  -i "$WORK/06-shop.mp4" \
  -ss 36 -t 29 -i "$MUSIC" \
  -filter_complex "
    [0:v][1:v]xfade=transition=fadefast:duration=0.28:offset=2.486[v01];
    [v01][2:v]xfade=transition=diagtl:duration=0.28:offset=5.473[v02];
    [v02][3:v]xfade=transition=radial:duration=0.28:offset=11.093[v03];
    [v03][4:v]xfade=transition=smoothup:duration=0.28:offset=16.580[v04];
    [v04][5:v]xfade=transition=diagbr:duration=0.28:offset=21.833,
    drawbox=x='mod(t*520,1400)-260':y=0:w=84:h=1920:color=0xf2c861@0.045:t=fill,
    fade=t=in:st=0:d=0.12,fade=t=out:st=27.18:d=0.55[v];
    [6:a]afade=t=in:st=0:d=0.18,afade=t=out:st=27.18:d=0.55,volume=0.90[a]
  " \
  -map "[v]" -map "[a]" -t 27.73 \
  -c:v libx264 -preset slow -crf 16 -profile:v high -level 4.1 -pix_fmt yuv420p \
  -c:a aac -b:a 256k -ar 48000 -movflags +faststart \
  "$OUT/RNTX_Website_Experience_Reel.mp4"

ffmpeg -hide_banner -loglevel error -y -ss 4.3 \
  -i "$OUT/RNTX_Website_Experience_Reel.mp4" -frames:v 1 -update 1 \
  "$OUT/RNTX_Website_Reel_Cover.jpg"

ffmpeg -hide_banner -loglevel error -y \
  -i "$OUT/RNTX_Website_Experience_Reel.mp4" \
  -vf "fps=1/3,scale=216:384,tile=5x2" -frames:v 1 -update 1 \
  "$OUT/RNTX_Website_Reel_Contact_Sheet.jpg"

echo "$OUT/RNTX_Website_Experience_Reel.mp4"
