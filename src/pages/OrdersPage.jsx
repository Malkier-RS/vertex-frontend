import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { PageHero } from '../components/ui/PageHero.jsx';
import { AdminTable } from '../components/ui/AdminTable.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { LoadingState } from '../components/ui/LoadingState.jsx';
import { StatusBadge } from '../components/ui/StatusBadge.jsx';
import { formatDate, formatRsd } from '../lib/format.js';

export function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    setLoadError('');
    api
      .get('/orders/my')
      .then((r) => setOrders(r.data))
      .catch((e) => {
        setOrders([]);
        setLoadError(e?.response?.data?.message || 'Ne mogu da učitam porudžbine. Proverite da li je backend pokrenut.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHero variant="light" title="Moje porudžbine" subtitle="Istorija porudžbina i status isporuke." />
      <div className="row-flex" style={{ marginBottom: 16 }}>
        <Link to="/korpa" className="btn btn--primary btn--sm">Idi u korpu</Link>
        <Link to="/shop" className="btn btn--outline btn--sm">Nastavi kupovinu</Link>
      </div>
      {loading ? <LoadingState /> : loadError ? (
        <p style={{ color: 'var(--color-danger)' }}>{loadError}</p>
      ) : orders.length === 0 ? (
        <EmptyState title="Još uvek nemate porudžbine" description="Kada potvrdite porudžbinu, pojaviće se ovde." action={<Link to="/shop" className="btn btn--primary">Prodavnica</Link>} />
      ) : (
        <AdminTable>
          <thead>
            <tr>
              <th>Broj</th>
              <th>Datum</th>
              <th>Status</th>
              <th>Ukupno</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td><strong>{o.orderNumber}</strong></td>
                <td>{formatDate(o.createdAt)}</td>
                <td><StatusBadge status={o.status} /></td>
                <td>{formatRsd(o.total)}</td>
                <td><Link className="btn btn--outline btn--sm" to={`/orders/${o.id}`}>Detalji</Link></td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      )}
    </>
  );
}
