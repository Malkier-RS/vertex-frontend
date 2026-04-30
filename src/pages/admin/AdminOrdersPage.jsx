import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { AdminTable } from '../../components/ui/AdminTable.jsx';
import { StatusBadge } from '../../components/ui/StatusBadge.jsx';
import { LoadingState } from '../../components/ui/LoadingState.jsx';
import { formatDate, formatRsd } from '../../lib/format.js';
import { SelectField } from '../../components/ui/SelectField.jsx';
import { ToolbarSearch } from '../../components/ui/ToolbarSearch.jsx';
import { ORDER_STATUS_OPTIONS } from '../../lib/labels.js';

export function AdminOrdersPage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('');
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const load = () => {
    setLoadError('');
    return api
      .get('/admin/orders', { params: status ? { status } : {} })
      .then((r) => setItems(r.data))
      .catch((e) => {
        setItems([]);
        setLoadError(e?.response?.data?.message || 'Ne mogu da učitam porudžbine.');
      });
  };

  useEffect(() => { load().finally(() => setLoading(false)); }, [status]);

  const filtered = useMemo(() => {
    if (!q.trim()) return items;
    const s = q.toLowerCase();
    return items.filter((o) => o.orderNumber?.toLowerCase().includes(s) || String(o.customer?.email || '').toLowerCase().includes(s));
  }, [items, q]);

  if (loading) return <LoadingState />;

  return (
    <>
      <h1 style={{ marginTop: 0 }}>Porudžbine</h1>
      {loadError && <p style={{ color: 'var(--color-danger)', marginBottom: 12 }}>{loadError}</p>}
      <div className="toolbar">
        <div className="toolbar__grow">
          <ToolbarSearch
            id="admin-orders-search"
            label="Pretraga"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Broj porudžbine ili email kupca…"
            aria-label="Pretraga porudžbina"
          />
        </div>
        <div style={{ minWidth: 200, flex: '0 1 220px' }}>
          <SelectField
            label="Status"
            value={status}
            emptyLabel="Svi statusi"
            options={ORDER_STATUS_OPTIONS}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
      </div>
      <AdminTable>
        <thead>
          <tr><th>Broj</th><th>Kupac</th><th>Datum</th><th>Status</th><th>Ukupno</th><th /></tr>
        </thead>
        <tbody>
          {filtered.map((o) => (
            <tr key={o.id}>
              <td><strong>{o.orderNumber}</strong></td>
              <td>{o.customer?.email || '—'}</td>
              <td>{formatDate(o.createdAt)}</td>
              <td><StatusBadge status={o.status} /></td>
              <td>{formatRsd(o.total)}</td>
              <td><Link className="btn btn--outline btn--sm" to={`/admin/orders/${o.id}`}>Detalji</Link></td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </>
  );
}
