import { Link } from "react-router-dom";
import ContentTabs from "../ContentTabs/ContentTabs";
import "./HeroBanner.css";

function HeroBanner() {
  return (
    <section className="hero-banner" id="browse">
      <div className="hero-banner__overlay">
        <ContentTabs />
        <p className="hero-banner__eyebrow">Streaming klon för gruppuppgift</p>
        <h1 className="hero-banner__title">Nytt och populärt på FlexNet</h1>
        <p className="hero-banner__description">
          Upptäck de senaste och mest populära filmerna och serierna på FlexNet.
          Vi har något för alla smaker, oavsett om du gillar action, komedi,
          drama eller dokumentärer. Utforska vårt stora utbud av underhållning
          och hitta din nästa favorit idag!
        </p>

        <div className="hero-banner__actions">
          <a
            href="#rows"
            className="hero-banner__button hero-banner__button--primary"
          >
            Utforska nu
          </a>
          <Link
            to="/watchlist"
            className="hero-banner__button hero-banner__button--secondary"
          >
            Öppna min lista
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
