import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Headphones,
  MapPin,
  PackageCheck,
  PackageSearch,
  Route,
  Truck
} from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { IMAGES } from '../lib/images.js';

const STEPS = [
  {
    icon: ClipboardCheck,
    title: 'Prijem porudžbine',
    desc: 'Vaša porudžbina ulazi u Vertex sistem i dobija jedinstveni broj za praćenje i obradu.'
  },
  {
    icon: PackageSearch,
    title: 'Provera i planiranje isporuke',
    desc: 'Proveravamo dostupnost proizvoda i organizujemo najefikasniji plan isporuke.'
  },
  {
    icon: Boxes,
    title: 'Priprema i pakovanje robe',
    desc: 'Roba se komisionira i pakuje prema vašoj porudžbini i potrebama prodajnog objekta.'
  },
  {
    icon: Truck,
    title: 'Isporuka na lokaciju',
    desc: 'Organizovane distribucione rute omogućavaju brzu i pouzdanu dostavu do vašeg objekta.'
  },
  {
    icon: Headphones,
    title: 'Podrška nakon isporuke',
    desc: 'Dostupni smo za dodatne narudžbine, pitanja i eventualne reklamacije.'
  }
];

const FEATURES = [
  {
    icon: Route,
    title: 'Planirana isporuka',
    text: 'Organizovane rute prilagođene STR prodavnicama.'
  },
  {
    icon: PackageCheck,
    title: 'Širok B2B asortiman po veleprodajnim cenama',
    text: 'Hrana, piće, kafa, grickalice, ulja, hemija i proizvodi široke potrošnje.'
  },
  {
    icon: Headphones,
    title: 'Podrška prodajnim objektima',
    text: 'Pomoć u planiranju zaliha i priprema za sezonske periode povećane potražnje.'
  },
  {
    icon: ClipboardList,
    title: 'Online B2B poručivanje',
    text: 'Jednostavno kreiranje i praćenje porudžbina kroz Vertex platformu.'
  }
];

const COVERAGE = [
  'Beograd i šira okolina',
  'Vojvodina (Novi Sad, Subotica, Pančevo)',
  'Centralna Srbija (Kragujevac, Čačak, Kraljevo)',
  'Južna Srbija (Niš, Leskovac, Vranje)',
  'Istok i zapad (Užice, Loznica, Zaječar)'
];

