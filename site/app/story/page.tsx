import Link from "next/link";
import { PageHero, SiteShell } from "../components/SiteShell";

export const metadata = {
  title: "The Story",
  description: "How Revenant Esports and Team XSpark became one wolven spark.",
};

const timeline = [
  { year: "2019", title: "The first spark", copy: "Team XSpark begins its recorded competitive history in Indian mobile battle royale esports, with Sc0utOP later listed as owner." },
  { year: "2020", title: "Revenant rises", copy: "Revenant Esports begins its recorded organizational history under owner and CEO Rohit Jagasia." },
  { year: "2024", title: "A season of proof", copy: "Team XSpark claims the Battlegrounds Mobile India Series and Battlegrounds Mobile India Pro Series titles in the same year." },
  { year: "31.10.24", title: "One crest", copy: "Revenant Esports and Team XSpark announce their partnership. Competitive infrastructure meets a championship community: Revenant XSpark is born." },
  { year: "2025", title: "The world opens", copy: "Revenant XSpark fields teams across PC and mobile esports, while its active organization record grows beyond competition." },
  { year: "2026", title: "The next hunt", copy: "Seven Liquipedia-listed divisions carry the name across BGMI, VALORANT, Brawl Stars, Pokémon UNITE, Free Fire MAX, Honor of Kings and Mobile Legends." },
];

export default function StoryPage() {
  return (
    <SiteShell>
      <PageHero
        index="03"
        eyebrow="ORIGIN + MERGER"
        title="TWO LEGACIES."
        intro="Revenant supplied the ambition to build across every arena. Team XSpark brought a community, a competitive bloodline and a championship year."
      />
      <section className="page-section alt">
        <div className="timeline">
          {timeline.map((item) => (
            <article className="timeline-entry" key={item.year} data-reveal>
              <span>{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="page-section">
        <div className="section-heading" data-reveal>
          <h2>THE STORY<br />CONTINUES LIVE.</h2>
          <div className="hero-actions">
            <Link className="gold-button" href="/teams">Enter the teams <b>↗</b></Link>
            <Link className="text-link" href="/creators">Meet the people <span>→</span></Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
