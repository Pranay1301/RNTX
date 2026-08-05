import Link from "next/link";
import { PageHero, SiteShell } from "../components/SiteShell";
import { recentResults, socials, upcomingEvents } from "../data";

export const metadata = {
  title: "Events & Matches",
  description: "Upcoming Revenant XSpark events, global qualifications and recent competitive results.",
};

export default function EventsPage() {
  return (
    <SiteShell>
      <PageHero
        index="02"
        eyebrow="UPCOMING + RECENT"
        title="NEXT HUNT."
        intro="The global stages ahead and the latest verified results across every active Revenant XSpark division."
      />
      <section className="page-section alt">
        <div className="section-heading" data-reveal>
          <h2>UPCOMING<br />MISSIONS.</h2>
          <p>These are the two upcoming or in-progress competitions currently listed on the relevant Liquipedia team pages.</p>
        </div>
        <div className="event-grid">
          {upcomingEvents.map((event, index) => (
            <a className="event-card" href={event.href} target="_blank" rel="noreferrer" key={event.title} data-reveal>
              <div className="event-number">0{index + 1}</div>
              <div className="event-state"><i />{event.state}</div>
              <div className="event-date"><strong>{event.date}</strong><span>{event.year}</span></div>
              <div className="event-title">
                <small>{event.game}</small>
                <h2>{event.title}</h2>
                <p>{event.location}<br />{event.detail}</p>
              </div>
              <span className="event-link">Tournament record ↗</span>
            </a>
          ))}
        </div>
      </section>
      <section className="page-section">
        <div className="section-heading" data-reveal>
          <h2>RECENT<br />SIGNALS.</h2>
          <p>A cross-title results feed audited through 1 August 2026.</p>
        </div>
        <div className="results-feed">
          {recentResults.map((result) => (
            <article className="result-row" key={`${result.date}-${result.title}`} data-reveal>
              <span className="result-date">{result.date}</span>
              <span className="result-game">{result.game}</span>
              <strong>{result.result}</strong>
              <div><h3>{result.title}</h3><p>{result.detail}</p></div>
            </article>
          ))}
        </div>
        <div className="hero-actions" style={{ marginTop: 42 }}>
          <a className="gold-button" href={socials.instagram} target="_blank" rel="noreferrer">Match-day updates <b>↗</b></a>
          <Link className="text-link" href="/achievements">Trophy archive <span>→</span></Link>
        </div>
      </section>
    </SiteShell>
  );
}
