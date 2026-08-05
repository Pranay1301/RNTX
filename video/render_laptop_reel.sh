#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="/Users/pranay/Documents/RNTX"
OUT_DIR="$ROOT_DIR/output/video/rntx-laptop-reel"
WORK_DIR="$OUT_DIR/work"
PAGES_DIR="$OUT_DIR/pages"
STAGE="$OUT_DIR/stage/rntx-laptop-studio.png"
MUSIC="$ROOT_DIR/output/video/rntx-website-reel/audio/KDH_x_Tatsunoshin_-_Fly_High_NCS.mp3"
FINAL="$OUT_DIR/RNTX_Laptop_Website_Showcase.mp4"

mkdir -p "$WORK_DIR"

SCENES=(
  home-hero
  home-merger
  home-roster
  home-trophies
  teams-hero
  teams-grid
  achievements-hero
  achievements-list
  shop-hero
  shop-products
)

for scene_index in "${!SCENES[@]}"; do
  scene_name="${SCENES[$scene_index]}"
  scene_video="$WORK_DIR/screen-$(printf '%02d' $((scene_index + 1))).mp4"
  if [[ -s "$scene_video" ]]; then
    continue
  fi
  direction=$((scene_index % 3))
  case "$direction" in
    0) pan_x="iw/2-(iw/zoom/2)-10*(1-on/84)"; pan_y="ih/2-(ih/zoom/2)" ;;
    1) pan_x="iw/2-(iw/zoom/2)+10*(1-on/84)"; pan_y="ih/2-(ih/zoom/2)-6*(1-on/84)" ;;
    *) pan_x="iw/2-(iw/zoom/2)"; pan_y="ih/2-(ih/zoom/2)+8*(1-on/84)" ;;
  esac
  ffmpeg -hide_banner -loglevel error -loop 1 -t 2.8 -i "$PAGES_DIR/$scene_name.jpg" \
    -vf "scale=900:633:force_original_aspect_ratio=increase,crop=900:633,zoompan=z='min(zoom+0.00022,1.018)':x='$pan_x':y='$pan_y':d=84:s=782x550:fps=30,format=yuv420p" \
    -an -c:v libx264 -preset medium -crf 16 -r 30 -pix_fmt yuv420p \
    "$scene_video" -y
done

if [[ ! -s "$WORK_DIR/screen-master.mp4" ]]; then
ffmpeg -hide_banner -loglevel error \
  -i "$WORK_DIR/screen-01.mp4" -i "$WORK_DIR/screen-02.mp4" \
  -i "$WORK_DIR/screen-03.mp4" -i "$WORK_DIR/screen-04.mp4" \
  -i "$WORK_DIR/screen-05.mp4" -i "$WORK_DIR/screen-06.mp4" \
  -i "$WORK_DIR/screen-07.mp4" -i "$WORK_DIR/screen-08.mp4" \
  -i "$WORK_DIR/screen-09.mp4" -i "$WORK_DIR/screen-10.mp4" \
  -filter_complex \
  "[0:v][1:v]xfade=transition=fadefast:duration=0.45:offset=2.35[x1];
   [x1][2:v]xfade=transition=smoothleft:duration=0.45:offset=4.70[x2];
   [x2][3:v]xfade=transition=fade:duration=0.45:offset=7.05[x3];
   [x3][4:v]xfade=transition=diagtl:duration=0.45:offset=9.40[x4];
   [x4][5:v]xfade=transition=smoothup:duration=0.45:offset=11.75[x5];
   [x5][6:v]xfade=transition=fadefast:duration=0.45:offset=14.10[x6];
   [x6][7:v]xfade=transition=diagbr:duration=0.45:offset=16.45[x7];
   [x7][8:v]xfade=transition=radial:duration=0.45:offset=18.80[x8];
   [x8][9:v]xfade=transition=smoothleft:duration=0.45:offset=21.15,format=yuv420p[screen]" \
  -map "[screen]" -an -c:v libx264 -preset medium -crf 16 -r 30 -pix_fmt yuv420p \
  "$WORK_DIR/screen-master.mp4" -y
