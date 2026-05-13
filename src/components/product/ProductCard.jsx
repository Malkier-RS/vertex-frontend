import { Link } from 'react-router-dom';
import { ArrowRight, Lock, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { formatRsd } from '../../lib/format.js';
import { productImageUrl } from '../../lib/productImage.js';
import { Badge } from '../ui/Badge.jsx';
import { Button } from '../ui/Button.jsx';
import { Card } from '../ui/Card.jsx';
import { stockStatusLabel } from '../../lib/labels.js';

export function ProductCard({ product, layout = 'grid' }) {
  const { user } = useAuth();
  const { add } = useCart();
  const img = productImageUrl(product);
  const outOfStock = product.stockStatus === 'OUT_OF_STOCK';
  const canOrder = user?.status === 'APPROVED' && product.priceVisible && !outOfStock;

  // Link styled as button where needed (no Radix asChild).
  const secondaryCta = !user ? (
    <Link className="btn btn--outline btn--sm" to="/register">Registruj se za cene</Link>
  ) : user.status === 'PENDING' ? (
    <span className="btn btn--outline btn--sm" style={{ opacity: 0.6, cursor: 'not-allowed' }}>Čeka odobrenje</span>
  ) : (
    <Link className="btn btn--outline btn--sm" to={`/shop/${product.slug}`}>Detalji</Link>
  );

  return (
    <Card interactive className={layout === 'list' ? 'product-card--list' : 'product-card'}>
      <div className="card__media">
        <img src={img} alt="" loading="lazy" />
        {outOfStock && <div className="product-card__stamp">NEMA NA STANJU</div>}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {product.category && <Badge tone="neutral">{product.category}</Badge>}
          {product.featured && <Badge tone="accent">Istaknuto</Badge>}
          {product.stockStatus && <Badge tone={outOfStock ? 'danger' : product.stockStatus === 'LOW_STOCK' ? 'warning' : 'success'}>{stockStatusLabel(product.stockStatus)}</Badge>}
        </div>
      </div>
      <div className="card__body product-card__body">
        {product.brand && (
          <div className="product-card__brand" style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 4 }}>
            {product.brand}
          </div>
        )}
        <Link to={`/shop/${product.slug}`} style={{ color: 'inherit' }}>
          <h3 className="product-card__title" style={{ margin: '0 0 8px', fontSize: '1.05rem', letterSpacing: '-0.02em' }}>{product.name}</h3>
        </Link>
        <p className="text-muted product-card__summary" style={{ margin: '0 0 10px', fontSize: '0.875rem', minHeight: 38 }}>
          {product.shortDescription || '—'}
        </p>
        <div className="text-muted product-card__meta" style={{ fontSize: '0.8rem', marginBottom: 10 }}>
          SKU: <strong style={{ color: 'var(--color-text)' }}>{product.sku}</strong>
          {product.unitOfMeasure && (
            <>
              {' · '}
              {product.packageSize ? `${product.packageSize} · ` : ''}
              {product.unitOfMeasure}
            </>
          )}
        </div>
        {product.priceVisible ? (
          <div className="product-card__price" style={{ marginBottom: 12 }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{formatRsd(product.price)}</div>
            <div className="text-muted" style={{ fontSize: '0.8rem' }}>PDV {product.vatRate}% uračunat u cenu</div>
          </div>
        ) : (
          <div className="price-panel price-panel--locked product-card__price" style={{ marginBottom: 12 }}>
            <div className="row-flex" style={{ gap: 8, marginBottom: 4 }}>
              <Lock size={16} />
              <strong style={{ fontSize: '0.9rem' }}>Cena zaključana</strong>
            </div>
            <div className="text-muted" style={{ fontSize: '0.85rem' }}>
              {product.priceMessage || 'Cena dostupna nakon odobrenja naloga'}
            </div>
          </div>
        )}
        <div className="row-flex product-card__actions" style={{ justifyContent: 'space-between' }}>
          {canOrder ? (
            <Button type="button" variant="primary" size="sm" onClick={() => add(product)}>
              <ShoppingCart size={16} /> Dodaj u korpu
            </Button>
          ) : (
            secondaryCta
          )}
          <Link className="btn btn--ghost btn--sm" to={`/shop/${product.slug}`}>
            Više <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </Card>
  );
}
