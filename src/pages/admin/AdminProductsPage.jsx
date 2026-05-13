import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { AdminTable } from '../../components/ui/AdminTable.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { LoadingState } from '../../components/ui/LoadingState.jsx';
import { formatRsd } from '../../lib/format.js';
import { productImageUrl } from '../../lib/productImage.js';
import { stockStatusLabel, STOCK_STATUS_OPTIONS } from '../../lib/labels.js';
import { SelectField } from '../../components/ui/SelectField.jsx';

export function AdminProductsPage() {
  const [items, setItems] = useState([]);
  const [stockStatus, setStockStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const load = () => api.get('/admin/products', { params: stockStatus ? { stockStatus } : {} }).then((r) => setItems(r.data));

  useEffect(() => { load().finally(() => setLoading(false)); }, [stockStatus]);

  if (loading) return <LoadingState />;

  return (
    <>
      <div className="row-flex" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Proizvodi</h1>
        <Link to="/admin/products/new" className="btn btn--primary">Novi proizvod</Link>
      </div>
      <div className="toolbar">
        <div style={{ minWidth: 220, flex: '0 1 260px' }}>
          <SelectField
            label="Dostupnost"
            value={stockStatus}
            emptyLabel="Sve"
            options={STOCK_STATUS_OPTIONS}
            onChange={(e) => setStockStatus(e.target.value)}
          />
        </div>
      </div>
      <AdminTable>
        <thead>
          <tr>
            <th />
            <th>Naziv</th>
            <th>SKU</th>
            <th>Brend</th>
            <th>Kategorija</th>
            <th>Cena</th>
            <th>Javna cena</th>
            <th>Zaliha</th>
            <th>Aktivan</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td><img className="thumb" src={productImageUrl(p)} alt="" /></td>
              <td><strong>{p.name}</strong></td>
              <td>{p.sku}</td>
              <td>{p.brand?.name || <span className="text-muted">—</span>}</td>
              <td>{p.category?.name}</td>
              <td>{formatRsd(p.price)}</td>
              <td>{p.publiclyVisiblePrice ? <Badge tone="success">Da</Badge> : <Badge tone="neutral">Ne</Badge>}</td>
              <td><Badge tone={p.stockStatus === 'IN_STOCK' ? 'success' : p.stockStatus === 'LOW_STOCK' ? 'warning' : 'neutral'}>{stockStatusLabel(p.stockStatus)}</Badge></td>
              <td>{p.active ? <Badge tone="success">Da</Badge> : <Badge tone="danger">Ne</Badge>}</td>
              <td className="row-flex">
                <Link className="btn btn--outline btn--sm" to={`/admin/products/${p.id}/edit`}>Izmeni</Link>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => api.delete(`/admin/products/${p.id}`).then(load)}>Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </>
  );
}
