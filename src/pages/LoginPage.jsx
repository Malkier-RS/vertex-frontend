import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, Truck, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { FormField } from '../components/ui/FormField.jsx';
import { Button } from '../components/ui/Button.jsx';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="auth-split">
      <div className="auth-card">
        <h1 style={{ marginTop: 0, marginBottom: 8 }}>Prijava</h1>
        <p className="text-muted" style={{ marginTop: 0 }}>Pristupite svom B2B nalogu.</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError('');
            try {
              await login(email, password);
              navigate('/');
            } catch {
              setError('Neispravni kredencijali ili nalog nije dostupan.');
            }
          }}
          className="form-grid"
          style={{ marginTop: 20 }}
        >
          <FormField label="Email" htmlFor="email">
            <input id="email" required type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormField>
          <FormField label="Lozinka" htmlFor="password">
            <input id="password" required type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormField>
          {error && <p style={{ color: 'var(--color-danger)', gridColumn: '1 / -1', margin: 0 }}>{error}</p>}
          <Button type="submit" variant="primary" style={{ gridColumn: '1 / -1' }}>Prijavi se</Button>
        </form>
        <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: 16 }}>
          Nemate nalog? <Link to="/register">Registracija firme</Link>
        </p>
        <div className="price-panel" style={{ marginTop: 20 }}>
          <div className="row-flex" style={{ gap: 8, marginBottom: 6 }}><Lock size={16} /><strong>Napomena o cenama</strong></div>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>
            Cene kompletnog asortimana dostupne su samo odobrenim B2B korisnicima.
          </p>
        </div>
      </div>

      <div className="auth-benefits">
        <h2 style={{ margin: 0, fontSize: '1.35rem' }}>Zašto Vertex B2B?</h2>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
          <li><Package size={16} style={{ verticalAlign: 'text-top', marginRight: 6 }} />Centralizovano poručivanje</li>
          <li><Truck size={16} style={{ verticalAlign: 'text-top', marginRight: 6 }} />Jasna logistika</li>
          <li><ShieldCheck size={16} style={{ verticalAlign: 'text-top', marginRight: 6 }} />Ručna verifikacija kupaca</li>
        </ul>
      </div>
    </div>
  );
}


