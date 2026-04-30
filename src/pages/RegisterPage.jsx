import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Lock, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { PageHero } from '../components/ui/PageHero.jsx';
import { Card } from '../components/ui/Card.jsx';
import { FormField } from '../components/ui/FormField.jsx';
import { Button } from '../components/ui/Button.jsx';

const initial = {
  companyName: '', legalEntityName: '', pib: '', mb: '', address: '', city: '', postalCode: '',
  contactFirstName: '', contactLastName: '', email: '', phone: '', password: '', confirmPassword: '', note: '',
  aprDocument: null, idCardDocument: null
};

export function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState(initial);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      setDone(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Greška pri slanju zahteva.');
    }
  };

  if (done) {
    return (
      <Card style={{ maxWidth: 640, margin: '0 auto' }}>
        <div className="card__body" style={{ textAlign: 'center', padding: '40px 24px' }}>
          <div className="row-flex" style={{ justifyContent: 'center', marginBottom: 12 }}><Shield size={32} color="#0d9488" /></div>
          <h2 style={{ margin: '0 0 8px' }}>Zahtev je poslat</h2>
          <p className="text-muted">Vaš nalog čeka ručno odobrenje. Bićete obavešteni e-poštom kada status bude ažuriran.</p>
          <div className="row-flex" style={{ justifyContent: 'center', marginTop: 20 }}>
            <Link to="/" className="btn btn--outline">Na početnu</Link>
            <Link to="/account" className="btn btn--primary">Moj nalog</Link>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <>
      <PageHero variant="light" title="Registracija firme" subtitle="Pošaljite zahtev za B2B nalog. Nakon provere dokumentacije, administrator odobrava pristup cenama." />

      <form onSubmit={onSubmit}>
        <div className="grid-2" style={{ gap: 20 }}>
          <Card>
            <div className="card__body">
              <h3 style={{ marginTop: 0 }}>1. Podaci o firmi</h3>
              <div className="form-grid">
                <FormField label="Naziv kompanije"><input required value={form.companyName} onChange={(e) => set('companyName', e.target.value)} /></FormField>
                <FormField label="Pravni naziv"><input required value={form.legalEntityName} onChange={(e) => set('legalEntityName', e.target.value)} /></FormField>
                <FormField label="PIB"><input required value={form.pib} onChange={(e) => set('pib', e.target.value)} /></FormField>
                <FormField label="MB"><input required value={form.mb} onChange={(e) => set('mb', e.target.value)} /></FormField>
                <FormField label="Adresa"><input required value={form.address} onChange={(e) => set('address', e.target.value)} /></FormField>
                <FormField label="Grad"><input required value={form.city} onChange={(e) => set('city', e.target.value)} /></FormField>
                <FormField label="Poštanski broj"><input required value={form.postalCode} onChange={(e) => set('postalCode', e.target.value)} /></FormField>
              </div>
            </div>
          </Card>

          <Card>
            <div className="card__body">
              <h3 style={{ marginTop: 0 }}>2. Kontakt osoba</h3>
              <div className="form-grid">
                <FormField label="Ime"><input required value={form.contactFirstName} onChange={(e) => set('contactFirstName', e.target.value)} /></FormField>
                <FormField label="Prezime"><input required value={form.contactLastName} onChange={(e) => set('contactLastName', e.target.value)} /></FormField>
                <FormField label="Email"><input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} /></FormField>
                <FormField label="Telefon"><input required value={form.phone} onChange={(e) => set('phone', e.target.value)} /></FormField>
              </div>
            </div>
          </Card>

          <Card>
            <div className="card__body">
              <h3 style={{ marginTop: 0 }}>3. Dokumentacija</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>PDF, JPG ili PNG, do 10MB po fajlu. Dokumenti se čuvaju na serveru i dostupni su samo administratoru.</p>
              <div className="form-grid">
                <FormField label="APR izvod" hint={form.aprDocument?.name || 'PDF, JPG ili PNG, do 10 MB.'}>
                  <div className="row-flex" style={{ gap: 8, marginBottom: 8 }}><FileText size={18} aria-hidden /></div>
                  <input className="form-file" required type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => set('aprDocument', e.target.files?.[0] || null)} />
                </FormField>
                <FormField label="Lična karta ovlašćenog lica" hint={form.idCardDocument?.name || 'PDF, JPG ili PNG, do 10 MB.'}>
                  <div className="row-flex" style={{ gap: 8, marginBottom: 8 }}><FileText size={18} aria-hidden /></div>
                  <input className="form-file" required type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => set('idCardDocument', e.target.files?.[0] || null)} />
                </FormField>
              </div>
            </div>
          </Card>

          <Card>
            <div className="card__body">
              <h3 style={{ marginTop: 0 }}>4. Pristupni podaci</h3>
              <div className="form-grid">
                <FormField label="Lozinka"><input required type="password" value={form.password} onChange={(e) => set('password', e.target.value)} /></FormField>
                <FormField label="Potvrda lozinke"><input required type="password" value={form.confirmPassword} onChange={(e) => set('confirmPassword', e.target.value)} /></FormField>
                <FormField label="Napomena" hint="Opciono"><textarea rows={3} value={form.note} onChange={(e) => set('note', e.target.value)} /></FormField>
              </div>
              <div className="price-panel" style={{ marginTop: 12 }}>
                <div className="row-flex" style={{ gap: 8 }}><Lock size={16} /><span style={{ fontSize: '0.9rem' }}>Vaši podaci se koriste isključivo u svrhu verifikacije B2B kupca.</span></div>
              </div>
              {error && <p style={{ color: 'var(--color-danger)', marginTop: 12 }}>{error}</p>}
              <Button type="submit" variant="primary" style={{ marginTop: 16 }}>Pošalji zahtev za registraciju</Button>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>Već imate nalog? <Link to="/login">Prijava</Link></p>
            </div>
          </Card>
        </div>
      </form>
    </>
  );
}
