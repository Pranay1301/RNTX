import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, SiteShell } from "../../components/SiteShell";
import { divisions, socials } from "../../data";

export function generateStaticParams() {
  return divisions.map((division) => ({ slug: division.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const division = divisions.find((item) => item.slug === slug);
  return {
    title: division ? `${division.game} Team` : "Team",
    description: division ? `${division.game} roster and competitive profile for Revenant XSpark.` : undefined,
  };
}

export default async function DivisionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const division = divisions.find((item) => item.slug === slug);
  if (!division) notFound();
  const isBgmi = division.slug === "bgmi";

  return (
    <SiteShell>
      <PageHero
        index={division.short}
        eyebrow={`${division.genre} · ${division.status}`}
        title={division.headline}
        intro={`${division.achievement}. Explore the roster snapshot and follow the official channels for match-day updates.`}
      />
      <section className="page-section alt">
        <div className="section-heading" data-reveal>
          <h2>{isBgmi ? "THE CURRENT FIVE." : "ROSTER SNAPSHOT."}</h2>
          <p>
            {isBgmi
              ? "The active 2026 BGMI lineup as listed by Liquipedia. Portraits use Liquipedia profiles where available and official roster announcement art for the remaining players."
              : "A title-specific competitive profile. Rosters change quickly; official social channels remain the match-day source of truth."}
          </p>
        </div>
        {isBgmi ? (
          <>
            <div className="roster-grid">
              {division.players.map((player) => (
                <Link className="player-card" href={`/players/${player.slug}`} key={player.handle} data-reveal>
                  <img src={player.image} alt={`${player.handle} — ${player.name}`} loading="lazy" decoding="async" />
                  <div className="player-card-content">
                    <small>{player.role} · {player.note}</small>
                    <h3>{player.handle}</h3>
                    <p>{player.name}</p>
                    <p className="player-stat">{player.stat}</p>
                  </div>
                </Link>
              ))}
            </div>
            <p className="source-note">Roster names, roles and join dates were audited against Liquipedia on 1 August 2026. Portrait provenance is noted separately from competitive data.</p>
          </>
        ) : (
          <div className="profile-roster">
            {division.players.map((player) => (
              <article className="profile-player" key={player.handle} data-reveal>
                <span>{player.role}</span>
                <strong>{player.handle}</strong>
                <small>{player.name}</small>
              </article>
            ))}
          </div>
        )}
        <div className="division-record" data-reveal>
          <span>LATEST VERIFIED MARKER</span>
          <strong>{division.currentRecord}</strong>
        </div>
      </section>
      <section className="page-section">
        <div className="section-heading" data-reveal>
          <h2>FOLLOW<br />THE HUNT.</h2>
          <div className="hero-actions">
            <a className="gold-button" href={socials.instagram} target="_blank" rel="noreferrer">Instagram <b>↗</b></a>
            <a className="text-link" href={division.source} target="_blank" rel="noreferrer">Competition record <span>↗</span></a>
            <Link className="text-link" href="/teams">All divisions <span>→</span></Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
