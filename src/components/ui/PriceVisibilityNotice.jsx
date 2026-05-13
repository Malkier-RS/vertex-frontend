import { Lock, ShieldCheck } from 'lucide-react';
import { Badge } from './Badge.jsx';

export function PriceVisibilityNotice({ user }) {
  return (
    <div className="sidebar-card">
      <h3>Vidljivost cena</h3>
      <p className="text-muted" style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>
        Javno su prikazane cene za odabrane proizvode. Kompletan asortiman i B2B cenovnik dostupni su nakon ručnog odobrenja korisničkog naloga.
      </p>
      {!user && (
        <div className="row-flex" style={{ alignItems: 'flex-start' }}>
          <Badge tone="locked"><Lock size={12} /> B2B cene</Badge>
          <span className="text-muted" style={{ fontSize: '0.85rem' }}>Prijavite se i pristupite B2B cenama nakon odobrenja naloga. Pristup je namenjen registrovanim poslovnim korisnicima.</span>
        </div>
      )}
      {user?.status === 'PENDING' && (
        <div className="row-flex">
          <Badge tone="warning"><ShieldCheck size={12} /> Čeka odobrenje</Badge>
          <span className="text-muted" style={{ fontSize: '0.85rem' }}>Vaš nalog čeka odobrenje.</span>
        </div>
      )}
      {user?.status === 'APPROVED' && (
        <div className="row-flex">
          <Badge tone="success"><ShieldCheck size={12} /> Odobren nalog</Badge>
          <span className="text-muted" style={{ fontSize: '0.85rem' }}>Imate pristup svim cenama.</span>
        </div>
      )}
    </div>
  );
}
