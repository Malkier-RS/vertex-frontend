import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import api from '../api/client';
import { LoadingState } from '../components/ui/LoadingState.jsx';
import { StatusBadge } from '../components/ui/StatusBadge.jsx';
import { AdminTable } from '../components/ui/AdminTable.jsx';
import { Card } from '../components/ui/Card.jsx';
import { formatDate, formatRsd } from '../lib/format.js';

export function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then((r) => setOrder(r.data));
  }, [id]);

  if (!order) return <LoadingState />;

  return (
    <>
      <Link to="/orders" className="row-flex text-muted" style={{ marginBottom: 16, fontWeight: 600 }}>
        <ChevronLeft size={18} /> Nazad na porudžbine
      </Link>

      <div className="row-flex" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: '0 0 6px' }}>{order.orderNumber}</h1>
          <p className="text-muted" style={{ margin: 0 }}>Kreirano: {formatDate(order.createdAt)}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        <Card><div className="card__body">
          <h3 style={{ marginTop: 0 }}>Dostava</h3>
          <p className="text-muted" style={{ margin: 0 }}>{order.deliveryAddress}</p>
        </div></Card>
        <Card><div className="card__body">
          <h3 style={{ marginTop: 0 }}>Napomena</h3>
          <p className="text-muted" style={{ margin: 0 }}>{order.note || '—'}</p>
        </div></Card>
      </div>

      <AdminTable>
        <thead>
          <tr>
            <th>Proizvod</th>
            <th>SKU</th>
            <th>Količina</th>
            <th>Cena</th>
            <th>PDV %</th>
            <th>Ukupno</th>
          </tr>
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

      <div style={{ maxWidth: 360, marginLeft: 'auto', marginTop: 20 }}>
        <Card><div className="card__body">
          <div className="row-flex" style={{ justifyContent: 'space-between' }}><span className="text-muted">Međuzbir</span><strong>{formatRsd(order.subtotal)}</strong></div>
          <div className="row-flex" style={{ justifyContent: 'space-between' }}><span className="text-muted">PDV</span><strong>{formatRsd(order.vatAmount)}</strong></div>
          <div className="row-flex" style={{ justifyContent: 'space-between', marginTop: 8, fontSize: '1.1rem' }}><span>Ukupno</span><strong>{formatRsd(order.total)}</strong></div>
        </div></Card>
      </div>
    </>
  );
}
