#!/usr/bin/env python3
"""Render a cinematic 9:16 Revenant XSpark concept reel.

All motion, compositing and sound design are generated locally from the RNTX
website assets. The final mux/upscale step is handled by ffmpeg.
"""

from __future__ import annotations

import math
import subprocess
import wave
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "site" / "public" / "assets"
CAPTURES = ROOT / "output" / "video" / "rntx-reel" / "captures"
OUT = ROOT / "output" / "video" / "rntx-reel"
WORK = OUT / "work"
W, H, FPS, DURATION = 720, 1280, 30, 30.0

PURPLE = (35, 8, 69)
PURPLE_2 = (68, 18, 114)
GOLD = (255, 199, 62)
PALE = (255, 241, 199)
WHITE = (250, 247, 255)
INK = (12, 5, 25)

FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_NARROW = "/System/Library/Fonts/Supplemental/Arial Narrow Bold.ttf"
FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"


def clamp(v, a=0.0, b=1.0):
    return max(a, min(b, v))


def ease(v):
    v = clamp(v)
    return v * v * (3 - 2 * v)


def out_cubic(v):
    return 1 - (1 - clamp(v)) ** 3


def pulse(v):
    return math.sin(clamp(v) * math.pi)


def font(size, narrow=True):
    return ImageFont.truetype(FONT_NARROW if narrow else FONT_BOLD, size)


def load(name):
    return Image.open(ASSETS / name).convert("RGBA")


def cover(im, size, zoom=1.0, pan=(0.5, 0.5)):
    tw, th = size
    scale = max(tw / im.width, th / im.height) * zoom
    resized = im.resize((int(im.width * scale), int(im.height * scale)), Image.Resampling.LANCZOS)
    max_x, max_y = max(0, resized.width - tw), max(0, resized.height - th)
    x = int(max_x * clamp(pan[0]))
    y = int(max_y * clamp(pan[1]))
    return resized.crop((x, y, x + tw, y + th))


def contain(im, box):
    bw, bh = box
    scale = min(bw / im.width, bh / im.height)
    return im.resize((max(1, int(im.width * scale)), max(1, int(im.height * scale))), Image.Resampling.LANCZOS)


def gradient_bg(top=PURPLE, bottom=INK):
    a = np.zeros((H, W, 4), dtype=np.uint8)
    for y in range(H):
        q = y / max(1, H - 1)
        a[y, :, :3] = [int(top[i] * (1 - q) + bottom[i] * q) for i in range(3)]
        a[y, :, 3] = 255
    return Image.fromarray(a, "RGBA")


def glow(img, xy, radius, color, alpha=170):
    layer = Image.new("RGBA", img.size)
    d = ImageDraw.Draw(layer)
    x, y = xy
    d.ellipse((x-radius, y-radius, x+radius, y+radius), fill=(*color, alpha))
    layer = layer.filter(ImageFilter.GaussianBlur(radius * 0.75))
    img.alpha_composite(layer)


def tracked(draw, xy, text, fnt, fill, spacing=4, anchor="la", stroke=0):
    x, y = xy
    widths = [draw.textlength(c, font=fnt) for c in text]
    total = sum(widths) + max(0, len(text)-1) * spacing
    if anchor.startswith("m"):
        x -= total / 2
    elif anchor.startswith("r"):
        x -= total
    for c, cw in zip(text, widths):
        draw.text((x, y), c, font=fnt, fill=fill, anchor="la", stroke_width=stroke, stroke_fill=(0,0,0,160))
        x += cw + spacing


def centered(draw, y, text, size, fill=WHITE, spacing=2, narrow=True):
    tracked(draw, (W/2, y), text, font(size, narrow), fill, spacing, "ma")


def scanlines(img, opacity=18):
    d = ImageDraw.Draw(img, "RGBA")
    for y in range(0, H, 5):
        d.line((0, y, W, y), fill=(255,255,255,opacity), width=1)


