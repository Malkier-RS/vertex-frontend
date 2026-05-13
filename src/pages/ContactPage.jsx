import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { FormField } from '../components/ui/FormField.jsx';
import { Button } from '../components/ui/Button.jsx';

const CONTACT_ITEMS = [
  { icon: Mail, label: 'Email', value: 'prodaja@vertex.rs', href: 'mailto:prodaja@vertex.rs' },
  { icon: Phone, label: 'Telefon', value: '+381 11 000 0000', href: 'tel:+381110000000' },
  { icon: Clock, label: 'Radno vreme', value: 'Pon – Pet · 08:00 – 17:00' },
  { icon: Building2, label: 'PIB · MB', value: '115611143 · 22183281' }
];

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSent(true);
  };

  return (
    <>
      <section className="vx-section" style={{ marginTop: 24 }}>
        <div className="vx-section__head">
          <div>
            <span className="vx-eyebrow">Kontakt</span>
            <h2>Tu smo za pitanja o saradnji</h2>
            <p className="vx-section__sub" style={{ marginTop: 12 }}>
              Pišite, pozovite ili svratite. Tim Vertex distribucije rado pomaže oko registracije,
              poručivanja i uslova saradnje.
            </p>
          </div>
        </div>
        <div className="vx-contact-info">
          {CONTACT_ITEMS.map((c) => (
            <div key={c.label} className="vx-contact-item">
              <div className="vx-contact-item__icon"><c.icon size={20} /></div>
              <div>
                <span>{c.label}</span>
                {c.href ? (
                  <a href={c.href}>{c.value}</a>
                ) : (
                  <strong>{c.value}</strong>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="vx-section">
        <div className="vx-contact-grid">
          <Card>
            <div className="card__body">
              <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>Pošaljite poruku</h3>
              <p className="text-muted" style={{ marginTop: 0 }}>
                Odgovaramo u roku od 24h u toku radne nedelje.
              </p>
              {sent ? (
                <div className="article-callout" style={{ marginTop: 16 }}>
                  <strong>Hvala vam!</strong>
                  <p>
                    Vaša poruka je primljena (demo — bez stvarnog slanja). Tim će vas kontaktirati
                    u najkraćem mogućem roku.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="form-grid" style={{ marginTop: 12 }}>
                  <FormField label="Ime i prezime"><input required name="name" /></FormField>
                  <FormField label="Kompanija"><input required name="company" /></FormField>
                  <FormField label="Email"><input required type="email" name="email" /></FormField>
                  <FormField label="Telefon"><input required name="phone" /></FormField>
                  <FormField label="Poruka" hint="Opciono: broj radnje, grad, vrsta saradnje.">
                    <textarea required rows={5} name="message" />
                  </FormField>
                  {error && <p style={{ color: 'var(--color-danger)', gridColumn: '1 / -1' }}>{error}</p>}
                  <Button type="submit" variant="primary" style={{ gridColumn: '1 / -1' }}>
                    <Send size={16} /> Pošalji upit
                  </Button>
                </form>
              )}
            </div>
          </Card>

          <div className="vx-contact-side">
            <Card>
              <div className="card__body">
                <div className="row-flex" style={{ marginBottom: 8 }}>
                  <MapPin size={18} color="#0d9488" />
                  <strong>Lokacija centrale</strong>
                </div>
                <p className="text-muted" style={{ margin: 0 }}>
                  Vertex Distribution DOO<br />
                  Beograd (Palilula), Pančevački put 86D
                </p>
                <div className="vx-map">
                  <iframe
                    title="Vertex Distribution lokacija"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=20.4783%2C44.8201%2C20.5183%2C44.8401&amp;layer=mapnik&amp;marker=44.8301%2C20.4983"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </Card>
            <div className="vx-contact-cta">
              <h3>Spremni za saradnju?</h3>
              <p>Otvorite B2B nalog i krenite sa digitalnim poručivanjem već danas.</p>
              <Link to="/register" className="btn btn--primary">Registracija firme</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
