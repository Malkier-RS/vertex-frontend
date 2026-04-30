import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Lock, Minus, Package, Plus, ShoppingCart } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatRsd } from '../lib/format.js';
import { productImageUrl } from '../lib/productImage.js';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';
import { LoadingState } from '../components/ui/LoadingState.jsx';
import { ProductCard } from '../components/product/ProductCard.jsx';
import { stockStatusLabel } from '../lib/labels.js';

export function ProductDetailPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const { add, items } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    let cancelled = false;
    api.get(`/products/${slug}`).then((r) => {
      if (cancelled) return;
      setProduct(r.data);
    });
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    if (!product) return;
    api.get('/products', { params: { size: 40, sort: 'latest' } }).then((res) => {
      const cat = product.category;
      const same = res.data.content.filter((p) => p.category === cat && p.slug !== product.slug).slice(0, 4);
      setRelated(same.length ? same : res.data.content.filter((p) => p.slug !== product.slug).slice(0, 4));
    });
  }, [product]);

  if (!product) return <LoadingState />;

  const img = productImageUrl(product);
  const canOrder = user?.status === 'APPROVED' && product.priceVisible;
  const lineQty = items.find((i) => i.id === product.id)?.quantity;

  const addWithQty = () => {
    for (let i = 0; i < qty; i++) add(product);
  };

  return (
    <>
      <nav className="breadcrumbs">
        <Link to="/">Početna</Link>
        <ChevronRight size={14} />
        <Link to="/shop">Prodavnica</Link>
        <ChevronRight size={14} />
        <span>{product.name}</span>
      </nav>

      <div className="grid-2" style={{ alignItems: 'start', marginBottom: 32 }}>
        <Card>
          <div className="card__media" style={{ aspectRatio: '1/1', borderRadius: 'var(--radius-lg)' }}>
            <img src={img} alt="" />
          </div>
        </Card>

        <div>
          <div className="row-flex" style={{ marginBottom: 12 }}>
            {product.category && <Badge tone="neutral">{product.category}</Badge>}
            <Badge tone={product.stockStatus === 'IN_STOCK' ? 'success' : 'warning'}>{stockStatusLabel(product.stockStatus)}</Badge>
          </div>
          <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(1.6rem, 3vw, 2rem)', letterSpacing: '-0.02em' }}>{product.name}</h1>
          <p className="text-muted" style={{ fontSize: '1.05rem' }}>{product.shortDescription}</p>
          <div className="text-muted" style={{ fontSize: '0.9rem', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className="row-flex" style={{ gap: 8 }}><Package size={16} /> SKU: <strong style={{ color: 'var(--color-text)' }}>{product.sku}</strong></span>
            {product.brand && <span>Brend: <strong style={{ color: 'var(--color-text)' }}>{product.brand}</strong></span>}
            {product.barcode && <span>EAN: <strong style={{ color: 'var(--color-text)' }}>{product.barcode}</strong></span>}
            {product.countryOfOrigin && <span>Poreklo: <strong style={{ color: 'var(--color-text)' }}>{product.countryOfOrigin}</strong></span>}
          </div>

          {product.priceVisible ? (
            <div style={{ marginBottom: 20 }}>
              <div className="price-amount">{formatRsd(product.price)}</div>
              <div className="text-muted" style={{ fontSize: '0.9rem' }}>PDV {product.vatRate}% uračunat u prikazanu cenu.</div>
            </div>
          ) : (
            <div className="price-panel price-panel--locked" style={{ marginBottom: 20 }}>
              <div className="row-flex" style={{ gap: 8, marginBottom: 8 }}>
                <Lock size={18} />
                <strong>B2B cena je zaključana</strong>
              </div>
              <p style={{ margin: 0 }} className="text-muted">{product.priceMessage || 'Cena dostupna nakon odobrenja naloga'}</p>
              {!user && (
                <div className="row-flex" style={{ marginTop: 12 }}>
                  <Link to="/login" className="btn btn--outline btn--sm">Prijava</Link>
                  <Link to="/register" className="btn btn--primary btn--sm">Registracija</Link>
                </div>
              )}
            </div>
          )}

          {canOrder && (
            <div className="row-flex" style={{ marginBottom: 16 }}>
              <div className="row-flex" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 4 }}>
                <button type="button" className="icon-btn icon-btn--ghost" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus size={16} /></button>
                <span style={{ minWidth: 32, textAlign: 'center', fontWeight: 700 }}>{qty}</span>
                <button type="button" className="icon-btn icon-btn--ghost" onClick={() => setQty((q) => q + 1)}><Plus size={16} /></button>
              </div>
              <Button type="button" variant="primary" onClick={addWithQty}><ShoppingCart size={18} /> Dodaj u korpu</Button>
            </div>
          )}

          {user?.status === 'APPROVED' && lineQty && (
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>U korpi: {lineQty} kom</p>
          )}
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 40 }}>
        <Card><div className="card__body"><h3 style={{ marginTop: 0 }}>Opis proizvoda</h3><p className="text-muted" style={{ whiteSpace: 'pre-wrap' }}>{product.description || '—'}</p></div></Card>
        <Card><div className="card__body"><h3 style={{ marginTop: 0 }}>Pakovanje i jedinica mere</h3><p className="text-muted">Jedinica mere: <strong>{product.unitOfMeasure}</strong><br />Pakovanje: <strong>{product.packageSize || '—'}</strong></p><h3>PDV i napomene</h3><p className="text-muted">Stopa PDV: {product.vatRate}%</p><h3>Dostava i logistika</h3><p className="text-muted">Rokovi isporuke zavise od rute i dostupnosti robe. Naš tim vas obaveštava o statusu porudžbine.</p></div></Card>
      </div>

      <section>
        <h2 style={{ marginBottom: 16 }}>Slični proizvodi</h2>
        <div className="grid-4">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>
    </>
  );
}
