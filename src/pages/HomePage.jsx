import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  Globe2,
  KeyRound,
  Package,
  Quote,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Wallet
} from 'lucide-react';
import api from '../api/client';
import { ProductCard } from '../components/product/ProductCard.jsx';
import { Card } from '../components/ui/Card.jsx';
import { LoadingState } from '../components/ui/LoadingState.jsx';
import { IMAGES } from '../lib/images.js';
import { formatDate } from '../lib/format.js';

const HOMEPAGE_CATEGORIES = [
  { slug: 'drinks', label: 'Bezalkoholna pića', img: IMAGES.catDrinks, accent: '#0ea5e9' },
  { slug: 'laundry-detergents', label: 'Deterdženti za veš', img: IMAGES.catLaundry, accent: '#1d4ed8' },
  { slug: 'snacks', label: 'Grickalice', img: IMAGES.catSnacks, accent: '#b45309' },
  { slug: 'confectionery', label: 'Konditorski proizvodi', img: IMAGES.catCandy1, accent: '#db2777' },
  { slug: 'paper-towels', label: 'Kuhinjske i kućne maramice', img: IMAGES.catHygiene1, accent: '#0369a1' },
  { slug: 'personal-hygiene', label: 'Lična higijena', img: IMAGES.catHygiene2, accent: '#0d9488' },
  { slug: 'dishwashing', label: 'Mašinsko pranje sudova', img: IMAGES.catDishwash, accent: '#15803d' },
  { slug: 'air-fresheners', label: 'Osveživači prostora', img: IMAGES.catHygiene3, accent: '#7c3aed' },
  { slug: 'food', label: 'Prehrambeni proizvodi', img: IMAGES.catFood1, accent: '#0d9488' },
  { slug: 'cleaning-products', label: 'Sredstva za čišćenje', img: IMAGES.warehouseMinimal, accent: '#475569' }
];

const BENEFITS = [
  {
    icon: Wallet,
    title: 'Veleprodajne cene',
    text: 'Transparentne B2B cene odmah nakon odobrenja naloga.'
  },
  {
    icon: Truck,
    title: 'Brza distribucija',
    text: 'Organizovane rute u Beogradu i celoj Srbiji.'
  },
  {
    icon: ShieldCheck,
    title: 'Verifikovani kupci',
    text: 'Ručna provera APR-a i dokumentacije za svaku firmu.'
  },
  {
    icon: Clock3,
    title: 'Poručivanje 24/7',
    text: 'Sopstveni B2B web shop bez čekanja na poziv.'
  }
];

const STEPS = [
  {
    icon: ClipboardCheck,
    title: 'Registracija pravnog lica',
    text: 'Otvorite poslovni nalog za firmu ili STR prodavnicu i unesite osnovne podatke.'
  },
  {
    icon: ShieldCheck,
    title: 'Slanje poslovne dokumentacije',
    text: 'Dostavite APR podatke i potrebnu dokumentaciju za verifikaciju firme.'
  },
  {
    icon: KeyRound,
    title: 'Pristup veleprodajnim cenama',
    text: 'Nakon odobrenja naloga otključavate kompletan B2B katalog i akcijske ponude.'
  },
  {
    icon: ShoppingBag,
    title: 'B2B poručivanje online',
    text: 'Jednostavno poručujte hranu, piće i robu direktno kroz Vertex platformu.'
  }
];

const BRANDS = ['San Pellegrino', 'Pringles', 'Trolli', 'Haribo', 'Chupa Chups', 'Monini', 'Fairy', 'Persil'];

