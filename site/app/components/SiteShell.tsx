"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { socials } from "../data";

const nav = [
  { href: "/teams", label: "Teams" },
  { href: "/events", label: "Events" },
  { href: "/achievements", label: "Achievements" },
  { href: "/story", label: "Story" },
  { href: "/creators", label: "Founders + Creators" },
  { href: "/shop", label: "Shop" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    document.querySelectorAll<HTMLElement>(".page-section, .shop-hero, .dossier-hero, .not-found").forEach((node) => node.setAttribute("data-cinematic", ""));
    document.querySelectorAll<HTMLElement>(".division-card, .player-card, .creator-card, .leader-card, .event-card, .product-card, .profile-player").forEach((node) => node.setAttribute("data-tilt", ""));
    document.querySelectorAll<HTMLElement>(".gold-button").forEach((node) => node.setAttribute("data-magnetic", ""));
    const cinematicNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-cinematic]"));
    const pendingReveals = new Set(Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")));
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let pointerFrame = 0;
    let scrollFrame = 0;
    let routeTimer = 0;
    let lastScroll = window.scrollY;
    let routePending = false;
    const introTimer = window.setTimeout(() => setIntro(false), 850);
    const move = (event: PointerEvent) => {
      if (!finePointer) return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        html.style.setProperty("--mx", `${event.clientX}px`);
        html.style.setProperty("--my", `${event.clientY}px`);
        html.style.setProperty("--px", `${event.clientX / window.innerWidth - 0.5}`);
        html.style.setProperty("--py", `${event.clientY / window.innerHeight - 0.5}`);
      });
    };
    const updateScrollMotion = () => {
      const current = window.scrollY;
      html.style.setProperty("--sy", `${current}`);
      html.style.setProperty(
        "--progress",
        `${current / Math.max(document.body.scrollHeight - innerHeight, 1)}`,
      );
      html.style.setProperty("--scroll-velocity", `${Math.max(-32, Math.min(32, current - lastScroll))}`);
      lastScroll = current;
      cinematicNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.top > window.innerHeight * 1.3 || rect.bottom < -window.innerHeight * .3) return;
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        node.style.setProperty("--scene-p", `${progress}`);
      });
      pendingReveals.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight * .96 && rect.bottom > 0) {
          node.classList.add("seen");
          pendingReveals.delete(node);
        }
      });
      scrollFrame = 0;
    };
    const scroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollMotion);
    };
    const interactiveMove = (event: PointerEvent) => {
      if (!finePointer) return;
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-tilt], [data-magnetic]");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      target.style.setProperty("--tilt-x", `${nx}`);
      target.style.setProperty("--tilt-y", `${ny}`);
    };
    const interactiveOut = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-tilt], [data-magnetic]");
      if (!target || target.contains(event.relatedTarget as Node | null)) return;
      target.style.setProperty("--tilt-x", "0");
      target.style.setProperty("--tilt-y", "0");
    };
    const routeChange = (event: MouseEvent) => {
      if (routePending || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      event.preventDefault();
      routePending = true;
      html.classList.add("route-leaving");
      routeTimer = window.setTimeout(() => router.push(`${url.pathname}${url.search}${url.hash}`), 260);
    };
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("seen")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    window.addEventListener("pointermove", move);
    window.addEventListener("pointermove", interactiveMove);
    window.addEventListener("pointerout", interactiveOut);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll, { passive: true });
    document.addEventListener("click", routeChange, true);
    updateScrollMotion();
    return () => {
      cancelAnimationFrame(pointerFrame);
      cancelAnimationFrame(scrollFrame);
      window.clearTimeout(routeTimer);
      window.clearTimeout(introTimer);
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointermove", interactiveMove);
      window.removeEventListener("pointerout", interactiveOut);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      document.removeEventListener("click", routeChange, true);
      html.classList.remove("route-leaving");
    };
  }, [pathname, router]);

  return (
    <div className="site-shell">
      <div className={intro ? "cinematic-intro" : "cinematic-intro complete"} aria-hidden="true">
        <div className="intro-aperture"><img src="/assets/rntx-crest-2026.webp" alt="" /></div>
        <div className="intro-type"><span>REVENANT XSPARK</span><small>ENTERING THE WOLFPACK</small></div>
        <div className="intro-meter"><i /></div>
      </div>
      <div className="route-transition" aria-hidden="true"><span>RNTX</span></div>
      <div className="global-atmosphere" aria-hidden="true"><i /><i /><i /></div>
      <div className="film-grain" aria-hidden="true" />
      <div className="cursor-aura" aria-hidden="true" />
      <div className="cursor-core" aria-hidden="true" />
      <div className="progress-line" aria-hidden="true" />
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Revenant XSpark home">
          <img src="/assets/rntx-crest-2026.webp" alt="" />
          <span>REVENANT<br /><b>XSPARK</b></span>
        </Link>
        <nav className={open ? "main-nav open" : "main-nav"} aria-label="Main navigation">
          {nav.map((item) => (
            <Link className={pathname.startsWith(item.href) ? "active" : ""} href={item.href} key={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a className="gold-button compact" data-magnetic href={socials.shop} target="_blank" rel="noreferrer">Official shop ↗</a>
          <button className={open ? "menu-toggle open" : "menu-toggle"} onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <span /><span />
          </button>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-crest">
          <img src="/assets/rntx-crest-2026.webp" alt="Revenant XSpark crest" />
          <p>Forged from two legacies.<br />Built for every arena.</p>
        </div>
        <div className="footer-links">
          {nav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </div>
        <div className="footer-socials">
          <a href={socials.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href={socials.youtube} target="_blank" rel="noreferrer">YouTube ↗</a>
          <a href={socials.x} target="_blank" rel="noreferrer">X ↗</a>
          <a href={socials.discord} target="_blank" rel="noreferrer">Discord ↗</a>
        </div>
        <div className="footer-bottom">
          <span>REVENANT XSPARK / INDIA</span>
          <span>LIQUIPEDIA AUDIT · 01 AUG 2026 · SOURCE LINKS ON PROFILES</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}

export function CrestScene({ small = false }: { small?: boolean }) {
  return (
    <div className={small ? "crest-scene small" : "crest-scene"} aria-hidden="true">
      <div className="scene-word scene-word-a">REVENANT</div>
      <div className="scene-word scene-word-b">XSPARK</div>
      <div className="portal-ring portal-ring-a" />
      <div className="portal-ring portal-ring-b" />
      <div className="orbit orbit-a"><i /><i /><i /></div>
      <div className="orbit orbit-b"><i /><i /></div>
      <div className="crest-halo" />
      <div className="crest-shadow" />
      <div className="crest-plane crest-plane-a" />
      <div className="crest-plane crest-plane-b" />
      <div className="crest-slab back" />
      <div className="crest-slab middle" />
      <img className="scene-crest" src="/assets/rntx-crest-2026.webp" alt="" />
      <div className="spark spark-a" />
      <div className="spark spark-b" />
      <div className="spark spark-c" />
    </div>
  );
}

export function PageHero({
  index,
  eyebrow,
  title,
  intro,
}: {
  index: string;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="page-hero" data-cinematic>
      <div className="page-hero-grid" />
      <div className="page-hero-copy" data-reveal>
        <div className="section-tag"><span>{index}</span>{eyebrow}</div>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      <CrestScene small />
    </section>
  );
}