def particles(img, t, amount=24):
    d = ImageDraw.Draw(img, "RGBA")
    rng = np.random.default_rng(1717)
    for _ in range(amount):
        x0, y0, r, speed, phase = rng.random(5)
        x = (x0 * W + math.sin(t * speed * 2 + phase * 6) * 35) % W
        y = (y0 * H - t * (25 + speed * 55)) % H
        a = int(35 + 90 * (0.5 + 0.5 * math.sin(t * 2 + phase * 9)))
        rr = 1 + int(r * 3)
        d.ellipse((x-rr, y-rr, x+rr, y+rr), fill=(*GOLD, a))


def frame_finish(im, t):
    # Subtle anamorphic sweep, vignette and film grain.
    sweep_x = int(((t * 0.17) % 1.4 - 0.2) * W)
    sweep = Image.new("RGBA", im.size)
    sd = ImageDraw.Draw(sweep)
    sd.polygon([(sweep_x-80,0),(sweep_x+15,0),(sweep_x+220,H),(sweep_x+115,H)], fill=(255,215,105,18))
    sweep = sweep.filter(ImageFilter.GaussianBlur(28))
    im.alpha_composite(sweep)
    vig = Image.new("L", (W,H), 0)
    vd = ImageDraw.Draw(vig)
    vd.ellipse((-W*.28,-H*.12,W*1.28,H*1.12), fill=210)
    vig = ImageChops.invert(vig.filter(ImageFilter.GaussianBlur(115)))
    shade = Image.new("RGBA", (W,H), (0,0,0,0)); shade.putalpha(vig.point(lambda p: int(p*.46)))
    im.alpha_composite(shade)
    rng = np.random.default_rng(int(t * FPS) + 9001)
    grain = rng.normal(128, 16, (H//2, W//2)).clip(0,255).astype(np.uint8)
    noise = Image.fromarray(grain, "L").resize((W,H), Image.Resampling.BILINEAR)
    noise_rgba = Image.merge("RGBA", (noise,noise,noise,noise.point(lambda p: 11)))
    im.alpha_composite(noise_rgba)
    return im


CREST = load("rntx-crest-2026.png")
MERGER = load("rntx-merger.jpg")
NINJA = load("people/ninjajod.png")
TRACE = load("people/tracegod.jpg")
GHATAK = load("people/ghatak.png")
BGIS = load("bgis-2024.jpg")
BMPS = load("bmps-2024.jpg")
KAASHVI = load("people/kaashvi.jpg")
SCOUT = load("people/ghatak.png")
TRIGGERED = load("people/triggered-insaan.jpg")
NARUTO = load("naruto-hero.png")
TEE = load("naruto-tee-front.png")
SITE = Image.open(CAPTURES / "01-home.png").convert("RGBA")


def scene_intro(t, dur):
    p = t / dur
    im = gradient_bg((53,10,93), (10,3,24))
    glow(im, (W*.18,H*.27), 270, PURPLE_2, 155)
    glow(im, (W*.85,H*.72), 240, GOLD, 48)
    particles(im, t, 34)
    # A circular alpha mask with a delayed, breathing crest.
    q = out_cubic((p-.08)/.52)
    logo = contain(CREST, (int(410*(.78+.22*q)), int(440*(.78+.22*q))))
    logo = ImageEnhance.Brightness(logo).enhance(.6 + .4*q)
    halo = logo.copy().filter(ImageFilter.GaussianBlur(18))
    halo.putalpha(halo.getchannel("A").point(lambda a: int(a*.34*q)))
    x, y = (W-logo.width)//2, int(285 - 30*(1-q))
    im.alpha_composite(halo, (x,y)); im.alpha_composite(logo, (x,y))
    d = ImageDraw.Draw(im, "RGBA")
    a = int(255*out_cubic((p-.38)/.3))
    centered(d, 792 + int(32*(1-out_cubic((p-.35)/.35))), "REVENANT XSPARK", 58, (*WHITE[:3],a), 3)
    centered(d, 868, "ONE WOLVEN SPARK", 24, (*GOLD,a), 8)
    d.line((150,930,570,930), fill=(*GOLD,int(a*.55)), width=2)
    centered(d, 966, "INDIA'S NEXT ESPORTS ERA", 18, (255,255,255,int(a*.78)), 5)
    return frame_finish(im,t)


def scene_merger(t, dur):
    p = t/dur
    bg = cover(MERGER, (W,H), 1.08 + .08*p, (.48+.05*p,.50))
    bg = ImageEnhance.Contrast(bg).enhance(1.14)
    shade = Image.new("RGBA",(W,H),(18,4,40,110)); bg.alpha_composite(shade)
    # Gold diagonal mask cuts through the merger image.
    d = ImageDraw.Draw(bg,"RGBA")
    cut = int(-260 + out_cubic(p)*1120)
    d.polygon([(cut-90,0),(cut+12,0),(cut-420,H),(cut-520,H)], fill=(*GOLD,115))
    d.polygon([(cut+12,0),(cut+28,0),(cut-400,H),(cut-420,H)], fill=(255,255,255,150))
    yoff = int(65*(1-out_cubic((p-.08)/.3)))
    d.rounded_rectangle((42,700+yoff,678,1065+yoff),30,fill=(15,4,31,205),outline=(*GOLD,120),width=2)
    tracked(d,(80,740+yoff),"TWO LEGACIES",font(22),GOLD,6)
    tracked(d,(80,792+yoff),"ONE",font(84),WHITE,1)
    tracked(d,(80,876+yoff),"WOLVEN SPARK",font(62),GOLD,1)
    d.text((82,966+yoff),"Revenant Esports × Team XSpark",font=font(25,False),fill=PALE)
    d.text((82,1012+yoff),"Built to compete. Designed to lead.",font=font(20,False),fill=(235,224,247))
    return frame_finish(bg,t+3)


def player_card(base, pic, x, y, w, h, label, role, progress, accent=GOLD):
    progress = out_cubic(progress)
    y += int(120*(1-progress))
    card = Image.new("RGBA",(w,h),(18,5,35,235))
    mask = Image.new("L",(w,h),0); ImageDraw.Draw(mask).rounded_rectangle((0,0,w-1,h-1),28,fill=int(255*progress))
    photo = cover(pic,(w,h-122),1.02,(.5,.28))
    photo.alpha_composite(Image.new("RGBA",photo.size,(34,8,60,45)))
    card.alpha_composite(photo,(0,0))
    cd = ImageDraw.Draw(card,"RGBA")
    cd.rectangle((0,h-125,w,h),fill=(15,3,29,245))
    cd.rectangle((0,h-125,8,h),fill=accent)
    cd.text((22,h-108),label,font=font(28),fill=WHITE)
    cd.text((23,h-63),role,font=font(15),fill=accent)
    cd.rounded_rectangle((1,1,w-2,h-2),28,outline=(*accent,150),width=2)
    card.putalpha(ImageChops.multiply(card.getchannel("A"),mask))
    base.alpha_composite(card,(x,y))


def scene_roster(t,dur):
    p=t/dur
    im=gradient_bg((28,5,53),(8,3,20)); particles(im,t+8,18)
    d=ImageDraw.Draw(im,"RGBA")
    tracked(d,(46,85),"ACTIVE BGMI CORE",font(22),GOLD,6)
    tracked(d,(44,126),"THE WOLFPACK",font(64),WHITE,1)
    d.text((46,207),"Captain-led. Reconfigured. Ready.",font=font(21,False),fill=(220,207,234))
    player_card(im,NINJA,38,292,310,670,"NINJAJOD","CAPTAIN",(p-.04)/.28)
    player_card(im,TRACE,372,342,310,620,"TRACEGOD","ASSAULTER",(p-.15)/.28)
    # Fast third-card flash near the bottom, mimicking an editorial stack.
    q=out_cubic((p-.46)/.26)
    thumb=cover(GHATAK,(600,170),1.25,(.5,.2)); thumb.putalpha(int(255*q))
    im.alpha_composite(thumb,(60,1005+int(90*(1-q))))
    d=ImageDraw.Draw(im,"RGBA")
    d.rounded_rectangle((60,1005,660,1175),20,outline=(*GOLD,int(160*q)),width=2)
    d.rectangle((60,1106,660,1175),fill=(15,3,28,int(238*q)))
    d.text((85,1120),"+ PAIN09  •  PROTON  •  SUKUNA",font=font(21),fill=(*WHITE,int(255*q)))
    return frame_finish(im,t+7)


def achievement_panel(img, source, box, title, kicker, slide):
    x,y,w,h=box
    panel=cover(source,(w,h),1.08,(.5,.46))
    panel=ImageEnhance.Contrast(panel).enhance(1.1)
    shade=Image.new("RGBA",(w,h),(17,4,30,65)); panel.alpha_composite(shade)
    pd=ImageDraw.Draw(panel,"RGBA")
    pd.rectangle((0,h-180,w,h),fill=(10,2,22,215))
    pd.text((26,h-154),kicker,font=font(17),fill=GOLD)
    pd.text((24,h-111),title,font=font(46),fill=WHITE)
    pd.text((27,h-52),"CHAMPIONS",font=font(19),fill=PALE)
    mask=Image.new("L",(w,h),0); md=ImageDraw.Draw(mask)
    md.polygon([(0,0),(int(w*slide),0),(int(w*slide)-120,h),(0,h)],fill=255)
    panel.putalpha(ImageChops.multiply(panel.getchannel("A"),mask))
    img.alpha_composite(panel,(x,y))


def scene_wins(t,dur):
    p=t/dur; im=gradient_bg((46,9,76),(10,3,24)); d=ImageDraw.Draw(im,"RGBA")
    tracked(d,(46,76),"THE GOLDEN RUN",font(22),GOLD,7)
    tracked(d,(44,120),"INDIA. 2024.",font(70),WHITE,1)
    d.text((48,210),"Two national crowns. One defining season.",font=font(21,False),fill=(230,218,240))
    achievement_panel(im,BGIS,(36,290,648,390),"BGIS 2024","01 / BATTLEGROUNDS INDIA SERIES",out_cubic((p-.04)/.34))
    achievement_panel(im,BMPS,(36,710,648,390),"BMPS 2024","02 / PRO SERIES",out_cubic((p-.18)/.34))
    q=out_cubic((p-.54)/.3)
    d.rounded_rectangle((132,1135,588,1210),37,fill=(*GOLD,int(235*q)))
    d.text((W/2,1174),"BACK-TO-BACK HISTORY",font=font(22),fill=(*INK,int(255*q)),anchor="mm")
    return frame_finish(im,t+12)


def creator_portrait(base,pic,center,r,label,p):
    p=out_cubic(p); size=int(r*2*(.72+.28*p)); photo=cover(pic,(size,size),1.02,(.5,.25))
    mask=Image.new("L",(size,size),0); ImageDraw.Draw(mask).ellipse((3,3,size-3,size-3),fill=int(255*p))
    photo.putalpha(mask)
    x=int(center[0]-size/2); y=int(center[1]-size/2+65*(1-p)); base.alpha_composite(photo,(x,y))
    dd=ImageDraw.Draw(base,"RGBA"); dd.ellipse((x-3,y-3,x+size+3,y+size+3),outline=(*GOLD,int(190*p)),width=4)
    dd.text((center[0],y+size+25),label,font=font(19),fill=(*WHITE,int(255*p)),anchor="ma")


def scene_creators(t,dur):
    p=t/dur; im=gradient_bg((20,5,43),(52,9,83)); glow(im,(W/2,H*.5),330,GOLD,32); particles(im,t+20,26)
    d=ImageDraw.Draw(im,"RGBA")
    tracked(d,(46,78),"BEYOND THE SERVER",font(22),GOLD,6)
    tracked(d,(44,122),"CULTURE MOVES",font(64),WHITE,1)
    tracked(d,(44,190),"WITH PEOPLE",font(64),GOLD,1)
    creator_portrait(im,SCOUT,(188,510),130,"GHATAK",(p-.04)/.28)
    creator_portrait(im,KAASHVI,(532,510),130,"KAASHVI",(p-.14)/.28)
    creator_portrait(im,TRIGGERED,(360,825),145,"TRIGGERED INSAAN",(p-.25)/.28)
    q=out_cubic((p-.55)/.28)
    d.line((100,1060,620,1060),fill=(*GOLD,int(130*q)),width=2)
    centered(d,1095,"PLAYERS  •  CREATORS  •  COMMUNITY",18,(*PALE,int(255*q)),4)
    centered(d,1152,"ONE COLLECTIVE",34,(*WHITE,int(255*q)),3)
    return frame_finish(im,t+16)


def scene_merch(t,dur):
    p=t/dur
    bg=cover(NARUTO,(W,H),1.18+.06*p,(.5,.5)); bg=ImageEnhance.Contrast(bg).enhance(1.1)
    tint=Image.new("RGBA",(W,H),(28,4,48,80)); bg.alpha_composite(tint)
    d=ImageDraw.Draw(bg,"RGBA")
    d.polygon([(0,0),(520,0),(260,H),(0,H)],fill=(25,5,48,190))
    tracked(d,(42,84),"RNTX × NARUTO",font(24),GOLD,7)
    tracked(d,(40,133),"SHINOBI",font(72),WHITE,1)
    tracked(d,(40,206),"SPIRIT.",font(72),GOLD,1)
    d.text((44,302),"Official collaboration",font=font(22,False),fill=PALE)
    q=out_cubic((p-.08)/.42)
    tee=contain(TEE,(430,620)); tee=tee.rotate(-6+8*p,resample=Image.Resampling.BICUBIC,expand=True)
    tee.putalpha(tee.getchannel("A").point(lambda a:int(a*q)))
    glow(bg,(500,710),230,GOLD,44)
    bg.alpha_composite(tee,(int(330+35*(1-q)),420))
    d=ImageDraw.Draw(bg,"RGBA")
    d.rounded_rectangle((42,1015,470,1130),18,fill=(12,3,25,218),outline=(*GOLD,135),width=2)
    d.text((66,1045),"THE VILLAGE, REIMAGINED.",font=font(23),fill=WHITE)
    d.text((66,1087),"Streetwear with competitive DNA.",font=font(17,False),fill=PALE)
    return frame_finish(bg,t+20)


def scene_site(t,dur):
    p=t/dur; im=gradient_bg((44,8,75),(8,2,18)); particles(im,t+25,14)
    d=ImageDraw.Draw(im,"RGBA")
    tracked(d,(45,78),"IMMERSIVE BY DESIGN",font(21),GOLD,6)
    tracked(d,(43,120),"THE DIGITAL",font(61),WHITE,1)
    tracked(d,(43,182),"HOME OF RNTX",font(61),GOLD,1)
    q=out_cubic((p-.05)/.35)
    phone=cover(SITE,(550,710),1.0,(.5,.02))
    phone=ImageEnhance.Contrast(phone).enhance(1.07)
    canvas=Image.new("RGBA",(610,780),(0,0,0,0)); canvas.alpha_composite(phone,(30,32))
    cd=ImageDraw.Draw(canvas,"RGBA"); cd.rounded_rectangle((16,16,594,764),42,outline=(*GOLD,220),width=4)
    canvas=canvas.rotate(-5+7*ease(p),resample=Image.Resampling.BICUBIC,expand=True)
    canvas.putalpha(canvas.getchannel("A").point(lambda a:int(a*q)))
    glow(im,(W*.5,H*.64),290,PURPLE_2,180)
    im.alpha_composite(canvas,(int((W-canvas.width)/2),300+int(110*(1-q))))
    d=ImageDraw.Draw(im,"RGBA")
    centered(d,1120,"SPATIAL STORYTELLING",22,WHITE,5)
    centered(d,1170,"TEAMS  •  TROPHIES  •  CULTURE  •  SHOP",16,GOLD,3)
    return frame_finish(im,t+24)


def scene_cta(t,dur):
    p=t/dur; im=gradient_bg((49,9,84),(9,2,20)); glow(im,(W/2,500),300,GOLD,46); particles(im,t+28,38)
    q=out_cubic((p-.02)/.38); logo=contain(CREST,(330,350)); logo.putalpha(logo.getchannel("A").point(lambda a:int(a*q)))
    im.alpha_composite(logo,((W-logo.width)//2,150+int(70*(1-q))))
    d=ImageDraw.Draw(im,"RGBA")
    a=int(255*out_cubic((p-.18)/.3))
    centered(d,575,"LET'S BUILD",66,(*WHITE,a),2)
    centered(d,647,"THE NEXT ERA",66,(*GOLD,a),2)
    d.line((126,755,594,755),fill=(*GOLD,int(130*q)),width=2)
    centered(d,800,"A DIGITAL EXPERIENCE CONCEPT",18,(*PALE,a),5)
    centered(d,852,"CREATED FOR REVENANT XSPARK",18,(*WHITE,a),4)
    btn=out_cubic((p-.45)/.26)
    d.rounded_rectangle((90,965,630,1055),45,fill=(*GOLD,int(245*btn)))
    d.text((W/2,1010),"EXPLORE THE LIVE DEMO",font=font(24),fill=(*INK,int(255*btn)),anchor="mm")
    centered(d,1095,"rntx-revenant-xspark.rntx.workers.dev",16,(*WHITE,int(225*btn)),1,False)
    centered(d,1195,"CONCEPT BY PRANAY BHARDWAJ",15,(*GOLD,int(210*btn)),4)
    return frame_finish(im,t+27)


SCENES = [
    (3.2, scene_intro), (3.8, scene_merger), (4.5, scene_roster),
    (4.0, scene_wins), (3.5, scene_creators), (4.0, scene_merch),
    (3.2, scene_site), (3.8, scene_cta),
]


def transition(a,b,p,kind):
    p=ease(p)
    mask=Image.new("L",(W,H),0); d=ImageDraw.Draw(mask)
    if kind%3==0:
        x=int(-240+p*(W+480)); d.polygon([(x-180,0),(x+120,0),(x-140,H),(x-440,H)],fill=255)
    elif kind%3==1:
        r=int(p*math.hypot(W,H)); d.ellipse((W/2-r,H/2-r,W/2+r,H/2+r),fill=255)
    else:
        y=int(p*(H+240)-120); d.polygon([(0,y-180),(W,y-70),(W,y+120),(0,y+10)],fill=255)
    mask=mask.filter(ImageFilter.GaussianBlur(20))
    return Image.composite(b,a,mask)


def render_video():
    OUT.mkdir(parents=True,exist_ok=True); WORK.mkdir(parents=True,exist_ok=True)
    raw=WORK/"rntx_reel_720p.mp4"
    cmd=["ffmpeg","-y","-f","rawvideo","-pix_fmt","rgb24","-s",f"{W}x{H}","-r",str(FPS),"-i","-","-an","-c:v","libx264","-preset","medium","-crf","16","-pix_fmt","yuv420p",str(raw)]
    proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
    starts=[]; acc=0.0
    for dur,_ in SCENES: starts.append(acc); acc+=dur
    for frame_no in range(int(DURATION*FPS)):
        t=frame_no/FPS
        idx=max(i for i,s in enumerate(starts) if t>=s)
        dur,fn=SCENES[idx]; local=t-starts[idx]
        im=fn(local,dur)
        fade=.34
        if idx<len(SCENES)-1 and local>dur-fade:
            next_dur,next_fn=SCENES[idx+1]
            other=next_fn(local-(dur-fade),next_dur)
            im=transition(im,other,(local-(dur-fade))/fade,idx)
        proc.stdin.write(np.asarray(im.convert("RGB"),dtype=np.uint8).tobytes())
        if frame_no%90==0: print(f"Rendered {frame_no/FPS:4.1f}s / {DURATION:.0f}s",flush=True)
    proc.stdin.close(); code=proc.wait()
    if code: raise SystemExit(code)
    return raw


def render_audio():
    sr=48000; n=int(DURATION*sr); x=np.arange(n)/sr; rng=np.random.default_rng(9926)
    music=np.zeros(n,dtype=np.float64)
    # Cinematic D minor bed and pulsing sub.
    freqs=[36.71,55.00,73.42,87.31]
    for i,f in enumerate(freqs):
        env=.20+.08*np.sin(2*np.pi*(.08+i*.013)*x+i)
        music += env*np.sin(2*np.pi*f*x + .35*np.sin(2*np.pi*.11*x))
    beat=60/104
    for bt in np.arange(0,DURATION,beat):
        start=int(bt*sr); ln=min(int(.34*sr),n-start); tt=np.arange(ln)/sr
        kick=np.sin(2*np.pi*(62*np.exp(-tt*12)+34)*tt)*np.exp(-tt*13)
        music[start:start+ln]+=1.3*kick
    for bt in np.arange(beat/2,DURATION,beat):
        start=int(bt*sr); ln=min(int(.11*sr),n-start); tt=np.arange(ln)/sr
        hat=rng.normal(0,1,ln)*np.exp(-tt*38)
        music[start:start+ln]+=.11*hat
    # Scene-change impacts and reverse-noise risers.
    boundaries=np.cumsum([d for d,_ in SCENES])[:-1]
    for bt in boundaries:
        start=max(0,int((bt-.65)*sr)); ln=min(int(.65*sr),n-start); tt=np.arange(ln)/sr
        riser=rng.normal(0,1,ln)*(tt/.65)**2
        kernel=np.ones(120)/120; riser=np.convolve(riser,kernel,mode="same")
        music[start:start+ln]+=.72*riser
        start=int(bt*sr); ln=min(int(.8*sr),n-start); tt=np.arange(ln)/sr
        boom=np.sin(2*np.pi*(82*np.exp(-tt*7)+28)*tt)*np.exp(-tt*5)
        music[start:start+ln]+=1.55*boom
    # Bright arpeggio in the final third.
    notes=[146.83,174.61,220.0,293.66]
    for k,bt in enumerate(np.arange(16,DURATION,.288)):
        start=int(bt*sr); ln=min(int(.24*sr),n-start); tt=np.arange(ln)/sr; f=notes[k%len(notes)]
        music[start:start+ln]+=.12*np.sin(2*np.pi*f*tt)*np.exp(-tt*7)
    # Fade edges and normalize conservatively.
    music*=np.minimum(1,x/.35)*np.minimum(1,(DURATION-x)/.7)
    music=np.tanh(music*.72); music*=.91/max(.001,np.max(np.abs(music)))
    pcm=(music*32767).astype(np.int16)
    wav=WORK/"rntx_original_soundtrack.wav"
    with wave.open(str(wav),"wb") as f:
        f.setnchannels(1); f.setsampwidth(2); f.setframerate(sr); f.writeframes(pcm.tobytes())
    return wav


def mux(raw,wav):
    final=OUT/"RNTX_Instagram_Reel.mp4"
    subprocess.run(["ffmpeg","-y","-i",str(raw),"-i",str(wav),"-filter:v","scale=1080:1920:flags=lanczos,unsharp=5:5:0.35:3:3:0.15","-c:v","libx264","-preset","slow","-crf","17","-profile:v","high","-level","4.1","-c:a","aac","-b:a","256k","-ar","48000","-movflags","+faststart","-shortest",str(final)],check=True)
    return final


if __name__=="__main__":
    print("Rendering RNTX cinematic reel…",flush=True)
    result=mux(render_video(),render_audio())
    print(f"DONE: {result}",flush=True)