export function DistributionPage() {
  return (
    <>
      <section className="vx-dist-hero">
        <div className="vx-dist-hero__copy">
          <span className="vx-eyebrow">Distribucija i logistika</span>
          <h1>Distribucija i logistika za STR prodavnice</h1>
          <p>
            Vertex distribucija obezbeđuje organizovanu B2B isporuku robe široke potrošnje za STR
            prodavnice, markete i pravna lica širom Srbije. Naš fokus je stabilna, planirana i
            pouzdana veleprodajna distribucija hrane, pića i ostale robe iz kataloga.
          </p>
          <div className="row-flex" style={{ marginTop: 18 }}>
            <Link to="/register" className="btn btn--primary btn--lg">Otvori B2B nalog</Link>
            <Link to="/contact" className="btn btn--outline btn--lg">Pitajte za saradnju</Link>
          </div>
        </div>
        <div className="vx-dist-hero__visual">
          <img src={IMAGES.warehouseWorkers} alt="Vertex skladište i tim" />
          <div className="vx-dist-hero__chip">
            <Truck size={16} /> Aktivne rute danas
          </div>
        </div>
      </section>

      <section className="vx-section">
        <div className="vx-section__head">
          <div>
            <span className="vx-eyebrow">Kako radimo</span>
            <h2>Proces od porudžbine do isporuke</h2>
          </div>
        </div>
        <div className="vx-process-grid">
          {STEPS.map((s, i) => (
            <div key={s.title} className="vx-process-card">
              <div className="vx-process-card__num">{String(i + 1).padStart(2, '0')}</div>
              <div className="vx-process-card__icon"><s.icon size={22} /></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="vx-section">
        <div className="vx-section__head">
          <div>
            <span className="vx-eyebrow">Šta dobijate</span>
            <h2>Prednosti Vertex distribucije</h2>
          </div>
        </div>
        <div className="vx-feature-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="vx-feature">
              <div className="vx-feature__icon"><f.icon size={22} /></div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="vx-section">
        <div className="grid-2">
          <Card>
            <div className="card__body">
              <span className="vx-eyebrow">Digitalno poručivanje</span>
              <h3 style={{ marginTop: 8, marginBottom: 8 }}>Zašto digitalno poručivanje?</h3>
              <p className="text-muted" style={{ margin: 0 }}>
                Digitalni B2B sistem smanjuje greške u porudžbinama, ubrzava proces nabavke i
                omogućava bolju kontrolu i pregled istorije kupovine.
              </p>
            </div>
          </Card>
          <Card>
            <div className="card__body">
              <span className="vx-eyebrow">Za STR prodavnice</span>
              <h3 style={{ marginTop: 8, marginBottom: 8 }}>Prednosti za STR prodavnice</h3>
              <p className="text-muted" style={{ margin: 0 }}>
                Vertex sistem je prilagođen malim i srednjim prodajnim objektima koji žele brzu
                nabavku, jasne veleprodajne uslove i pouzdanu distribuciju robe.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="vx-section vx-coverage">
        <div className="vx-coverage__copy">
          <span className="vx-eyebrow">Pokrivenost</span>
          <h2>Beograd kao centar, Srbija kao mreža</h2>
          <p>
            Naša centrala se nalazi u Beogradu (Pančevački put 86D), a planirane rute pokrivaju
            ključne regione. Manje prodavnice van velikih gradova dobijaju isti pristup asortimanu
            kao i radnje u centru grada.
          </p>
          <ul className="vx-checks">
            {COVERAGE.map((c) => (
              <li key={c}><CheckCircle2 size={18} /> {c}</li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn--secondary" style={{ marginTop: 8 }}>
            Proveri uslove za vaš grad <ArrowRight size={16} />
          </Link>
        </div>
        <div className="vx-coverage__visual">
          <img src={IMAGES.deliveryOldTown} alt="Vertex isporuka u urbanoj sredini" />
          <div className="vx-coverage__pin">
            <MapPin size={18} /> Beograd · Vojvodina · Cela Srbija
          </div>
        </div>
      </section>

      <section className="vx-section">
        <div className="vx-section__head">
          <div>
            <span className="vx-eyebrow">Iz prakse</span>
            <h2>Logistika u slikama</h2>
          </div>
        </div>
        <div className="vx-gallery">
          <div className="vx-gallery__item vx-gallery__item--lg">
            <img src={IMAGES.wholesaleOverview} alt="Magacin sa paletama i radnicima" loading="lazy" />
          </div>
          <div className="vx-gallery__item">
            <img src={IMAGES.warehousePringles} alt="Skladišne police sa proizvodima" loading="lazy" />
          </div>
          <div className="vx-gallery__item">
            <img src={IMAGES.vertexVanPurple} alt="Vertex distributivna vozila" loading="lazy" />
          </div>
          <div className="vx-gallery__item">
            <img src={IMAGES.warehouseAisle} alt="Komisiona izrada porudžbine" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="vx-final-cta">
        <div className="vx-final-cta__inner">
          <div>
            <h2>Spremni za stabilno snabdevanje?</h2>
            <p>
              Registrujte firmu i preuzmite kontrolu nad nabavkom. Vertex tim vam pomaže da
              postavite proces koji štedi vreme i smanjuje rizik od nestašica na rafovima.
            </p>
          </div>
          <div className="vx-final-cta__actions">
            <Link to="/register" className="btn btn--primary btn--lg">Registracija</Link>
            <Link to="/contact" className="btn btn--outline btn--lg">Kontakt</Link>
          </div>
        </div>
      </section>
    </>
  );
}
