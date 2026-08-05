import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "../../components/SiteShell";
import { playerDossiers } from "../../data";

export function generateStaticParams() {
  return playerDossiers.map((player) => ({ handle: player.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const player = playerDossiers.find((item) => item.slug === handle);
  return {
    title: player ? `${player.handle} — BGMI Player` : "Player",
    description: player ? `${player.handle} profile, verified career markers and Revenant XSpark roster details.` : undefined,
  };
}

export default async function PlayerPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const player = playerDossiers.find((item) => item.slug === handle);
  if (!player) notFound();

  return (
    <SiteShell>
      <section className="dossier-hero">
        <div className="dossier-grid" aria-hidden="true" />
        <div className="dossier-ghost" aria-hidden="true">{player.handle}</div>
        <div className="dossier-image">
          <img src={player.image} alt={`${player.handle} — ${player.name}`} />
        </div>
        <div className="dossier-copy" data-reveal>
          <div className="section-tag"><span>PLAYER DOSSIER</span>{player.role}</div>
          <h1>{player.handle}</h1>
          <h2>{player.name}</h2>
          <p>{player.intro}</p>
          <div className="hero-actions">
            <a className="gold-button" href={player.source} target="_blank" rel="noreferrer">Verified source <b>↗</b></a>
            <Link className="text-link" href="/teams/bgmi">Back to roster <span>→</span></Link>
          </div>
        </div>
      </section>
      <section className="page-section alt">
        <div className="dossier-facts">
          {player.facts.map(([label, value]) => (
            <div className="dossier-fact" key={label} data-reveal><span>{label}</span><strong>{value}</strong></div>
          ))}
        </div>
      </section>
      <section className="page-section">
        <div className="section-heading" data-reveal>
          <h2>CAREER<br />MARKERS.</h2>
          <p>Only publicly verifiable achievements or participation markers are shown. Unknown personal details are intentionally left unpublished.</p>
        </div>
        <div className="highlight-list">
          {player.highlights.map((highlight, index) => (
            <div key={highlight} data-reveal><span>0{index + 1}</span><strong>{highlight}</strong></div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
