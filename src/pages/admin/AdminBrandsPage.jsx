import { useEffect, useState } from 'react';
import { Pencil, Plus, X } from 'lucide-react';
import api from '../../api/client';
import { AdminTable } from '../../components/ui/AdminTable.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { FormField } from '../../components/ui/FormField.jsx';
import { LoadingState } from '../../components/ui/LoadingState.jsx';
import { slugify } from '../../lib/slug.js';

const empty = { name: '', slug: '', description: '', logoUrl: '', active: true };

export function AdminBrandsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const load = () => api.get('/admin/brands').then((r) => setItems(r.data));

  useEffect(() => { load().finally(() => setLoading(false)); }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const startEdit = (brand) => {
    setEditingId(brand.id);
    setForm({
      name: brand.name || '',
      slug: brand.slug || '',
      description: brand.description || '',
      logoUrl: brand.logoUrl || '',
      active: !!brand.active
    });
    setError('');
  };

  const reset = () => {
    setEditingId(null);
    setForm(empty);
    setError('');
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        slug: (form.slug || slugify(form.name)).trim(),
        description: form.description?.trim() || null,
        logoUrl: form.logoUrl?.trim() || null,
        active: form.active
      };
      if (editingId) {
        await api.put(`/admin/brands/${editingId}`, payload);
      } else {
        await api.post('/admin/brands', payload);
      }
      reset();
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Čuvanje brenda nije uspelo.');
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (brand) => {
    if (!window.confirm(`Obrisati brend "${brand.name}"?`)) return;
    try {
      await api.delete(`/admin/brands/${brand.id}`);
      if (editingId === brand.id) reset();
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Brisanje nije uspelo. Brend možda ima povezane proizvode.');
    }
  };

  if (loading) return <LoadingState />;

  return (
    <>
      <div className="row-flex" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Brendovi</h1>
      </div>

      <AdminTable>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Slug</th>
            <th>Opis</th>
            <th>Aktivan</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((b) => (
            <tr key={b.id}>
              <td>
                <div className="row-flex" style={{ gap: 10 }}>
                  {b.logoUrl ? (
                    <img className="thumb" src={b.logoUrl} alt="" style={{ width: 40, height: 40, objectFit: 'contain', background: '#fff' }} />
                  ) : null}
                  <strong>{b.name}</strong>
                </div>
              </td>
              <td className="text-muted" style={{ fontSize: '0.85rem' }}>{b.slug}</td>
              <td className="text-muted" style={{ fontSize: '0.85rem' }}>
                {b.description ? (b.description.length > 80 ? `${b.description.slice(0, 80)}…` : b.description) : '—'}
              </td>
              <td>{b.active ? <Badge tone="success">Da</Badge> : <Badge tone="neutral">Ne</Badge>}</td>
              <td>
                <div className="row-flex" style={{ gap: 8, flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn--outline btn--sm" onClick={() => startEdit(b)}>
                    <Pencil size={14} /> Izmeni
                  </button>
                  <button type="button" className="btn btn--ghost btn--sm" onClick={() => remove(b)}>
                    Obriši
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={5} className="text-muted" style={{ padding: 24, textAlign: 'center' }}>
                Još uvek nema brendova. Dodajte prvi brend ispod.
              </td>
            </tr>
          )}
        </tbody>
      </AdminTable>

      <div style={{ marginTop: 32 }}>
        <Card>
          <div className="card__body">
            <div className="row-flex" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
              <h2 style={{ margin: 0 }}>{editingId ? 'Izmena brenda' : 'Novi brend'}</h2>
              {editingId && (
                <button type="button" className="btn btn--ghost btn--sm" onClick={reset}>
                  <X size={14} /> Otkaži izmenu
                </button>
              )}
            </div>
            {error && <p style={{ color: 'var(--color-danger)', marginBottom: 12 }}>{error}</p>}
            <form className="form-grid" onSubmit={submit}>
              <FormField label="Naziv">
                <input
                  required
                  value={form.name}
                  onChange={(e) => {
                    const next = e.target.value;
                    set('name', next);
                    if (!editingId) set('slug', slugify(next));
                  }}
                />
              </FormField>
              <FormField label="Slug" hint="Koristi se u URL filterima. Auto-generiše se iz naziva.">
                <input
                  required
                  value={form.slug}
                  onChange={(e) => set('slug', e.target.value)}
                />
              </FormField>
              <FormField label="URL logotipa (opciono)">
                <input value={form.logoUrl} onChange={(e) => set('logoUrl', e.target.value)} />
              </FormField>
              <FormField label="Opis (opciono)">
                <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} />
              </FormField>
              <label className="form-switch" style={{ gridColumn: '1 / -1' }}>
                <input type="checkbox" checked={form.active} onChange={(e) => set('active', e.target.checked)} />
                <span>Aktivan brend</span>
              </label>
              <div className="row-flex" style={{ gridColumn: '1 / -1', gap: 12, flexWrap: 'wrap' }}>
                <Button type="submit" variant="primary" disabled={submitting}>
                  {editingId ? 'Sačuvaj izmene' : <><Plus size={16} /> Dodaj brend</>}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
}