fi

ffmpeg -hide_banner -loglevel error \
  -loop 1 -t 23.95 -i "$STAGE" \
  -i "$WORK_DIR/screen-master.mp4" \
  -loop 1 -t 23.95 -i "$ROOT_DIR/site/public/assets/rntx-crest-2026.webp" \
  -loop 1 -t 23.95 -i "$ROOT_DIR/site/public/assets/people/ninjajod.png" \
  -loop 1 -t 23.95 -i "$ROOT_DIR/site/public/assets/naruto-tee-front.webp" \
  -ss 36 -t 23.95 -i "$MUSIC" \
  -filter_complex \
  "[0:v]scale=1080:1920,format=rgba[stage];
   [1:v]scale=782:550,eq=contrast=1.025:saturation=1.04,format=rgba[site];
   [stage][site]overlay=x=149:y=599:format=auto[device];
   [2:v]split=2[crestmarksrc][crestdropsrc];
   [crestmarksrc]scale=108:-1,format=rgba,colorchannelmixer=aa=0.92[crestmark];
   [device][crestmark]overlay=x='(W-w)/2':y=184[marked];
   [crestdropsrc]scale=190:-1,format=rgba,rotate='0.24*sin(1.2*t)':ow=rotw(iw):oh=roth(ih):c=none,setpts=PTS-STARTPTS[crest];
   [marked][crest]overlay=x='880-45*(t-1.3)':y='-300+390*(t-1.3)':enable='between(t,1.3,6.6)'[withcrest];
   [3:v]scale=230:-1,format=rgba,rotate='-0.16+0.06*sin(1.7*t)':ow=rotw(iw):oh=roth(ih):c=none,setpts=PTS-STARTPTS[player];
   [withcrest][player]overlay=x='-240+70*(t-8.1)':y='-260+245*(t-8.1)':enable='between(t,8.1,14.0)'[withplayer];
   [4:v]scale=270:-1,format=rgba,rotate='0.19-0.05*sin(1.4*t)':ow=rotw(iw):oh=roth(ih):c=none,setpts=PTS-STARTPTS[tee];
   [withplayer][tee]overlay=x='760-62*(t-17.4)':y='-420+260*(t-17.4)':enable='between(t,17.4,23.8)'[objects];
   color=c=#f2c861@0.72:s=22x150:d=23.95,format=rgba,rotate='0.32+0.5*t':ow=rotw(iw):oh=roth(ih):c=none[shard1];
   color=c=#8c5ee8@0.68:s=18x110:d=23.95,format=rgba,rotate='-0.4-0.36*t':ow=rotw(iw):oh=roth(ih):c=none[shard2];
   [objects][shard1]overlay=x='90+14*t':y='-180+95*t':enable='between(t,3.2,18.5)'[s1];
   [s1][shard2]overlay=x='950-18*t':y='-150+105*t':enable='between(t,5.4,17.6)'[s2];
   [s2]vignette=PI/5:mode=forward,format=yuv420p[video];
   [5:a]afade=t=in:st=0:d=0.35,afade=t=out:st=22.9:d=1.05,volume=0.88,alimiter=limit=0.94[audio]" \
  -map "[video]" -map "[audio]" -t 23.95 \
  -c:v libx264 -preset slow -crf 17 -profile:v high -level 4.2 -pix_fmt yuv420p -r 30 \
  -c:a aac -b:a 256k -ar 48000 -movflags +faststart "$FINAL" -y

ffmpeg -hide_banner -loglevel error -ss 9.4 -i "$FINAL" -frames:v 1 -q:v 2 "$OUT_DIR/RNTX_Laptop_Reel_Cover.jpg" -y

printf '%s\n' "$FINAL"
