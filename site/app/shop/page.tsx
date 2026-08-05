import { SiteShell } from "../components/SiteShell";
import { socials } from "../data";

export const metadata = {
  title: "Official Merchandise",
  description: "Explore Revenant XSpark official merchandise and the licensed Naruto collaboration.",
};

const products = [
  { image: "/assets/naruto-tee-front.webp", title: "Naruto Oversized Tee", meta: "Official licensed collaboration · front + back graphic" },
  { image: "/assets/naruto-tee-model-1.jpg", title: "The Shinobi Fit", meta: "Relaxed silhouette · streetwear cut" },
  { image: "/assets/naruto-tee-model-2.jpg", title: "Hidden Leaf / Back", meta: "Full-scale collaboration artwork" },
  { image: "/assets/naruto-tee-model-3.jpg", title: "Wolven Detail", meta: "RNTX identity · Naruto iconography" },
];

export default function ShopPage() {
  return (
    <SiteShell>
      <section className="shop-hero">
        <img src="/assets/naruto-hero.webp" alt="Revenant XSpark Naruto collection" />
        <div className="shop-copy" data-reveal>
          <div className="section-tag"><span>05</span>OFFICIAL LICENSED COLLABORATION</div>
          <h1>THE<br />NINJA<br />WAY.</h1>
          <p>Naruto&apos;s shinobi spirit meets the Revenant XSpark wolfpack. Explore the visual story here, then complete your order through the official merchandise store.</p>
          <a className="gold-button" href={socials.shop} target="_blank" rel="noreferrer">Shop the official store <b>↗</b></a>
        </div>
      </section>
      <section className="page-section alt">
        <div className="section-heading" data-reveal>
          <h2>COLLECTION<br />DETAILS.</h2>
          <p>A cinematic look at the licensed Naruto oversized tee. Product availability, sizing and current prices are maintained by the official store.</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.image} data-reveal>
              <img src={product.image} alt={product.title} loading="lazy" decoding="async" />
              <div><small>RNTX × NARUTO</small><h3>{product.title}</h3><p>{product.meta}</p></div>
            </article>
          ))}
        </div>
        <div className="hero-actions" style={{ marginTop: 42 }}>
          <a className="gold-button" href={socials.shop} target="_blank" rel="noreferrer">Check price + availability <b>↗</b></a>
        </div>
      </section>
    </SiteShell>
  );
}
