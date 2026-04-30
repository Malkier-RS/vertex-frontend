import { Link } from 'react-router-dom';
import { Package, ShoppingBag, LifeBuoy } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { PageHero } from '../components/ui/PageHero.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { PriceVisibilityNotice } from '../components/ui/PriceVisibilityNotice.jsx';
import { roleLabel } from '../lib/labels.js';

export function AccountPage() {
  const { user } = useAuth();

  const statusCard = () => {
    if (user?.status === 'PENDING') {
      return (
        <Card>
          <div className="card__body">
            <h3 style={{ marginTop: 0 }}>Status naloga</h3>
            <Badge tone="warning">Na čekanju</Badge>
            <p style={{ marginBottom: 0 }}>Vaš nalog čeka odobrenje. Nakon verifikacije dokumentacije videćete sve B2B cene.</p>
          </div>
        </Card>
      );
    }
    if (user?.status === 'APPROVED') {
      return (
        <Card>
          <div className="card__body">
            <h3 style={{ marginTop: 0 }}>Status naloga</h3>
            <Badge tone="success">Odobreno</Badge>
            <p style={{ marginBottom: 0 }}>Vaš nalog je odobren. Možete poručivati po B2B cenama.</p>
          </div>
        </Card>
      );
    }
    if (user?.status === 'REJECTED') {
      return (
        <Card>
          <div className="card__body">
            <h3 style={{ marginTop: 0 }}>Status naloga</h3>
            <Badge tone="danger">Odbijeno</Badge>
            <p style={{ marginBottom: 0 }}>Zahtev je odbijen. Kontaktirajte podršku za više informacija.</p>
          </div>
        </Card>
      );
    }
    if (user?.status === 'BLOCKED') {
      return (
        <Card>
          <div className="card__body">
            <h3 style={{ marginTop: 0 }}>Status naloga</h3>
            <Badge tone="danger">Blokiran</Badge>
            <p style={{ marginBottom: 0 }}>Nalog je blokiran. Obratite se administratoru.</p>
          </div>
        </Card>
      );
    }
    return null;
  };

  return (
    <>
      <PageHero variant="light" title="Moj nalog" subtitle="Pregled statusa, brze akcije i napomene o cenama." />

      <div className="grid-2" style={{ alignItems: 'start' }}>
        {statusCard()}
        <Card>
          <div className="card__body">
            <h3 style={{ marginTop: 0 }}>Podaci o nalogu</h3>
            <p className="text-muted" style={{ margin: '4px 0' }}><strong>Email:</strong> {user?.email}</p>
            <p className="text-muted" style={{ margin: '4px 0' }}><strong>Uloga:</strong> {roleLabel(user?.role)}</p>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: 12 }}>
              Podaci o firmi (PIB, adresa, dokumenta) dostupni su administratoru tokom odobrenja. Za izmene kontaktirajte podršku.
            </p>
          </div>
        </Card>
      </div>

      <section className="section">
        <h2 style={{ marginBottom: 12 }}>Brze akcije</h2>
        <div className="grid-3">
          <Link to="/shop" className="card card--interactive" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card__body row-flex" style={{ gap: 12 }}>
              <Package color="#0d9488" /> <span><strong>Prodavnica</strong><br /><span className="text-muted" style={{ fontSize: '0.85rem' }}>Pregled asortimana</span></span>
            </div>
          </Link>
          <Link to="/orders" className="card card--interactive" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card__body row-flex" style={{ gap: 12 }}>
              <ShoppingBag color="#0d9488" /> <span><strong>Moje porudžbine</strong><br /><span className="text-muted" style={{ fontSize: '0.85rem' }}>Istorija</span></span>
            </div>
          </Link>
          <Link to="/contact" className="card card--interactive" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card__body row-flex" style={{ gap: 12 }}>
              <LifeBuoy color="#0d9488" /> <span><strong>Podrška</strong><br /><span className="text-muted" style={{ fontSize: '0.85rem' }}>Kontakt</span></span>
            </div>
          </Link>
        </div>
      </section>

      <div style={{ maxWidth: 520 }}>
        <PriceVisibilityNotice user={user} />
      </div>
    </>
  );
}
