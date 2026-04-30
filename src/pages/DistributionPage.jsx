import { Link } from 'react-router-dom';
import { ClipboardList, PackageSearch, Truck, Headphones } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero.jsx';
import { Card } from '../components/ui/Card.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';

const logisticsGallery = [
  {
    src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&h=600&fit=crop&q=80',
    alt: 'Skladište sa policama i paletama'
  },
  {
    src: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=900&h=600&fit=crop&q=80',
    alt: 'Vozilo za distribuciju robe'
  },
  {
    src: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=900&h=600&fit=crop&q=80',
    alt: 'Kontejneri i logistički lanac'
  }
];

const steps = [
  { title: 'Prijem porudžbine', desc: 'Porudžbina stiže u sistem i dobija jedinstveni broj.' },
  { title: 'Provera dostupnosti', desc: 'Potvrđujemo zalihe i planiramo isporuku.' },
  { title: 'Priprema robe', desc: 'Pakovanje i komisioniranje prema vašem zahtevu.' },
  { title: 'Isporuka', desc: 'Planirane rute ka maloprodajnim objektima.' },
  { title: 'Podrška nakon isporuke', desc: 'Tu smo za reklamacije i dodatne narudžbine.' }
];

export function DistributionPage() {
  return (
    <>
      <PageHero variant="light" title="Distribucija i logistika" subtitle="Organizovana distribucija robe široke potrošnje za male i srednje prodajne objekte." />

      <section className="section">
        <SectionHeader title="Proces od porudžbine do isporuke" />
        <div className="timeline">
          {steps.map((s, i) => (
            <div key={s.title} className="timeline__item">
              <div className="timeline__dot">{i + 1}</div>
              <Card><div className="card__body"><h3 style={{ marginTop: 0 }}>{s.title}</h3><p className="text-muted" style={{ margin: 0 }}>{s.desc}</p></div></Card>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid-2">
          {[
            { icon: Truck, t: 'Planirana isporuka', d: 'Rute prilagođene malim objektima i urbanoj distribuciji.' },
            { icon: PackageSearch, t: 'Širok asortiman', d: 'Hrana, piće, higijena, hemija, pet program i još mnogo toga.' },
            { icon: Headphones, t: 'Podrška prodavnicama', d: 'Konsultacije oko zaliha i sezonskih pikova.' },
            { icon: ClipboardList, t: 'B2B poručivanje online', d: 'Jasan status porudžbine i istorija nabavke.' }
          ].map((x) => (
            <Card key={x.t} interactive>
              <div className="card__body" style={{ display: 'flex', gap: 16 }}>
                <x.icon size={28} color="#0d9488" />
                <div>
                  <h3 style={{ margin: '0 0 8px' }}>{x.t}</h3>
                  <p className="text-muted" style={{ margin: 0 }}>{x.d}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid-2">
          <Card><div className="card__body"><h3 style={{ marginTop: 0 }}>Zašto digitalno poručivanje?</h3><p className="text-muted">Manje grešaka, brži obrasci porudžbina i bolja vidljivost zaliha za vašu radnju.</p></div></Card>
          <Card><div className="card__body"><h3 style={{ marginTop: 0 }}>Prednosti za STR prodavnice</h3><p className="text-muted">Fokus na brzinu, jasnoću cena nakon odobrenja i pouzdanu isporuku.</p></div></Card>
        </div>
      </section>

      <section className="section">
        <SectionHeader title="Logistika u slikama" subtitle="Ilustrativne fotografije — u produkciji zamenite sopstvenim materijalom." />
        <div className="grid-3">
          {logisticsGallery.map((item) => (
            <Card key={item.src}>
              <div className="card__media" style={{ aspectRatio: '4/3' }}>
                <img
                  src={item.src}
                  alt={item.alt}
                  width={900}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="page-hero" style={{ marginTop: 8 }}>
        <h2 style={{ fontSize: '1.35rem', margin: '0 0 8px' }}>Otvorite B2B nalog i poručujte robu online</h2>
        <p style={{ margin: 0, opacity: 0.95 }}>Registracija je prvi korak ka veleprodajnim cenama i digitalnoj nabavci.</p>
        <div className="page-hero__actions">
          <Link to="/register" className="btn btn--primary btn--lg">Registracija</Link>
          <Link to="/contact" className="btn btn--outline btn--lg">Kontakt</Link>
        </div>
      </div>
    </>
  );
}
