import Link from "next/link";
import { CrestScene, SiteShell } from "./components/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="not-found">
        <div data-reveal>
          <div className="section-tag"><span>404</span>SIGNAL LOST</div>
          <h1>OUTSIDE<br />THE ZONE.</h1>
          <p>This route has rotated out. Re-enter through the competitive hub.</p>
          <Link className="gold-button" href="/">Return home <b>↗</b></Link>
        </div>
        <CrestScene small />
      </section>
    </SiteShell>
  );
}
