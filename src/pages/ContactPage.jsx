import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero.jsx';
import { Card } from '../components/ui/Card.jsx';
import { FormField } from '../components/ui/FormField.jsx';
import { Button } from '../components/ui/Button.jsx';

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
      <PageHero variant="light" title="Kontakt" subtitle="Tu smo za pitanja o saradnji, registraciji i poručivanju." />

      <div className="grid-3" style={{ marginBottom: 28 }}>
        <Card><div className="card__body"><div className="row-flex"><Mail size={18} color="#0d9488" /><strong>Email</strong></div><p className="text-muted" style={{ margin: '8px 0 0' }}>prodaja@vertex.rs</p></div></Card>
        <Card><div className="card__body"><div className="row-flex"><Phone size={18} color="#0d9488" /><strong>Telefon</strong></div><p className="text-muted" style={{ margin: '8px 0 0' }}>+381 11 000 0000</p></div></Card>
        <Card><div className="card__body"><div className="row-flex"><Clock size={18} color="#0d9488" /><strong>Radno vreme</strong></div><p className="text-muted" style={{ margin: '8px 0 0' }}>Pon–Pet: 08:00–17:00</p></div></Card>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <Card>
          <div className="card__body">
            <h3 style={{ marginTop: 0 }}>Pošaljite poruku</h3>
            {sent ? (
              <p>Hvala! Poruka je primljena (demo — nema backend slanja).</p>
            ) : (
              <form onSubmit={onSubmit} className="form-grid">
                <FormField label="Ime i prezime"><input required name="name" /></FormField>
                <FormField label="Kompanija"><input required name="company" /></FormField>
                <FormField label="Email"><input required type="email" name="email" /></FormField>
                <FormField label="Telefon"><input required name="phone" /></FormField>
                <FormField label="Poruka" hint="Opciono: broj radnje, grad, vrsta saradnje.">
                  <textarea required rows={5} name="message" />
                </FormField>
                {error && <p style={{ color: 'var(--color-danger)', gridColumn: '1 / -1' }}>{error}</p>}
                <Button type="submit" variant="primary">Pošalji upit</Button>
              </form>
            )}
          </div>
        </Card>

        <div>
          <Card>
            <div className="card__body">
              <div className="row-flex" style={{ marginBottom: 8 }}><MapPin size={18} color="#0d9488" /><strong>Lokacija</strong></div>
              <p className="text-muted">Vertex Distribution DOO<br />Beograd (Palilula), Pančevački put 86D<br />PIB 115611143 · MB 22183281</p>
              <div className="skeleton" style={{ height: 200, borderRadius: 'var(--radius-md)', marginTop: 12 }} aria-hidden />
              <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: 8 }}>Mapa će biti integrisana u produkciji.</p>
            </div>
          </Card>
          <div style={{ marginTop: 16 }}>
            <Link to="/register" className="btn btn--secondary">Registracija firme</Link>
          </div>
        </div>
      </div>
    </>
  );
}


