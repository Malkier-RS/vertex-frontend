import { Link } from 'react-router-dom';
import {
  Building2,
  CheckCircle2,
  Globe2,
  Handshake,
  MapPin,
  Package,
  Truck
} from 'lucide-react';
import { StatCard } from '../components/ui/StatCard.jsx';
import { IMAGES } from '../lib/images.js';

const APPROACH = [
  'stabilno i pouzdano snabdevanje',
  'jasne rokove isporuke',
  'transparentne B2B cene',
  'doslednu komunikaciju',
  'podršku u planiranju zaliha'
];

const BRANDS = [
  'San Pellegrino',
  'Pringles',
  'Trolli',
  'Haribo',
  'Chupa Chups',
  'Monini',
  'Fairy',
  'Persil',
  'Ariel',
  'Mr. Proper'
];

export function AboutPage() {
  return (
    <>
      <section className="vx-about-hero">
        <div className="vx-about-hero__copy">
          <span className="vx-eyebrow">O nama</span>
          <h1>Vertex Distribution DOO — B2B veleprodaja hrane, pića i robe za STR prodavnice</h1>
          <p>
            Vertex distribucija povezuje pravna lica i STR prodavnice sa pažljivo odabranim
            italijanskim i evropskim brendovima. Centrala u Beogradu, organizovana logistika i
            digitalna B2B platforma omogućavaju stabilan dotok robe široke potrošnje — bez
            nepotrebne administracije.
          </p>
          <div className="vx-about-hero__chips">
            <span className="vx-pill"><MapPin size={14} /> Beograd · Pančevački put 86D</span>
            <span className="vx-pill"><Building2 size={14} /> PIB 115611143 · MB 22183281</span>
          </div>
        </div>
        <div className="vx-about-hero__visual">
          <img src={IMAGES.teamPlanning} alt="Vertex tim planira distribuciju" />
        </div>
      </section>

      <section className="vx-section">
        <div className="vx-section__head">
          <div>
            <span className="vx-eyebrow">Ko smo mi</span>
            <h2>B2B veleprodajna i distributivna platforma</h2>
          </div>
        </div>
        <div className="vx-about-story">
          <p>
            Vertex Distribution DOO je B2B veleprodajna i distributivna platforma specijalizovana
            za snabdevanje STR prodavnica, marketa i pravnih lica širom Srbije.
          </p>
          <p>
            Naša ponuda obuhvata pažljivo odabrane brendove iz Italije i Evrope, uključujući pića,
            grickalice, slatkiše, ulja i druge proizvode široke potrošnje.
          </p>
          <p>
            Kroz modernu B2B platformu omogućavamo registrovanim kupcima jednostavno i transparentno
            poručivanje iz veleprodajnog kataloga.
          </p>
        </div>
      </section>

      <section className="vx-section vx-approach">
        <div className="vx-approach__copy">
          <span className="vx-eyebrow">Naš pristup</span>
          <h2>Dugoročna partnerstva sa našim klijentima</h2>
          <p className="vx-section__sub">
            Fokusirani smo na dugoročna partnerstva sa našim klijentima kroz:
          </p>
          <ul className="vx-checks">
            {APPROACH.map((item) => (
              <li key={item}><CheckCircle2 size={18} /> {item}</li>
            ))}
          </ul>
        </div>
        <div className="vx-approach__visual">
          <img src={IMAGES.vertexDeliveryCustomer} alt="Vertex isporuka kupcu" />
        </div>
      </section>

      <section className="vx-section">
        <div className="vx-section__head">
          <div>
            <span className="vx-eyebrow">Zašto baš Vertex?</span>
            <h2>Lanac snabdevanja prilagođen STR prodavnicama</h2>
          </div>
        </div>
        <div className="vx-why">
          <p>
            Naš cilj nije samo distribucija robe, već izgradnja efikasnog lanca snabdevanja za male
            i srednje prodajne objekte. Vertex povezuje evropske brendove i lokalno tržište kroz
            organizovanu veleprodaju i digitalno poručivanje.
          </p>
        </div>
      </section>

      <section className="vx-section">
        <div className="vx-section__head">
          <div>
            <span className="vx-eyebrow">Brendovi</span>
            <h2>Distribuiramo proverene proizvode</h2>
          </div>
        </div>
        <div className="vx-brand-grid">
          {BRANDS.map((b) => (
            <div key={b} className="vx-brand-chip">{b}</div>
          ))}
        </div>
      </section>

      <section className="vx-section">
        <div className="vx-section__head">
          <div>
            <span className="vx-eyebrow">Brojevi koji grade poverenje</span>
            <h2>Indikatori naše mreže</h2>
          </div>
        </div>
        <div className="grid-4">
          <StatCard label="proizvoda u katalogu" value="170+" icon={Package} />
          <StatCard label="B2B isporuka" value="Brza i planirana" icon={Truck} />
          <StatCard label="mreža poslovnih korisnika" value="Rastuća" icon={Handshake} />
          <StatCard label="logistika i distribucione rute" value="Organizovana" icon={Globe2} />
        </div>
      </section>

      <section className="vx-final-cta">
        <div className="vx-final-cta__inner">
          <div>
            <h2>Postanite registrovani B2B kupac</h2>
            <p>
              Registrujte svoju firmu i ostvarite pristup Vertex veleprodajnom katalogu, B2B cenama
              i online poručivanju robe. Nakon provere dokumentacije aktiviramo vaš nalog i
              omogućavamo pristup kompletnom asortimanu.
            </p>
          </div>
          <div className="vx-final-cta__actions">
            <Link to="/register" className="btn btn--primary btn--lg">Registracija firme</Link>
            <Link to="/contact" className="btn btn--outline btn--lg">Kontakt</Link>
          </div>
        </div>
      </section>
    </>
  );
}
