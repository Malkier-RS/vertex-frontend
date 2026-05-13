import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../api/client';
import { Card } from '../../components/ui/Card.jsx';
import { FormField } from '../../components/ui/FormField.jsx';
import { SelectField } from '../../components/ui/SelectField.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { LoadingState } from '../../components/ui/LoadingState.jsx';
import { STOCK_STATUS_LABELS } from '../../lib/labels.js';

const STOCK_OPTIONS = Object.entries(STOCK_STATUS_LABELS).map(([value, label]) => ({ value, label }));

const empty = {
  name: '', slug: '', description: '', shortDescription: '', sku: '', barcode: '', countryOfOrigin: '', brandId: '',
  unitOfMeasure: 'kom', packageSize: '', imageUrl: '', price: 0, vatRate: 20, stockStatus: 'IN_STOCK',
  active: true, featured: false, publiclyVisiblePrice: false, categoryId: ''
};

export function AdminProductEditorPage() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    api.get('/admin/categories').then((r) => setCategories(r.data));
    api.get('/admin/brands').then((r) => setBrands(r.data));
  }, []);

  useEffect(() => {
    if (isNew) return;
    api.get(`/admin/products/${id}`).then((r) => {
      const p = r.data;
      setForm({
        name: p.name || '',
        slug: p.slug || '',
        description: p.description || '',
        shortDescription: p.shortDescription || '',
        sku: p.sku || '',
        barcode: p.barcode || '',
        countryOfOrigin: p.countryOfOrigin || '',
        brandId: p.brand?.id ?? '',
        unitOfMeasure: p.unitOfMeasure || 'kom',
        packageSize: p.packageSize || '',
        imageUrl: p.imageUrl || '',
        price: p.price ?? 0,
        vatRate: p.vatRate ?? 20,
        stockStatus: p.stockStatus || 'IN_STOCK',
        active: !!p.active,
        featured: !!p.featured,
        publiclyVisiblePrice: !!p.publiclyVisiblePrice,
        categoryId: p.category?.id ?? ''
      });
    }).finally(() => setLoading(false));
  }, [id, isNew]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      shortDescription: form.shortDescription,
      sku: form.sku,
      barcode: form.barcode || null,
      countryOfOrigin: form.countryOfOrigin?.trim() || null,
      brand: form.brandId ? { id: Number(form.brandId) } : null,
      unitOfMeasure: form.unitOfMeasure,
      packageSize: form.packageSize || null,
      imageUrl: form.imageUrl || null,
      price: Number(form.price),
      vatRate: Number(form.vatRate),
      stockStatus: form.stockStatus,
      active: form.active,
      featured: form.featured,
      publiclyVisiblePrice: form.publiclyVisiblePrice,
      category: { id: Number(form.categoryId) }
    };
    if (isNew) {
      await api.post('/admin/products', payload);
    } else {
      await api.put(`/admin/products/${id}`, { ...payload, id: Number(id) });
    }
    navigate('/admin/products');
  };

  if (!isNew && loading) return <LoadingState />;

  return (
    <>
      <div className="row-flex" style={{ marginBottom: 16 }}>
        <Link to="/admin/products" className="btn btn--ghost btn--sm">← Nazad</Link>
      </div>
      <h1 style={{ marginTop: 0 }}>{isNew ? 'Novi proizvod' : 'Izmena proizvoda'}</h1>
      <form onSubmit={save}>
        <div className="grid-2" style={{ gap: 16 }}>
          <Card><div className="card__body">
            <h3 style={{ marginTop: 0 }}>Osnovno</h3>
            <div className="form-grid">
              <FormField label="Naziv"><input required value={form.name} onChange={(e) => set('name', e.target.value)} /></FormField>
              <FormField label="Slug"><input required value={form.slug} onChange={(e) => set('slug', e.target.value)} /></FormField>
              <FormField label="SKU"><input required value={form.sku} onChange={(e) => set('sku', e.target.value)} /></FormField>
              <FormField label="Barkod"><input value={form.barcode} onChange={(e) => set('barcode', e.target.value)} /></FormField>
              <FormField label="Poreklo (npr. IT, DE)" hint="ISO kod zemlje, opciono.">
                <input value={form.countryOfOrigin} onChange={(e) => set('countryOfOrigin', e.target.value)} maxLength={8} placeholder="IT" />
              </FormField>
              <SelectField
                label="Brend"
                value={String(form.brandId)}
                emptyLabel="— Bez brenda —"
                options={brands.map((b) => ({ value: String(b.id), label: b.name }))}
                onChange={(e) => set('brandId', e.target.value)}
              />
              <SelectField
                label="Kategorija"
                required
                value={String(form.categoryId)}
                emptyLabel="— Izaberite —"
                options={categories.map((c) => ({ value: String(c.id), label: c.name }))}
                onChange={(e) => set('categoryId', e.target.value)}
              />
            </div>
          </div></Card>
          <Card><div className="card__body">
            <h3 style={{ marginTop: 0 }}>Cene i vidljivost</h3>
            <div className="form-grid">
              <FormField label="Cena (RSD)"><input required type="number" step="0.01" value={form.price} onChange={(e) => set('price', e.target.value)} /></FormField>
              <FormField label="PDV %"><input required type="number" step="0.01" value={form.vatRate} onChange={(e) => set('vatRate', e.target.value)} /></FormField>
              <FormField label="Jedinica mere"><input required value={form.unitOfMeasure} onChange={(e) => set('unitOfMeasure', e.target.value)} /></FormField>
              <FormField label="Pakovanje"><input value={form.packageSize} onChange={(e) => set('packageSize', e.target.value)} /></FormField>
              <SelectField
                label="Zaliha"
                value={form.stockStatus}
                options={STOCK_OPTIONS}
                onChange={(e) => set('stockStatus', e.target.value)}
              />
              <FormField label="URL slike"><input value={form.imageUrl} onChange={(e) => set('imageUrl', e.target.value)} /></FormField>
            </div>
            <label className="form-switch" style={{ marginTop: 8 }}><input type="checkbox" checked={form.active} onChange={(e) => set('active', e.target.checked)} /><span>Aktivan u katalogu</span></label>
            <label className="form-switch"><input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} /><span>Istaknut na početnoj</span></label>
            <label className="form-switch"><input type="checkbox" checked={form.publiclyVisiblePrice} onChange={(e) => set('publiclyVisiblePrice', e.target.checked)} /><span>Javno vidljiva cena</span></label>
          </div></Card>
          <Card style={{ gridColumn: '1 / -1' }}><div className="card__body">
            <h3 style={{ marginTop: 0 }}>Opis</h3>
            <FormField label="Kratak opis"><input value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)} /></FormField>
            <FormField label="Detaljan opis"><textarea rows={5} value={form.description} onChange={(e) => set('description', e.target.value)} /></FormField>
          </div></Card>
        </div>
        <div className="row-flex" style={{ marginTop: 20 }}>
          <Button type="submit" variant="primary">Sačuvaj</Button>
          <Link to="/admin/products" className="btn btn--outline">Otkaži</Link>
        </div>
      </form>
    </>
  );
}
