import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../api/client';
import { AdminTable } from '../../components/ui/AdminTable.jsx';
import { StatusBadge } from '../../components/ui/StatusBadge.jsx';
import { LoadingState } from '../../components/ui/LoadingState.jsx';
import { formatDate } from '../../lib/format.js';
import { Button } from '../../components/ui/Button.jsx';

const tabs = [
  { key: 'ALL', label: 'Svi' },
  { key: 'PENDING', label: 'Na čekanju' },
  { key: 'APPROVED', label: 'Odobreni' },
  { key: 'REJECTED', label: 'Odbijeni' },
  { key: 'BLOCKED', label: 'Blokirani' }
];

export function AdminCustomersPage() {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [tab, setTab] = useState('PENDING');
  const [loading, setLoading] = useState(true);

  const load = () => api
    .get('/admin/customers', { params: { _t: Date.now() }, headers: { 'Cache-Control': 'no-cache' } })
    .then((r) => setItems(r.data));

  useEffect(() => {
    setLoading(true);
    load().finally(() => setLoading(false));
  }, [location.key]);

  const filtered = useMemo(() => {
    if (tab === 'ALL') return items;
    return items.filter((u) => u.status === tab);
  }, [items, tab]);

  if (loading) return <LoadingState />;

  return (
    <>
      <h1 style={{ marginTop: 0 }}>Kupci i zahtevi</h1>
      <div className="row-flex" style={{ marginBottom: 16, flexWrap: 'wrap' }}>
        {tabs.map((t) => (
          <Button key={t.key} type="button" variant={tab === t.key ? 'primary' : 'outline'} size="sm" onClick={() => setTab(t.key)}>{t.label}</Button>
        ))}
      </div>
      <AdminTable>
        <thead>
          <tr><th>Email</th><th>Status</th><th>Registrovan</th><th /></tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td><strong>{u.email}</strong></td>
              <td><StatusBadge status={u.status} /></td>
              <td>{formatDate(u.createdAt)}</td>
              <td><Link className="btn btn--outline btn--sm" to={`/admin/customers/${u.id}`}>Detalji</Link></td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </>
  );
}
