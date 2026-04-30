import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ChevronDown, LayoutGrid, List, Search } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext.jsx';
import { ProductCard } from '../components/product/ProductCard.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { LoadingState } from '../components/ui/LoadingState.jsx';
import { PageHero } from '../components/ui/PageHero.jsx';
import { PriceVisibilityNotice } from '../components/ui/PriceVisibilityNotice.jsx';
import { Button } from '../components/ui/Button.jsx';
import { STOCK_STATUS_OPTIONS } from '../lib/labels.js';

export function ShopPage() {
  const { slug: categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 0, totalPages: 1, totalElements: 0 });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');

  const filters = useMemo(() => ({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    stockStatus: searchParams.get('stockStatus') || '',
    sort: searchParams.get('sort') || 'latest',
    page: Number(searchParams.get('page') || 0),
    size: 12
  }), [searchParams]);

  useEffect(() => {
    api.get('/categories').then((r) => setCategories(r.data));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api.get('/products', { params: filters }).then((r) => {
      if (cancelled) return;
      setProducts(r.data.content);
      setMeta({ page: r.data.page, totalPages: r.data.totalPages, totalElements: r.data.totalElements });
      const b = [...new Set(r.data.content.map((p) => p.brand).filter(Boolean))];
      setBrands(b);
    }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [filters]);

  useEffect(() => {
    if (categorySlug) {
      const next = new URLSearchParams(searchParams);
      next.set('category', categorySlug);
      next.set('page', '0');
      setSearchParams(next, { replace: true });
    }
  }, [categorySlug]);

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    if (key !== 'page') next.set('page', '0');
    setSearchParams(next);
  };

  const resultLabel = `${meta.totalElements} rezultata`;

  return (
    <>
      <PageHero variant="light" title="Prodavnica" subtitle="Pregledajte asortiman robe široke potrošnje za STR prodavnice." />

      <div className="shop-layout">
        <aside className="shop-sidebar">
          <div className="sidebar-card">
            <h3>Kategorije</h3>
            <div className="sidebar-links">
              <Link to="/shop" onClick={() => setFilter('category', '')}>Sve kategorije</Link>
              {categories.map((c) => (
                <Link key={c.id} to={`/shop?category=${c.slug}`}>{c.name}</Link>
              ))}
            </div>
          </div>
          <PriceVisibilityNotice user={user} />
        </aside>

        <div>
          <div className="shop-filters">
            <div className="shop-filters__main">
              <div className="shop-filters__search">
                <Search size={18} className="shop-filters__search-icon" aria-hidden />
                <input
                  type="search"
                  className="shop-filters__search-input"
                  placeholder="Pretraga po nazivu, SKU, barkodu…"
                  value={filters.search}
                  onChange={(e) => setFilter('search', e.target.value)}
                  aria-label="Pretraga proizvoda"
                />
              </div>
              <div className="shop-filters__selects">
                <div className="shop-filters__field">
                  <label className="shop-filters__label" htmlFor="shop-filter-category">Kategorija</label>
                  <div className="shop-filters__select-wrap">
                    <select
                      id="shop-filter-category"
                      className="shop-filters__control"
                      value={filters.category}
                      onChange={(e) => setFilter('category', e.target.value)}
                    >
                      <option value="">Sve kategorije</option>
                      {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
                    </select>
                    <ChevronDown size={16} className="shop-filters__chevron" aria-hidden />
                  </div>
                </div>
                <div className="shop-filters__field">
                  <label className="shop-filters__label" htmlFor="shop-filter-brand">Brend</label>
                  <div className="shop-filters__select-wrap">
                    <select
                      id="shop-filter-brand"
                      className="shop-filters__control"
                      value={filters.brand}
                      onChange={(e) => setFilter('brand', e.target.value)}
                    >
                      <option value="">Svi brendovi</option>
                      {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <ChevronDown size={16} className="shop-filters__chevron" aria-hidden />
                  </div>
                </div>
                <div className="shop-filters__field">
                  <label className="shop-filters__label" htmlFor="shop-filter-stock">Dostupnost</label>
                  <div className="shop-filters__select-wrap">
                    <select
                      id="shop-filter-stock"
                      className="shop-filters__control"
                      value={filters.stockStatus}
                      onChange={(e) => setFilter('stockStatus', e.target.value)}
                    >
                      <option value="">Sve</option>
                      {STOCK_STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <ChevronDown size={16} className="shop-filters__chevron" aria-hidden />
                  </div>
                </div>
                <div className="shop-filters__field">
                  <label className="shop-filters__label" htmlFor="shop-filter-sort">Sortiranje</label>
                  <div className="shop-filters__select-wrap">
                    <select
                      id="shop-filter-sort"
                      className="shop-filters__control"
                      value={filters.sort}
                      onChange={(e) => setFilter('sort', e.target.value)}
                    >
                      <option value="latest">Najnovije</option>
                      <option value="name">Naziv (A–Š)</option>
                      <option value="price">Cena</option>
                    </select>
                    <ChevronDown size={16} className="shop-filters__chevron" aria-hidden />
                  </div>
                </div>
              </div>
              <div className="shop-filters__views" role="group" aria-label="Način prikaza">
                <button
                  type="button"
                  className={`shop-filters__view-btn ${view === 'grid' ? 'is-active' : ''}`}
                  onClick={() => setView('grid')}
                  aria-label="Mreža"
                  aria-pressed={view === 'grid'}
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  type="button"
                  className={`shop-filters__view-btn ${view === 'list' ? 'is-active' : ''}`}
                  onClick={() => setView('list')}
                  aria-label="Lista"
                  aria-pressed={view === 'list'}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
            <div className="shop-filters__meta">
              <span className="shop-filters__count">{resultLabel}</span>
            </div>
          </div>

          {loading ? <LoadingState /> : products.length === 0 ? (
            <EmptyState title="Nema proizvoda za izabrane filtere" description="Pokušajte da proširite pretragu ili resetujte filtere." action={<Button type="button" variant="outline" onClick={() => setSearchParams(new URLSearchParams())}>Resetuj filtere</Button>} />
          ) : (
            <div className={view === 'grid' ? 'grid-3' : 'grid-1'} style={{ gap: view === 'list' ? 12 : undefined }}>
              {products.map((p) => <ProductCard key={p.id} product={p} layout={view} />)}
            </div>
          )}

          <div className="row-flex" style={{ justifyContent: 'center', marginTop: 24 }}>
            <Button type="button" variant="outline" disabled={meta.page <= 0} onClick={() => setFilter('page', String(meta.page - 1))}>Prethodna</Button>
            <span className="text-muted">Strana {meta.page + 1} / {Math.max(meta.totalPages, 1)}</span>
            <Button type="button" variant="outline" disabled={meta.page + 1 >= meta.totalPages} onClick={() => setFilter('page', String(meta.page + 1))}>Sledeća</Button>
          </div>
        </div>
      </div>
    </>
  );
}
