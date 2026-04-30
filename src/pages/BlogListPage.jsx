import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import api from '../api/client';
import { Card } from '../components/ui/Card.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { LoadingState } from '../components/ui/LoadingState.jsx';
import { PageHero } from '../components/ui/PageHero.jsx';
import { formatDate } from '../lib/format.js';

export function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blog').then((r) => setPosts(r.data)).finally(() => setLoading(false));
  }, []);

  const featured = posts[0];

  return (
    <>
      <PageHero variant="light" title="Blog" subtitle="Saveti, novosti i informacije iz sveta distribucije, veleprodaje i B2B poručivanja." />

      {loading ? <LoadingState /> : posts.length === 0 ? (
        <EmptyState title="Trenutno nema objavljenih članaka" description="Vratite se uskoro — sadržaj se dopunjava." />
      ) : (
        <>
          {featured && (
            <Card interactive style={{ marginBottom: 32 }}>
              <div className="grid-2" style={{ gap: 0, alignItems: 'stretch' }}>
                <div className="card__media" style={{ aspectRatio: '16/10', borderRadius: 0 }}>
                  <img src={featured.coverImageUrl || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=700&fit=crop&q=80'} alt="" />
                </div>
                <div className="card__body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span className="badge badge--accent"><Sparkles size={12} /> Istaknuto</span>
                  <h2 style={{ margin: '12px 0 8px' }}>{featured.title}</h2>
                  <p className="text-muted">{featured.excerpt}</p>
                  <div className="text-muted" style={{ fontSize: '0.85rem', marginBottom: 12 }}>{formatDate(featured.publishedAt)}</div>
                  <Link className="btn btn--primary btn--sm" to={`/blog/${featured.slug}`}>Pročitaj članak <ArrowRight size={16} /></Link>
                </div>
              </div>
            </Card>
          )}

          <div className="grid-3">
            {posts.slice(1).map((p) => (
              <Card key={p.id} interactive>
                <div className="card__media" style={{ aspectRatio: '16/10' }}>
                  <img src={p.coverImageUrl || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop&q=80'} alt="" />
                </div>
                <div className="card__body">
                  <div className="text-muted" style={{ fontSize: '0.8rem', marginBottom: 6 }}>Blog · {formatDate(p.publishedAt)}</div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '1.05rem' }}>{p.title}</h3>
                  <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: 12 }}>{p.excerpt}</p>
                  <Link className="btn btn--outline btn--sm" to={`/blog/${p.slug}`}>Pročitaj</Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="sidebar-card" style={{ marginTop: 32 }}>
            <h3 style={{ marginTop: 0 }}>Popularne teme</h3>
            <ul className="text-muted" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Distribucija za STR</li><li>Logistika malih prodavnica</li><li>Digitalno B2B poručivanje</li>
            </ul>
            <Link to="/register" className="btn btn--primary" style={{ marginTop: 16, display: 'inline-flex' }}>Registruj firmu</Link>
          </div>
        </>
      )}
    </>
  );
}