const TESTIMONIALS = [
  {
    company: 'Malkier',
    text: 'Vertex nam je pojednostavio nabavku robe široke potrošnje i organizaciju porudžbina. Kao firmi važni su nam stabilna distribucija, jasna komunikacija i pouzdani rokovi isporuke.'
  },
  {
    company: 'Pinpoint',
    text: 'Saradnja sa Vertexom omogućila nam je jednostavnije B2B poručivanje i bolju kontrolu nabavke. Posebno nam znači pregledan online katalog i efikasna distribucija robe za poslovne korisnike.'
  },
  {
    company: 'Consultech',
    text: 'U B2B veleprodaji najvažniji su kontinuitet i pouzdanost. Vertex distribucija nam je pokazala da digitalno poručivanje robe može biti brzo, pregledno i prilagođeno potrebama kupaca.'
  },
  {
    company: 'E-Box',
    text: 'Vertex je doneo moderniji pristup veleprodaji hrane, pića i robe široke potrošnje. Organizovana logistika i jednostavan proces poručivanja značajno olakšavaju svakodnevnu nabavku i planiranje isporuka.'
  }
];

const FAQS = [
  {
    q: 'Ko može da kupuje preko Vertex platforme?',
    a: 'Kupovina je dostupna registrovanim pravnim licima i STR prodavnicama sa PIB-om.'
  },
  {
    q: 'Kako funkcioniše poručivanje robe?',
    a: 'Nakon registracije i odobrenja naloga, možete pregledati naš katalog, dodati proizvode u korpu i poslati zahtev za porudžbinu online.'
  },
  {
    q: 'Da li vršite distribuciju van Beograda?',
    a: 'Da. Vertex distribucija organizuje isporuku robe za prodavnice i poslovne objekte širom Srbije.'
  },
  {
    q: 'Koje vrste proizvoda su dostupne?',
    a: 'U ponudi su hrana, piće, kafa, grickalice, slatkiši, ulja, hemija i roba široke potrošnje iz domaćeg i evropskog asortimana.'
  },
  {
    q: 'Kako funkcionišu isporuke i distribucione rute?',
    a: 'Isporuke se organizuju kroz planirane distribucione rute kako bi prodavnice imale stabilno i redovno snabdevanje robom.'
  },
  {
    q: 'Da li mogu da vidim cene bez registracije?',
    a: 'Deo proizvoda i cena je javno dostupan, dok su kompletan katalog i B2B cene dostupni registrovanim korisnicima.'
  },
  {
    q: 'Kako se vrši plaćanje?',
    a: 'Plaćanje se vrši preko računa, nakon potvrde porudžbine i dostavljenog predračuna.'
  },
  {
    q: 'Da li postoji minimalna količina za poručivanje?',
    a: 'Porudžbine se prilagođavaju potrebama prodavnica i poslovnih kupaca, u skladu sa dostupnim asortimanom i distribucijom.'
  },
  {
    q: 'Koliko traje odobrenje naloga?',
    a: 'Registracije se proveravaju ručno, a odobrenje naloga se najčešće završava u roku od 48 sati.'
  },
  {
    q: 'Da li mogu da pratim prethodne porudžbine?',
    a: 'Da. Registrovani korisnici imaju pregled istorije porudžbina i prethodne nabavke kroz svoj nalog.'
  }
];

