import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ChevronRight, Clock3 } from 'lucide-react';
import api from '../api/client';
import { LoadingState } from '../components/ui/LoadingState.jsx';
import { Card } from '../components/ui/Card.jsx';
import { formatDate } from '../lib/format.js';
import { IMAGES } from '../lib/images.js';

const FALLBACK_COVER = IMAGES.warehouseMinimal;

function renderSection(section, idx) {
  switch (section.kind) {
    case 'heading':
      return <h2 key={idx} className="article-h2">{section.text}</h2>;
    case 'subheading':
      return <h3 key={idx} className="article-h3">{section.text}</h3>;
    case 'paragraph':
      return <p key={idx}>{section.text}</p>;
    case 'list':
      return (
        <ul key={idx} className="article-list">
          {(section.items || []).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case 'image':
      return (
        <figure key={idx} className="article-figure">
          <img src={section.src} alt={section.alt || ''} loading="lazy" />
          {section.caption && <figcaption>{section.caption}</figcaption>}
        </figure>
      );
    case 'callout':
      return (
        <aside key={idx} className="article-callout">
          {section.title && <strong>{section.title}</strong>}
          <p>{section.text}</p>
        </aside>
      );
    case 'faq':
      return (
        <div key={idx} className="article-faq">
          {(section.items || []).map((it, i) => (
            <details key={i}>
              <summary>{it.q}</summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    setPost(null);
    setNotFound(false);
    api
      .get(`/blog/${slug}`)
      .then((r) => setPost(r.data))
      .catch(() => setNotFound(true));
  }, [slug]);

  useEffect(() => {
    api
      .get('/blog')
      .then((r) => {
        const others = (Array.isArray(r.data) ? r.data : []).filter((p) => p.slug !== slug).slice(0, 3);
        setRelated(others);
      })
      .catch(() => setRelated([]));
  }, [slug]);

  if (notFound) {
    return (
      <div className="empty-state">
        <h2 style={{ marginTop: 0 }}>Članak nije pronađen</h2>
        <p className="text-muted">Pogledajte ostale tekstove na našem blogu.</p>
        <Link to="/blog" className="btn btn--primary" style={{ marginTop: 12 }}>Nazad na blog</Link>
      </div>
    );
  }
  if (!post) return <LoadingState />;

  const hasSections = Array.isArray(post.sections) && post.sections.length > 0;

  return (
    <>
      <nav className="breadcrumbs">
        <Link to="/">Početna</Link>
        <ChevronRight size={14} />
        <Link to="/blog">Blog</Link>
        <ChevronRight size={14} />
        <span>{post.title}</span>
      </nav>

      <header className="article-header">
        {post.tags && post.tags[0] && <span className="badge badge--accent">{post.tags[0]}</span>}
        <h1 className="article-title">{post.title}</h1>
        {post.excerpt && <p className="article-lede">{post.excerpt}</p>}
        <div className="article-meta">
          <span>Objavljeno: {formatDate(post.publishedAt)}</span>
          {post.readingTimeMinutes && (
            <span className="row-flex" style={{ gap: 4 }}>
              <Clock3 size={14} /> {post.readingTimeMinutes} min čitanja
            </span>
          )}
        </div>
      </header>

      <div className="article-cover">
        <img src={post.coverImageUrl || FALLBACK_COVER} alt={post.title} loading="eager" />
      </div>

      <article className="article-body">
        {hasSections
          ? post.sections.map(renderSection)
          : (post.content || '').split('\n').map((para, i) => <p key={i}>{para}</p>)}
      </article>

      {related.length > 0 && (
        <section className="article-related">
          <h2>Slični članci</h2>
          <div className="grid-3 blog-grid">
            {related.map((p) => (
              <Card key={p.id} interactive className="blog-card">
                <div className="blog-card__media">
                  <img src={p.coverImageUrl || FALLBACK_COVER} alt={p.title} loading="lazy" />
                </div>
                <div className="blog-card__body">
                  <div className="blog-meta">
                    <span>{formatDate(p.publishedAt)}</span>
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
        </section>
      )}

      <section className="blog-cta">
        <div className="blog-cta__content">
          <h2>Spremni da digitalizujete nabavku?</h2>
          <p>
            Registrujte firmu na Vertex distribuciji i poručujte robu široke potrošnje po
            transparentnim B2B cenama – brzo, jednostavno, sa jasnim rokovima isporuke.
          </p>
          <div className="row-flex" style={{ marginTop: 16 }}>
            <Link to="/register" className="btn btn--primary btn--lg">Registracija</Link>
            <Link to="/shop" className="btn btn--outline btn--lg">Pogledaj asortiman</Link>
          </div>
        </div>
      </section>
    </>
  );
}
