import Link from "next/link";
import { PageHero, SiteShell } from "../components/SiteShell";
import { divisions } from "../data";

export const metadata = {
  title: "Competitive Teams",
  description: "Explore every Revenant XSpark competitive division and roster profile.",
};

export default function TeamsPage() {
  return (
    <SiteShell>
      <PageHero
        index="01"
        eyebrow="COMPETITIVE DIVISIONS"
        title="EVERY ARENA."
        intro="From India's defining mobile battle royale stage to tactical FPS and global mobile competition—enter each Revenant XSpark unit."
      />
      <section className="page-section alt">
        <div className="section-heading" data-reveal>
          <h2>CHOOSE<br />YOUR UNIT.</h2>
          <p>Each division has its own dedicated space. Select a title to see its competitive identity, achievement marker and roster snapshot.</p>
        </div>
        <div className="division-grid">
          {divisions.map((division) => (
            <Link
              className="division-card"
              href={`/teams/${division.slug}`}
              key={division.slug}
              data-code={division.short}
              data-reveal
              style={{ "--accent": division.accent } as React.CSSProperties}
            >
              <small>{division.genre} · {division.status}</small>
              <div>
                <h3>{division.game}</h3>
                <p>{division.achievement}</p>
              </div>
              <span>Open division →</span>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