export function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [prodRes, blogRes] = await Promise.all([
          api.get('/products', { params: { size: 40, sort: 'latest' } }).catch(() => ({ data: { content: [] } })),
          api.get('/blog').catch(() => ({ data: [] }))
        ]);
        if (cancelled) return;
        const withPublicPrice = (prodRes.data.content || []).filter((p) => p.priceVisible).slice(0, 8);
        setFeatured(withPublicPrice);
        const sorted = [...(blogRes.data || [])]
          .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
          .slice(0, 3);
        setBlogPosts(sorted);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <section className="vx-hero">
        <div className="vx-hero__bg" aria-hidden />
        <div className="vx-hero__grid">
          <div className="vx-hero__content">
            <span className="vx-pill">
              <Sparkles size={14} /> B2B veleprodaja · Vertex Distribution DOO
            </span>
            <h1>
              B2B veleprodaja hrane, pića i robe
              <span className="vx-hero__accent"> za STR prodavnice.</span>
            </h1>
            <p className="vx-hero__lede">
              Vertex distribucija povezuje registrovane firme i STR prodavnice sa pažljivo
              odabranim italijanskim i evropskim brendovima hrane, pića, kafe, hemije i potrošne
              robe. Poručivanje jednostavno, direktno iz online veleprodajnog kataloga.
            </p>
            <div className="vx-hero__cta">
              <Link to="/shop" className="btn btn--primary btn--lg">
                Pogledaj asortiman <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="btn btn--outline btn--lg">Registruj firmu</Link>
            </div>
            <div className="vx-hero__trust">
              <div>
                <strong>170+</strong>
                <span>proizvoda u katalogu</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>online poručivanje</span>
              </div>
              <div>
                <strong>Beograd & Srbija</strong>
                <span>pokrivenost isporukom</span>
              </div>
            </div>
          </div>
          <div className="vx-hero__visual">
            <img src={IMAGES.heroProducts} alt="Vertex asortiman: ulja, namirnice, prirodni proizvodi" />
            <div className="vx-hero__chip vx-hero__chip--top">
              <Truck size={16} /> Planirane rute
            </div>
            <div className="vx-hero__chip vx-hero__chip--bottom">
              <CheckCircle2 size={16} /> Verifikovani kupci
            </div>
          </div>
        </div>
      </section>

      <section className="vx-brandstrip">
        <span>Distribuiramo:</span>
        <div className="vx-brandstrip__list">
          {BRANDS.map((b) => <span key={b} className="vx-brandstrip__item">{b}</span>)}
        </div>
      </section>

      <section className="vx-section">
        <div className="vx-section__head">
          <div>
            <span className="vx-eyebrow">Zašto Vertex</span>
            <h2>Sve što jednoj radnji treba — na jednom B2B mestu</h2>
          </div>
          <p className="vx-section__sub">
            Kombinujemo širok asortiman robe široke potrošnje sa organizovanom logistikom.
            Vaša prodavnica dobija stabilan dotok robe i jasne uslove saradnje.
          </p>
        </div>
        <div className="vx-benefits">
          {BENEFITS.map((b) => (
            <div key={b.title} className="vx-benefit">
              <div className="vx-benefit__icon"><b.icon size={22} /></div>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="vx-section">
        <div className="vx-section__head">
          <div>
            <span className="vx-eyebrow">Asortiman</span>
            <h2>Kategorije proizvoda</h2>
          </div>
          <Link to="/shop" className="btn btn--outline btn--sm">
            Otvori prodavnicu <ArrowRight size={14} />
          </Link>
        </div>
        <div className="vx-cats">
          {HOMEPAGE_CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/categories/${c.slug}`} className="vx-cat">
              <div className="vx-cat__media">
                <img src={c.img} alt={c.label} loading="lazy" />
              </div>
              <div className="vx-cat__overlay" style={{ '--accent': c.accent }} />
              <div className="vx-cat__label">
                <span>{c.label}</span>
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {(loading || featured.length > 0) && (
        <section className="vx-section">
          <div className="vx-section__head">
            <div>
              <span className="vx-eyebrow">Bez registracije</span>
              <h2>Deo asortimana dostupan bez registracije</h2>
            </div>
            <Link to="/shop" className="btn btn--outline btn--sm">Ceo katalog</Link>
          </div>
          <p className="vx-section__sub" style={{ marginBottom: 24 }}>
            Izdvojili smo proizvode sa javno prikazanim cenama kako biste upoznali Vertex ponudu.
            Za pristup kompletnom katalogu, akcijskim cenama i poslovnim uslovima potrebna je
            registracija firme.
          </p>
          {loading ? <LoadingState /> : (
            <div className="grid-4 vx-products">
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>
      )}

      <section className="vx-section vx-process">
        <div className="vx-process__media">
          <img src={IMAGES.vertexWarehouseVan} alt="Vertex centralni magacin" loading="lazy" />
          <div className="vx-process__badge">
            <Globe2 size={18} /> Pokrivenost · Beograd & Srbija
          </div>
        </div>
        <div className="vx-process__body">
          <span className="vx-eyebrow">Proces</span>
          <h2>Kako funkcioniše Vertex distribucija</h2>
          <p className="vx-section__sub">
            Vertex omogućava brzo i jednostavno B2B poručivanje hrane, pića i robe za pravna lica
            kroz online veleprodajni katalog.
          </p>
          <div className="vx-steps">
            {STEPS.map((s, i) => (
              <div key={s.title} className="vx-step">
                <div className="vx-step__num">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="row-flex" style={{ marginTop: 24 }}>
            <Link to="/register" className="btn btn--primary">Otvori B2B nalog</Link>
            <Link to="/distribution-logistics" className="btn btn--outline">Distribucija i logistika</Link>
          </div>
        </div>
      </section>

      <section className="vx-section vx-logistics">
        <div className="vx-logistics__copy">
          <span className="vx-eyebrow">Distribucija</span>
          <h2>Distribucija i logistika za STR prodavnice</h2>
          <p>
            Vertex distribucija obezbeđuje pouzdanu isporuku hrane, pića i robe za pravna lica i
            male prodajne objekte širom Srbije. Kroz organizovanu B2B logistiku, planiranu
            distribuciju i pažljivo odabran asortiman omogućavamo stabilno snabdevanje vaše radnje.
          </p>
          <ul className="vx-checks">
            <li><CheckCircle2 size={18} /> Organizovane rute po regionima</li>
            <li><CheckCircle2 size={18} /> Pakovanje prilagođeno STR objektima</li>
            <li><CheckCircle2 size={18} /> Status porudžbine u realnom vremenu</li>
            <li><CheckCircle2 size={18} /> Podrška za sezonska povećanja potražnje</li>
          </ul>
          <Link to="/distribution-logistics" className="btn btn--secondary">
            Saznaj više <ArrowRight size={16} />
          </Link>
        </div>
        <div className="vx-logistics__visual">
          <img src={IMAGES.vertexVanPurple} alt="Vertex distributivna vozila i izlog prodavnice" />
        </div>
      </section>

      {blogPosts.length > 0 && (
        <section className="vx-section">
          <div className="vx-section__head">
            <div>
              <span className="vx-eyebrow">Blog</span>
              <h2>Saveti za prodavnice i veleprodaju</h2>
            </div>
            <Link to="/blog" className="btn btn--outline btn--sm">Svi članci</Link>
          </div>
          <div className="grid-3 blog-grid">
            {blogPosts.map((p) => (
              <Card key={p.slug} interactive className="blog-card">
                <div className="blog-card__media">
                  <img src={p.coverImageUrl || IMAGES.warehouseMinimal} alt={p.title} loading="lazy" />
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
        </section>
      )}

      <section className="vx-section vx-testimonials">
        <div className="vx-section__head">
          <div>
            <span className="vx-eyebrow">Utisci</span>
            <h2>Šta kažu naši poslovni partneri</h2>
          </div>
        </div>
        <div className="vx-testimonials__grid">
          {TESTIMONIALS.map((t) => (
            <figure key={t.company} className="vx-testimonial">
              <Quote className="vx-testimonial__quote" size={28} />
              <blockquote>„{t.text}"</blockquote>
              <figcaption>{t.company}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="vx-section vx-faq">
        <div className="vx-section__head">
          <div>
            <span className="vx-eyebrow">FAQ</span>
            <h2>Najčešće postavljena pitanja</h2>
          </div>
          <p className="vx-section__sub">
            Sve što treba da znate o saradnji, registraciji i poručivanju kroz Vertex platformu.
          </p>
        </div>
        <div className="article-faq vx-faq__list">
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="vx-final-cta">
        <div className="vx-final-cta__inner">
          <div>
            <h2>Spremni ste za efikasniju veleprodajnu nabavku?</h2>
            <p>Poručujte hranu, piće, kafu i robu za svoju prodavnicu jednostavno i brzo.</p>
          </div>
          <div className="vx-final-cta__actions">
            <Link to="/register" className="btn btn--primary btn--lg">Registracija</Link>
            <Link to="/login" className="btn btn--outline btn--lg">Prijava</Link>
            <Link to="/contact" className="btn btn--outline btn--lg">Kontakt</Link>
          </div>
        </div>
      </section>
    </>
  );
}
