import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ExternalLink, Pencil } from 'lucide-react';
import api from '../../api/client';
import { AdminTable } from '../../components/ui/AdminTable.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { FormField } from '../../components/ui/FormField.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { LoadingState } from '../../components/ui/LoadingState.jsx';
import { formatDate } from '../../lib/format.js';

const empty = { title: '', slug: '', excerpt: '', content: '', coverImageUrl: '', published: true };

export function AdminBlogPage() {
  const { id: routeEditId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isNew = location.pathname.endsWith('/blog/new');
  const isEdit = Boolean(routeEditId && location.pathname.includes('/edit'));
  const isFormView = isNew || isEdit;

  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [listLoading, setListLoading] = useState(!isFormView);
  const [formLoading, setFormLoading] = useState(isFormView);
  const [submitError, setSubmitError] = useState('');

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const loadList = () => api.get('/admin/blog').then((r) => setItems(r.data));

  useEffect(() => {
    if (isFormView) return;
    setListLoading(true);
    loadList().finally(() => setListLoading(false));
  }, [isFormView]);

  useEffect(() => {
    if (!isFormView) return;
    setSubmitError('');
    if (isEdit && routeEditId) {
      setFormLoading(true);
      api
        .get(`/admin/blog/${routeEditId}`)
        .then((r) => {
          const b = r.data;
          setForm({
            title: b.title || '',
            slug: b.slug || '',
            excerpt: b.excerpt || '',
            content: b.content || '',
            coverImageUrl: b.coverImageUrl || '',
            published: !!b.published
          });
        })
        .catch(() => setSubmitError('Ne mogu da učitam članak.'))
        .finally(() => setFormLoading(false));
    } else if (isNew) {
      setForm(empty);
      setFormLoading(false);
    }
  }, [isFormView, isEdit, isNew, routeEditId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    try {
      if (isEdit && routeEditId) {
        await api.put(`/admin/blog/${routeEditId}`, form);
      } else {
        await api.post('/admin/blog', form);
      }
      navigate('/admin/blog');
    } catch (err) {
      setSubmitError(err?.response?.data?.message || 'Čuvanje nije uspelo.');
    }
  };

  if (isFormView && formLoading) return <LoadingState />;

  if (isFormView) {
    return (
      <>
        <div className="row-flex" style={{ marginBottom: 16 }}>
          <Link to="/admin/blog" className="btn btn--ghost btn--sm">← Nazad na listu</Link>
        </div>
        <h1 style={{ marginTop: 0 }}>{isEdit ? 'Izmena članka' : 'Novi članak'}</h1>
        {submitError && <p style={{ color: 'var(--color-danger)', marginBottom: 12 }}>{submitError}</p>}
        <Card>
          <div className="card__body">
            <form className="form-grid" onSubmit={onSubmit}>
              <FormField label="Naslov"><input required value={form.title} onChange={(e) => set('title', e.target.value)} /></FormField>
              <FormField label="Slug"><input required value={form.slug} onChange={(e) => set('slug', e.target.value)} /></FormField>
              <FormField label="URL naslovne slike"><input value={form.coverImageUrl} onChange={(e) => set('coverImageUrl', e.target.value)} /></FormField>
              <FormField label="Sažetak"><textarea rows={2} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} /></FormField>
              <FormField label="Sadržaj" hint="HTML ili običan tekst.">
                <textarea required rows={8} value={form.content} onChange={(e) => set('content', e.target.value)} />
              </FormField>
              <label className="form-switch" style={{ gridColumn: '1 / -1' }}>
                <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} />
                <span>Objavljeno na sajtu</span>
              </label>
              <div className="row-flex" style={{ gridColumn: '1 / -1', gap: 12, flexWrap: 'wrap' }}>
                <Button type="submit" variant="primary">{isEdit ? 'Sačuvaj izmene' : 'Sačuvaj post'}</Button>
                <Link to="/admin/blog" className="btn btn--outline">Otkaži</Link>
              </div>
            </form>
          </div>
        </Card>
      </>
    );
  }

  if (listLoading) return <LoadingState />;

  return (
    <>
      <div className="row-flex" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Blog</h1>
        <Link to="/admin/blog/new" className="btn btn--primary">Novi članak</Link>
      </div>
      <AdminTable>
        <thead>
          <tr><th>Naslov</th><th>Slug</th><th>Objavljeno</th><th>Datum</th><th /></tr>
        </thead>
        <tbody>
          {items.map((b) => (
            <tr key={b.id}>
              <td><strong>{b.title}</strong></td>
              <td className="text-muted" style={{ fontSize: '0.85rem' }}>{b.slug}</td>
              <td>{b.published ? <Badge tone="success">Da</Badge> : <Badge tone="neutral">Ne</Badge>}</td>
              <td>{formatDate(b.publishedAt || b.createdAt)}</td>
              <td>
                <div className="row-flex" style={{ gap: 8, flexWrap: 'wrap' }}>
                  <Link to={`/blog/${b.slug}`} className="btn btn--outline btn--sm" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} /> Pregled
                  </Link>
                  <Link to={`/admin/blog/${b.id}/edit`} className="btn btn--outline btn--sm">
                    <Pencil size={14} /> Izmeni
                  </Link>
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => {
                      if (!window.confirm('Obrisati članak?')) return;
                      api.delete(`/admin/blog/${b.id}`).then(loadList);
                    }}
                  >
                    Obriši
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </>
  );
}
