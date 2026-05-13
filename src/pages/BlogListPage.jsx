import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock3, Sparkles } from 'lucide-react';
import api from '../api/client';
import { Card } from '../components/ui/Card.jsx';
import { LoadingState } from '../components/ui/LoadingState.jsx';
import { PageHero } from '../components/ui/PageHero.jsx';
import { formatDate } from '../lib/format.js';
import { IMAGES } from '../lib/images.js';

const FALLBACK_COVER = IMAGES.warehouseMinimal;

export function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/blog')
      .then((r) => {
        const list = Array.isArray(r.data) ? [...r.data] : [];
        list.sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
        setPosts(list);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <PageHero
        variant="light"
        title="Blog Vertex distribucije"
        subtitle="Saveti, novosti i vodiči iz sveta veleprodaje, logistike i B2B poručivanja robe široke potrošnje."
      />

      {loading ? <LoadingState /> : (
        <>
          {featured && (
            <Card interactive className="blog-featured">
              <div className="blog-featured__grid">
                <div className="blog-featured__media">
                  <img
                    src={featured.coverImageUrl || FALLBACK_COVER}
                    alt={featured.title}
                    loading="eager"
                  />
                </div>
                <div className="blog-featured__body">
                  <span className="badge badge--accent"><Sparkles size={12} /> Istaknuto</span>
                  <h2 className="blog-featured__title">{featured.title}</h2>
                  <p className="text-muted blog-featured__excerpt">{featured.excerpt}</p>
                  <div className="blog-meta">
                    <span>{formatDate(featured.publishedAt)}</span>
                    {featured.readingTimeMinutes && (
                      <span className="row-flex" style={{ gap: 4 }}>
                        <Clock3 size={13} /> {featured.readingTimeMinutes} min čitanja
                      </span>
                    )}
                  </div>
                  <Link className="btn btn--primary" to={`/blog/${featured.slug}`}>
                    Pročitaj članak <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </Card>
          )}

          {rest.length > 0 && (
            <div className="grid-3 blog-grid">
              {rest.map((p) => (
                <Card key={p.id} interactive className="blog-card">
                  <div className="blog-card__media">
                    <img src={p.coverImageUrl || FALLBACK_COVER} alt={p.title} loading="lazy" />
                    {p.tags && p.tags[0] && <span className="blog-card__tag">{p.tags[0]}</span>}
                  </div>
                  <div className="blog-card__body">
                    <div className="blog-meta">
                      <span>{formatDate(p.publishedAt)}</span>
                      {p.readingTimeMinutes && (
                        <span className="row-flex" style={{ gap: 4 }}>
                          <Clock3 size={12} /> {p.readingTimeMinutes} min
                        </span>
                      )}
                    </div>
                    <h3 className="blog-card__title">{p.title}</h3>
                    <p className="text-muted blog-card__excerpt">{p.excerpt}</p>
                    <Link className="btn btn--ghost btn--sm" to={`/blog/${p.slug}`}>
                      Pročitaj <ArrowRight size={14} />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {posts.length === 0 && (
            <div className="empty-state">
              <h2 style={{ marginTop: 0 }}>Nema objavljenih članaka</h2>
              <p className="text-muted">Uskoro ćemo objaviti nove tekstove iz sveta B2B distribucije.</p>
            </div>
          )}

          <section className="blog-cta">
            <div className="blog-cta__content">
              <h2>Pretvorite blog savete u stvarne rezultate</h2>
              <p>
                Otvorite besplatan B2B nalog na Vertex platformi i poručujte robu široke potrošnje
                online — brzo, transparentno i bez nepotrebne administracije.
              </p>
              <div className="row-flex" style={{ marginTop: 16 }}>
                <Link to="/register" className="btn btn--primary btn--lg">Registracija firme</Link>
                <Link to="/contact" className="btn btn--outline btn--lg">Kontaktirajte nas</Link>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
