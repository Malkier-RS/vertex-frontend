import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import api from '../api/client';
import { LoadingState } from '../components/ui/LoadingState.jsx';
import { Card } from '../components/ui/Card.jsx';
import { formatDate } from '../lib/format.js';

export function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    api.get(`/blog/${slug}`).then((r) => setPost(r.data));
  }, [slug]);

  useEffect(() => {
    api.get('/blog').then((r) => setRelated((r.data || []).filter((p) => p.slug !== slug).slice(0, 3)));
  }, [slug]);

  if (!post) return <LoadingState />;

  return (
    <>
      <nav className="breadcrumbs">
        <Link to="/">Početna</Link>
        <ChevronRight size={14} />
        <Link to="/blog">Blog</Link>
        <ChevronRight size={14} />
        <span>{post.title}</span>
      </nav>

      <header style={{ marginBottom: 24 }}>
        <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', letterSpacing: '-0.02em' }}>{post.title}</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: 720 }}>{post.excerpt}</p>
        <div className="text-muted" style={{ fontSize: '0.9rem', marginTop: 8 }}>Objavljeno: {formatDate(post.publishedAt)}</div>
      </header>

      <div className="card__media" style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: 28, maxHeight: 420 }}>
        <img src={post.coverImageUrl || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&h=700&fit=crop&q=80'} alt="" style={{ width: '100%', objectFit: 'cover' }} />
      </div>

      <article className="article-body">
        {post.content.split('\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </article>

      {related.length > 0 && (
        <section style={{ marginTop: 48 }}>
          <h2>Slični članci</h2>
          <div className="grid-3">
            {related.map((p) => (
              <Card key={p.id} interactive>
                <div className="card__body">
                  <h3 style={{ marginTop: 0 }}>{p.title}</h3>
                  <Link className="btn btn--ghost btn--sm" to={`/blog/${p.slug}`}>Pročitaj</Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      <div className="page-hero page-hero--light" style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: '1.25rem', margin: '0 0 8px' }}>Želite lakše B2B poručivanje?</h2>
        <p className="text-muted" style={{ margin: 0 }}>Registrujte firmu i digitalizujte nabavku.</p>
        <div className="page-hero__actions">
          <Link to="/register" className="btn btn--primary">Registracija</Link>
          <Link to="/contact" className="btn btn--outline">Kontakt</Link>
        </div>
      </div>
    </>
  );
}
