import Link from "next/link";
import { CrestScene, SiteShell } from "./components/SiteShell";
import { divisions, featuredAchievements, socials, upcomingEvents } from "./data";

export default function Home() {
  return (
    <SiteShell>
      <section className="home-hero" data-cinematic>
        <div className="world-grid" />
        <div className="hero-light-volume" aria-hidden="true" />
        <div className="hero-scan" aria-hidden="true" />
        <div className="hero-ghost hero-ghost-a" aria-hidden="true">REVENANT</div>
        <div className="hero-ghost hero-ghost-b" aria-hidden="true">XSPARK</div>
        <div className="vertical-signal">MUMBAI / INDIA / 19.0760° N</div>
        <div className="hero-copy" data-reveal>
          <div className="section-tag"><span>LIVE</span>INDIA&apos;S WOLFPACK</div>
          <h1><em>ONE</em><br />WOLVEN<br /><i>SPARK.</i></h1>
          <p>A championship esports force born from Revenant&apos;s ambition and Team XSpark&apos;s competitive fire.</p>
          <div className="hero-actions">
            <Link className="gold-button" data-magnetic href="/teams/bgmi">Enter the arena <b>↗</b></Link>
            <Link className="text-link" href="/story">Explore the merger <span>→</span></Link>
          </div>
        </div>
        <CrestScene />
        <div className="hero-coordinates">
          <span>RNTX // 2026</span>
          <span>SCROLL TO DESCEND</span>
        </div>
      </section>

      <section className="signal-strip" aria-label="Team highlights">
        {[0, 1].map((copy) => (
          <div className="signal-track" aria-hidden={copy === 1} key={copy}>
            <span>BGIS 2024 CHAMPIONS</span><i>✦</i>
            <span>BMPS 2024 CHAMPIONS</span><i>✦</i>
            <span>7 COMPETITIVE DIVISIONS</span><i>✦</i>
            <span>$289K+ TRACKED BGMI WINNINGS</span><i>✦</i>
          </div>
        ))}
      </section>

      <section className="intro-section" data-cinematic>
        <div className="merger-monolith" aria-hidden="true"><img src="/assets/rntx-merger.jpg" alt="" loading="lazy" decoding="async" /></div>
        <div className="section-tag" data-reveal><span>01</span>THE MERGER</div>
        <div className="intro-statement" data-reveal>
          <p>Two legacies. One crest.</p>
          <h2>REVENANT&apos;S SCALE.<br /><span>XSPARK&apos;S FIRE.</span></h2>
        </div>
        <div className="split-cards">
          <Link className="split-card revenant" href="/story" data-reveal data-tilt>
            <small>EST. 2020</small>
            <strong>REVENANT</strong>
            <p>Multi-title ambition, global competition and an expanding creator ecosystem.</p>
            <span>Read the origin →</span>
          </Link>
          <Link className="split-card xspark" href="/story" data-reveal data-tilt>
            <small>EST. 2019</small>
            <strong>TEAM XSPARK</strong>
            <p>Community-built BGMI pedigree led by one of India&apos;s most recognizable esports names.</p>
            <span>Trace the spark →</span>
          </Link>
        </div>
      </section>

      <section className="home-roster" data-cinematic>
        <div className="roster-beam" aria-hidden="true" />
        <div className="home-roster-copy" data-reveal>
          <div className="section-tag"><span>02</span>ACTIVE UNIT</div>
          <h2>THE 2026<br />BGMI FIVE.</h2>
          <p>Captain NinjaJOD leads a reconfigured lineup featuring Tracegod, Pain09, Proton and Sukuna.</p>
          <Link className="gold-button" data-magnetic href="/teams/bgmi">Meet every player <b>↗</b></Link>
        </div>
        <div className="player-stack" data-reveal>
          {divisions[0].players.map((player, index) => (
            <Link href="/teams/bgmi" className="stack-card" data-tilt key={player.handle} style={{ "--i": index } as React.CSSProperties}>
              <img src={player.image} alt={player.handle} loading="lazy" decoding="async" />
              <span>{player.handle}</span>
              <small>{player.role}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="trophy-window" data-cinematic>
        <div className="trophy-copy" data-reveal>
          <div className="section-tag"><span>03</span>TROPHY ROOM</div>
          <h2>BACK TO BACK.<br /><i>BUILT TO LAST.</i></h2>
          <p>Team XSpark&apos;s defining 2024 run delivered India&apos;s BGIS and BMPS crowns in the same season.</p>
          <Link className="text-link" href="/achievements">Open the trophy archive <span>→</span></Link>
        </div>
        <div className="trophy-panels">
          {featuredAchievements.map((item) => (
            <Link href="/achievements" className="trophy-panel" key={item.title} data-reveal data-tilt>
              <img src={item.image} alt="" loading="lazy" decoding="async" />
              <span>{item.place}</span>
              <div><small>{item.date}</small><strong>{item.title}</strong></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mission-window" data-cinematic>
        <div className="mission-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="mission-copy" data-reveal>
          <div className="section-tag"><span>04</span>NEXT MISSIONS</div>
          <h2>PARIS.<br />GROUP C.</h2>
          <p>The verified next missions: Honor of Kings World Cup action in Paris and the FFMIC Fall group stage in India.</p>
          <Link className="gold-button" data-magnetic href="/events">Open event command <b>↗</b></Link>
        </div>
        <div className="mission-list">
          {upcomingEvents.map((event) => (
            <Link href="/events" key={event.title} data-reveal>
              <small>{event.game} · {event.state}</small>
              <strong>{event.title}</strong>
              <span>{event.date} {event.year} / {event.location}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="naruto-teaser" data-cinematic>
        <img src="/assets/naruto-hero.webp" alt="Official Revenant XSpark Naruto merchandise collaboration" loading="lazy" decoding="async" />
        <img className="floating-merch" src="/assets/naruto-tee-front.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className="shinobi-slice" aria-hidden="true" />
        <div className="naruto-copy" data-reveal>
          <div className="section-tag"><span>05</span>LICENSED COLLABORATION</div>
          <small>NINJA WAY × WOLFPACK</small>
          <h2>WEAR YOUR<br />INNER SHINOBI.</h2>
          <p>Official Naruto collaboration pieces—built for the village, finished for the street.</p>
          <div className="hero-actions">
            <Link className="gold-button" data-magnetic href="/shop">Explore the collection <b>↗</b></Link>
            <a className="text-link" href={socials.shop} target="_blank" rel="noreferrer">Shop now <span>↗</span></a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
