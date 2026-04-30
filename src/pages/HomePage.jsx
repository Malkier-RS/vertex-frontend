import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Package, Shield, Truck } from 'lucide-react';
import api from '../api/client';
import { CategoryCard } from '../components/product/CategoryCard.jsx';
import { ProductCard } from '../components/product/ProductCard.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card } from '../components/ui/Card.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { LoadingState } from '../components/ui/LoadingState.jsx';

const HIGHLIGHT_SLUGS = ['food', 'drinks', 'hygiene', 'household', 'coffee-and-snacks', 'pet-products'];

export function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [prodRes, blogRes, catRes] = await Promise.all([
          api.get('/products', { params: { size: 40, sort: 'latest' } }),
          api.get('/blog'),
          api.get('/categories')
        ]);
        if (cancelled) return;
        const withPublicPrice = prodRes.data.content.filter((p) => p.priceVisible).slice(0, 15);
        setFeatured(withPublicPrice);
        setPosts((blogRes.data || []).slice(0, 3));
        setCategories((catRes.data || []).filter((c) => HIGHLIGHT_SLUGS.includes(c.slug)));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <section className="hero-home">
        <div>
          <BadgePill />
          <h1 style={{ margin: '12px 0 16px', fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Jednostavno B2B poručivanje robe za vašu prodavnicu
          </h1>
          <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: 520, margin: 0 }}>
            Vertex distribucija povezuje STR prodavnice sa italijanskim i evropskim brendovima iz našeg veleprodajnog kataloga.
          </p>
          <div className="row-flex" style={{ marginTop: 24 }}>
            <Link to="/shop" className="btn btn--primary btn--lg">Pogledaj asortiman</Link>
            <Link to="/register" className="btn btn--outline btn--lg">Registruj firmu</Link>
          </div>
        </div>
        <div className="hero-home__visual">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=900&fit=crop&q=80"
            alt="Logistika i skladište"
          />
          <div className="hero-floating-card">
            <div>
              <div className="text-muted" style={{ fontSize: '0.8rem' }}>Status isporuke</div>
              <strong>Planirana ruta</strong>
            </div>
            <span className="badge badge--success"><Truck size={12} /> U roku</span>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        {[
          { icon: Package, t: 'Veleprodajne cene' },
          { icon: Shield, t: 'Ručna verifikacija kupaca' },
          { icon: Truck, t: 'Brza distribucija' },
          { icon: CheckCircle2, t: 'Poručivanje 24/7' }
        ].map((x) => (
          <div key={x.t} className="trust-item">
            <x.icon size={22} color="#0d9488" />
            {x.t}
          </div>
        ))}
      </div>

      <section className="section">
        <SectionHeader
          title="Izdvojeni proizvodi sa javnim cenama"
          subtitle="Pregledajte deo asortimana sa transparentnim cenama. Za kompletan katalog i B2B cene potrebna je odobrena registracija."
          actions={<Link to="/shop" className="btn btn--outline btn--sm">Ceo katalog</Link>}
        />
        {loading ? <LoadingState /> : (
          <div className="grid-4">{featured.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        )}
      </section>

      <section className="section">
        <SectionHeader title="Kako funkcioniše Vertex B2B?" subtitle="Proces je dizajniran da bude jasan, bez skrivenih koraka." />
        <div className="grid-2">
          {[
            'Registrujete firmu',
            'Dostavite APR i dokumentaciju',
            'Administrator ručno odobrava nalog',
            'Poručujete robu po B2B cenama'
          ].map((step, i) => (
            <Card key={step}>
              <div className="card__body" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div className="timeline__dot" style={{ flexShrink: 0 }}>{i + 1}</div>
                <div>
                  <h3 style={{ margin: '0 0 6px' }}>{step}</h3>
                  <p className="text-muted" style={{ margin: 0, fontSize: '0.95rem' }}>
                    {i === 0 && 'Popunite poslovne podatke i kontakt osobu.'}
                    {i === 1 && 'Bezbedno otpremate APR izvod i ličnu kartu ovlašćenog lica.'}
                    {i === 2 && 'Tim proverava dokumentaciju pre odobrenja pristupa cenama.'}
                    {i === 3 && 'Korpa, porudžbine i istorija — sve na jednom mestu.'}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <SectionHeader title="Distribucija i logistika" subtitle="Organizovana isporuka, jasni rokovi i podrška malim prodajnim objektima." />
            <p className="text-muted">
              Kombinujemo širok asortiman sa planiranom distribucijom kako bismo vašoj radnji obezbedili stabilan dotok robe.
            </p>
            <Link to="/distribution-logistics" className="btn btn--secondary" style={{ marginTop: 12 }}>Saznaj više</Link>
          </div>
          <Card>
            <div className="card__media" style={{ aspectRatio: '4/3', borderRadius: 'var(--radius-lg)' }}>
              <img src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1000&h=750&fit=crop&q=80" alt="Isporuka" />
            </div>
          </Card>
        </div>
      </section>

      <section className="section">
        <SectionHeader title="Kategorije asortimana" subtitle="Brz pristup najtraženim grupama proizvoda." />
        <div className="grid-3">
          {categories.length ? categories.map((c) => <CategoryCard key={c.id} category={c} />) : (
            <p className="text-muted">Kategorije se učitavaju…</p>
          )}
        </div>
      </section>

      <section className="section">
        <SectionHeader title="Blog" subtitle="Saveti iz sveta veleprodaje, logistike i digitalnog B2B poručivanja." actions={<Link to="/blog" className="btn btn--outline btn--sm">Svi članci</Link>} />
        <div className="grid-3">
          {posts.map((p) => (
            <Card key={p.id} interactive>
              <div className="card__media" style={{ aspectRatio: '16/10' }}>
                <img src={p.coverImageUrl || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop&q=80'} alt="" />
              </div>
              <div className="card__body">
                <h3 style={{ margin: '0 0 8px', fontSize: '1.05rem' }}>{p.title}</h3>
                <p className="text-muted" style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>{p.excerpt}</p>
                <Link className="btn btn--ghost btn--sm" to={`/blog/${p.slug}`}>Pročitaj</Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="page-hero" style={{ marginBottom: 0 }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '1.5rem' }}>Spremni ste za digitalno poručivanje robe?</h2>
          <p style={{ margin: 0, opacity: 0.95 }}>Registrujte firmu ili nas kontaktirajte za uslove saradnje.</p>
          <div className="page-hero__actions">
            <Link to="/register" className="btn btn--primary btn--lg">Registracija</Link>
            <Link to="/login" className="btn btn--outline btn--lg">Prijava</Link>
            <Link to="/contact" className="btn btn--outline btn--lg">Kontakt</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function BadgePill() {
  return <Badge tone="accent" style={{ fontSize: '0.8rem' }}>B2B veleprodaja · STR prodavnice</Badge>;
}


