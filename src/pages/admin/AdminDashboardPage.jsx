import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { StatCard } from '../../components/ui/StatCard.jsx';
import { AdminTable } from '../../components/ui/AdminTable.jsx';
import { StatusBadge } from '../../components/ui/StatusBadge.jsx';
import { LoadingState } from '../../components/ui/LoadingState.jsx';
import { formatDate, formatRsd } from '../../lib/format.js';
import { Users, ShoppingCart, Package, UserPlus } from 'lucide-react';

export function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/admin/orders'),
      api.get('/admin/customers'),
      api.get('/admin/products')
    ]).then(([o, c, p]) => {
      setOrders(o.data);
      setCustomers(c.data);
      setProducts(p.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState />;

  const pending = customers.filter((u) => u.status === 'PENDING').length;
  const approved = customers.filter((u) => u.status === 'APPROVED').length;

  return (
    <>
      <h1 style={{ marginTop: 0 }}>Dashboard</h1>
      <p className="text-muted">Pregled ključnih metrika i najnovijih aktivnosti.</p>

      <div className="grid-4" style={{ margin: '24px 0' }}>
        <StatCard label="Zahtevi na čekanju" value={String(pending)} icon={UserPlus} />
        <StatCard label="Odobreni kupci" value={String(approved)} icon={Users} />
        <StatCard label="Porudžbine" value={String(orders.length)} icon={ShoppingCart} />
        <StatCard label="Proizvodi" value={String(products.length)} icon={Package} />
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div>
          <h2>Nedavne porudžbine</h2>
          <AdminTable>
            <thead>
              <tr><th>Broj</th><th>Datum</th><th>Status</th><th>Ukupno</th><th /></tr>
            </thead>
            <tbody>
              {orders.slice(0, 6).map((o) => (
                <tr key={o.id}>
                  <td>{o.orderNumber}</td>
                  <td>{formatDate(o.createdAt)}</td>
                  <td><StatusBadge status={o.status} /></td>
                  <td>{formatRsd(o.total)}</td>
                  <td><Link className="btn btn--ghost btn--sm" to={`/admin/orders/${o.id}`}>Otvori</Link></td>
                </tr>
              ))}
            </tbody>
          </AdminTable>
        </div>
        <div>
          <h2>Novi zahtevi za registraciju</h2>
          <AdminTable>
            <thead>
              <tr><th>Email</th><th>Status</th><th /></tr>
            </thead>
            <tbody>
              {customers.filter((c) => c.status === 'PENDING').slice(0, 8).map((c) => (
                <tr key={c.id}>
                  <td>{c.email}</td>
                  <td><StatusBadge status={c.status} /></td>
                  <td><Link className="btn btn--ghost btn--sm" to={`/admin/customers/${c.id}`}>Pregled</Link></td>
                </tr>
              ))}
            </tbody>
          </AdminTable>
        </div>
      </div>
    </>
  );
}
