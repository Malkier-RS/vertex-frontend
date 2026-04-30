import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/client';
import { LoadingState } from '../../components/ui/LoadingState.jsx';
import { AdminTable } from '../../components/ui/AdminTable.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { StatusBadge } from '../../components/ui/StatusBadge.jsx';
import { SelectField } from '../../components/ui/SelectField.jsx';
import { formatDate, formatRsd } from '../../lib/format.js';
import { Button } from '../../components/ui/Button.jsx';
import { ORDER_STATUS_OPTIONS, normalizeEnum } from '../../lib/labels.js';

export function AdminOrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [statusError, setStatusError] = useState('');

  const load = () =>
    api
      .get(`/admin/orders/${id}`, { params: { _t: Date.now() }, headers: { 'Cache-Control': 'no-cache' } })
      .then((r) => setOrder(r.data));

  useEffect(() => { load(); }, [id]);

  if (!order) return <LoadingState />;

  const statusValue = normalizeEnum(order.status);

  return (
    <>
      <Link to="/admin/orders" className="btn btn--ghost btn--sm" style={{ marginBottom: 16 }}>← Nazad</Link>
      <div className="row-flex" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ margin: 0 }}>{order.orderNumber}</h1>
        <StatusBadge status={order.status} />
      </div>
      <p className="text-muted">{formatDate(order.createdAt)}</p>

      <div className="grid-2" style={{ margin: '20px 0' }}>
        <Card><div className="card__body">
          <h3 style={{ marginTop: 0 }}>Kupac</h3>
          <p className="text-muted" style={{ margin: 0 }}>{order.customer?.email}</p>
        </div></Card>
        <Card><div className="card__body">
          <h3 style={{ marginTop: 0 }}>Dostava</h3>
          <p className="text-muted" style={{ margin: 0 }}>{order.deliveryAddress}</p>
          <p className="text-muted">Napomena: {order.note || '—'}</p>
        </div></Card>
      </div>

      <div className="row-flex" style={{ marginBottom: 16, flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
        <div style={{ minWidth: 220, flex: '0 1 280px' }}>
          <SelectField
            label="Status porudžbine"
            id={`order-status-${id}`}
            value={statusValue}
            options={ORDER_STATUS_OPTIONS}
            error={statusError}
            onChange={async (e) => {
              setStatusError('');
              try {
                await api.put(
                  `/admin/orders/${id}/status`,
                  { status: e.target.value },
                  { params: { status: e.target.value } }
                );
                await load();
              } catch (err) {
                setStatusError(err?.response?.data?.message || 'Promena statusa nije uspela.');
              }
            }}
          />
        </div>
        <Button type="button" variant="outline" size="sm" onClick={load}>Osveži</Button>
      </div>

      <AdminTable>
        <thead>
          <tr><th>Proizvod</th><th>SKU</th><th>Kol.</th><th>Cena</th><th>PDV</th><th>Ukupno</th></tr>
        </thead>
        <tbody>
          {(order.items || []).map((line) => (
            <tr key={line.id}>
              <td>{line.productNameSnapshot}</td>
              <td>{line.skuSnapshot}</td>
              <td>{line.quantity}</td>
              <td>{formatRsd(line.unitPriceSnapshot)}</td>
              <td>{line.vatRate}%</td>
              <td>{formatRsd(line.lineTotal)}</td>
            </tr>
          ))}
        </tbody>
      </AdminTable>

      <div style={{ maxWidth: 360, marginLeft: 'auto', marginTop: 16 }}>
        <Card><div className="card__body">
          <div className="row-flex" style={{ justifyContent: 'space-between' }}><span className="text-muted">Međuzbir</span><strong>{formatRsd(order.subtotal)}</strong></div>
          <div className="row-flex" style={{ justifyContent: 'space-between' }}><span className="text-muted">PDV</span><strong>{formatRsd(order.vatAmount)}</strong></div>
          <div className="row-flex" style={{ justifyContent: 'space-between', marginTop: 8, fontSize: '1.1rem' }}><span>Ukupno</span><strong>{formatRsd(order.total)}</strong></div>
        </div></Card>
      </div>
    </>
  );
}
