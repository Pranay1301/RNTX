import { PageHero, SiteShell } from "../components/SiteShell";
import { achievements, socials } from "../data";

export const metadata = {
  title: "Achievements",
  description: "The verified Revenant XSpark trophy room across seven competitive divisions.",
};

export default function AchievementsPage() {
  return (
    <SiteShell>
      <PageHero
        index="02"
        eyebrow="TROPHY ARCHIVE"
        title="RESULTS REMAIN."
        intro="Liquipedia-listed national titles, international finishes and recent results across the Revenant XSpark competitive system."
      />
      <section className="page-section">
        <div className="scoreboard" data-reveal>
          <div className="score-cell"><strong>7</strong><span>Liquipedia-listed divisions</span></div>
          <div className="score-cell"><strong>19</strong><span>BGMI top-three finishes</span></div>
          <div className="score-cell"><strong>2×</strong><span>2024 national championships</span></div>
          <div className="score-cell"><strong>$289,119</strong><span>Tracked BGMI winnings</span></div>
        </div>
        <p className="source-note">Roster, placement and winnings data was audited against each title&apos;s Liquipedia team page on 1 August 2026. Records may change as tournaments conclude.</p>
      </section>
      <section className="page-section alt">
        <div className="section-heading" data-reveal>
          <h2>THE<br />LEDGER.</h2>
          <p>Selected Liquipedia-listed results across all seven divisions. Hover a result to surface its record.</p>
        </div>
        <div className="achievement-list">
          {achievements.map((item) => (
            <article className="achievement-row" key={`${item.date}-${item.title}`} data-reveal>
              <img src={item.image} alt="" loading="lazy" decoding="async" />
              <div className="achievement-place">{item.place}</div>
              <div className="achievement-title"><small>{item.game}</small><strong>{item.title}</strong></div>
              <div className="achievement-detail">{item.detail}</div>
              <div className="achievement-date">{item.date}</div>
            </article>
          ))}
        </div>
        <div className="hero-actions" style={{ marginTop: 42 }}>
          <a className="gold-button" href={`${socials.liquipedia}/Results`} target="_blank" rel="noreferrer">BGMI full record <b>↗</b></a>
          <a className="text-link" href="/teams">All division sources <span>→</span></a>
        </div>
      </section>
    </SiteShell>
  );
}
