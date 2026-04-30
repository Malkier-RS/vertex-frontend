import { Link } from 'react-router-dom';
import { Handshake, Shield, Sparkles, Target } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero.jsx';
import { Card } from '../components/ui/Card.jsx';
import { StatCard } from '../components/ui/StatCard.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';

export function AboutPage() {
  return (
    <>
      <PageHero variant="light" title="O nama" subtitle="Vertex Distribution DOO — veleprodaja i B2B digitalna prodavnica za vašu radnju." />

      <section className="section">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <h2 style={{ marginTop: 0 }}>Ko smo mi</h2>
            <p className="text-muted" style={{ fontSize: '1.05rem' }}>
              Vertex distribucija (Vertex Distribution DOO, Beograd — Pančevački put 86D) bavi se veleprodajom i distribucijom vrhunskih brendova iz Italije i Evrope:
              pića, grickalica, slatkiša i ulja. Ova B2B platforma služi registrovanim kupcima za transparentno poručivanje po cenama iz našeg kataloga.
            </p>
            <p className="text-muted">
              Fokus nam je dugoročno partnerstvo: jasni rokovi, dosledna komunikacija i podrška pri planiranju zaliha.
            </p>
          </div>
          <Card>
            <div className="card__media" style={{ borderRadius: 'var(--radius-lg)' }}>
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1000&h=700&fit=crop&q=80" alt="Tim" style={{ height: 360, objectFit: 'cover', width: '100%' }} />
            </div>
          </Card>
        </div>
      </section>

      <section className="section">
        <SectionHeader title="Brojke koje inspirišu poverenje" subtitle="Indikativni pokazatelji za demo okruženje platforme." />
        <div className="grid-4">
          <StatCard label="Proizvoda u katalogu" value="90+" icon={Target} />
          <StatCard label="Isporuke" value="Brza isporuka" icon={Sparkles} />
          <StatCard label="B2B korisnici" value="Rastuća mreža" icon={Handshake} />
          <StatCard label="Logistika" value="Planirane rute" icon={Shield} />
        </div>
      </section>

      <section className="section">
        <SectionHeader title="Naše vrednosti" />
        <div className="grid-2">
          {[
            { t: 'Pouzdanost', d: 'Ispunjavamo dogovore i držimo obećane rokove.' },
            { t: 'Transparentnost', d: 'Jasne cene, statusi porudžbina i dokumentacija.' },
            { t: 'Efikasnost', d: 'Manje administracije — više vremena za prodaju.' },
            { t: 'Partnerstvo', d: 'Slušamo potrebe malih prodavnica i prilagođavamo se.' }
          ].map((v) => (
            <Card key={v.t}>
              <div className="card__body">
                <h3 style={{ marginTop: 0 }}>{v.t}</h3>
                <p className="text-muted" style={{ margin: 0 }}>{v.d}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="page-hero page-hero--light" style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: '1.35rem', margin: '0 0 8px' }}>Postanite registrovani B2B kupac</h2>
        <p className="text-muted" style={{ margin: 0 }}>Pošaljite zahtev za nalog — nakon provere dokumentacije dobijate pristup cenama i poručivanju.</p>
        <div className="page-hero__actions">
          <Link to="/register" className="btn btn--primary">Registracija firme</Link>
          <Link to="/contact" className="btn btn--outline">Kontakt</Link>
        </div>
      </div>
    </>
  );
}


