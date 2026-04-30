import { useEffect, useState } from 'react';
import api from '../../api/client';
import { AdminTable } from '../../components/ui/AdminTable.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { FormField } from '../../components/ui/FormField.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { LoadingState } from '../../components/ui/LoadingState.jsx';

export function AdminCategoriesPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(true);
  const load = () => api.get('/admin/categories').then((r) => setItems(r.data));

  useEffect(() => { load().finally(() => setLoading(false)); }, []);

  if (loading) return <LoadingState />;

  return (
    <>
      <h1 style={{ marginTop: 0 }}>Kategorije</h1>
      <AdminTable>
        <thead>
          <tr><th>Naziv</th><th>Slug</th><th>Aktivna</th><th /></tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.slug}</td>
              <td>{c.active ? <Badge tone="success">Da</Badge> : <Badge tone="danger">Ne</Badge>}</td>
              <td><button type="button" className="btn btn--ghost btn--sm" onClick={() => api.delete(`/admin/categories/${c.id}`).then(load)}>Obriši</button></td>
            </tr>
          ))}
        </tbody>
      </AdminTable>

      <h2 style={{ marginTop: 32 }}>Nova kategorija</h2>
      <form
        className="form-grid"
        style={{ maxWidth: 520, marginTop: 12 }}
        onSubmit={async (e) => {
          e.preventDefault();
          await api.post('/admin/categories', { name, slug, active: true });
          setName('');
          setSlug('');
          load();
        }}
      >
        <FormField label="Naziv"><input required value={name} onChange={(e) => setName(e.target.value)} /></FormField>
        <FormField label="Slug"><input required value={slug} onChange={(e) => setSlug(e.target.value)} /></FormField>
        <Button type="submit" variant="primary">Dodaj</Button>
      </form>
    </>
  );
}
