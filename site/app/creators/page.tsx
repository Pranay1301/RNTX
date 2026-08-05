import { PageHero, SiteShell } from "../components/SiteShell";
import { competitiveLeadership, creatorCollective, creators, socials } from "../data";

export const metadata = {
  title: "Founders & Creators",
  description: "Meet the leadership and creator collective behind Revenant XSpark.",
};

export default function CreatorsPage() {
  return (
    <SiteShell>
      <PageHero
        index="04"
        eyebrow="LEADERSHIP + CULTURE"
        title="BEYOND THE SERVER."
        intro="The builders, competitive leaders and creators carrying Revenant XSpark into gaming culture at full scale."
      />
      <section className="page-section">
        <div className="section-heading" data-reveal>
          <h2>THE<br />BUILDERS.</h2>
          <p>Revenant and Team XSpark retain distinct origin stories. Roles on this page follow the active organization records on Liquipedia.</p>
        </div>
        <div className="leaders-grid">
          <article className="leader-card featured" data-reveal>
            <small>REVENANT ESPORTS · OWNER & CEO</small>
            <h2>ROHIT N<br />JAGASIA</h2>
            <p>Listed by Liquipedia as Revenant&apos;s owner and CEO since 2020, and the organizational leader on the Revenant side of the partnership.</p>
          </article>
          <article className="leader-card" data-reveal>
            <small>TEAM XSPARK · OWNER / RNTX BRAND AMBASSADOR</small>
            <h2>TANMAY<br />“SC0UT” SINGH</h2>
            <p>Listed by Liquipedia as Team XSpark owner and, since the 2024 partnership, a Revenant XSpark brand ambassador.</p>
            <a className="text-link" href="https://www.instagram.com/scoutop/" target="_blank" rel="noreferrer">Instagram <span>↗</span></a>
          </article>
        </div>
      </section>
      <section className="page-section alt">
        <div className="section-heading" data-reveal>
          <h2>CREATOR<br />SIGNAL.</h2>
          <p>Featured leaders and creators present in the active Liquipedia organization record.</p>
        </div>
        <div className="creator-grid">
          {creators.map((creator) => (
            <a className="creator-card" href={creator.href} target="_blank" rel="noreferrer" key={creator.handle} data-reveal>
              <img src={creator.image} alt={`${creator.handle} — ${creator.name}`} loading="lazy" decoding="async" />
              <div>
                <small>{creator.source}</small>
                <h3>{creator.handle}</h3>
                <p>{creator.name}<br />{creator.role}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="page-section">
        <div className="section-heading" data-reveal>
          <h2>THE<br />COLLECTIVE.</h2>
          <p>Additional active organization members listed in the current Revenant XSpark record.</p>
        </div>
        <div className="collective-grid" data-reveal>
          {creatorCollective.map((creator) => <div key={creator}>{creator}</div>)}
        </div>
        <div className="section-heading leadership-heading" data-reveal>
          <h2>COMPETITIVE<br />LEADERSHIP.</h2>
          <p>The managers, coaches and analysts connecting ownership to every match-day unit.</p>
        </div>
        <div className="leadership-grid">
          {competitiveLeadership.map((leader) => (
            <article key={leader.name} data-reveal><span>{leader.role}</span><strong>{leader.name}</strong></article>
          ))}
        </div>
        <div className="hero-actions" style={{ marginTop: 42 }}>
          <a className="gold-button" href={socials.instagram} target="_blank" rel="noreferrer">See the latest on Instagram <b>↗</b></a>
          <a className="text-link" href={socials.liquipedia} target="_blank" rel="noreferrer">Organization record <span>↗</span></a>
        </div>
      </section>
    </SiteShell>
  );
}
