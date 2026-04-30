import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categoryCoverUrl } from '../../lib/productImage.js';
import { Card } from '../ui/Card.jsx';

export function CategoryCard({ category }) {
  const cover = categoryCoverUrl(category.slug);
  return (
    <Card interactive>
      <div className="card__media" style={{ aspectRatio: '16/10' }}>
        <img src={cover} alt="" loading="lazy" />
      </div>
      <div className="card__body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.05rem' }}>{category.name}</h3>
          <p className="text-muted" style={{ margin: '6px 0 0', fontSize: '0.875rem' }}>Pregledaj proizvode u kategoriji</p>
        </div>
        <Link className="btn btn--ghost btn--sm" to={`/categories/${category.slug}`}>
          Otvori <ArrowRight size={16} />
        </Link>
      </div>
    </Card>
  );
}
