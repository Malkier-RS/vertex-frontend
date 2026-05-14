import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/client';
import { Card } from '../../components/ui/Card.jsx';
import { StatusBadge } from '../../components/ui/StatusBadge.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { LoadingState } from '../../components/ui/LoadingState.jsx';
import { formatDate } from '../../lib/format.js';
import { documentTypeLabel } from '../../lib/labels.js';

export function AdminCustomerDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [downloadError, setDownloadError] = useState('');

  const refreshDetail = useCallback(async () => {
    const { data: body } = await api.get(`/admin/customers/${id}/detail`, {
      params: { _t: Date.now() },
      headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' }
    });
    setData(body);
    return body;
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    setInitialLoading(true);
    refreshDetail()
      .catch(() => { if (!cancelled) setData(null); })
      .finally(() => { if (!cancelled) setInitialLoading(false); });
    return () => { cancelled = true; };
  }, [id, refreshDetail]);

  const download = async (docId, fileName) => {
    setDownloadError('');
    try {
      const res = await api.get(`/admin/customers/${id}/documents/${docId}/download`, { responseType: 'blob' });
      const blob = res.data;
      if (blob?.type?.includes('application/json')) {
        const text = await blob.text();
        const j = JSON.parse(text);
        throw new Error(j.message || 'Preuzimanje nije uspelo.');
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'dokument';
      a.rel = 'noopener';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 250);
    } catch (e) {
      let msg = 'Preuzimanje nije uspelo.';
      try {
        if (e?.response?.data instanceof Blob) {
          const t = await e.response.data.text();
          const j = JSON.parse(t);
          if (j.message) msg = j.message;
        } else if (typeof e?.response?.data?.message === 'string') {
          msg = e.response.data.message;
        } else if (e?.message) {
          msg = e.message;
        }
      } catch {
        /* keep default msg */
      }
      setDownloadError(msg);
    }
  };

  const runAction = async (label, request) => {
    setFeedback(null);
    setActionLoading(true);
    try {
      await request();
      await refreshDetail();
      setFeedback({ type: 'ok', text: `${label}: izmene su sačuvane.` });
    } catch (e) {
      const d = e?.response?.data;
      const msg = (typeof d?.message === 'string' && d.message) || (typeof d?.detail === 'string' && d.detail) || 'Akcija nije uspela.';
      setFeedback({ type: 'err', text: msg });
    } finally {
      setActionLoading(false);
    }
  };

  const approve = () => runAction('Odobravanje', () => api.post(`/admin/customers/${id}/approve`));

  const reject = async () => {
    const reason = window.prompt('Razlog odbijanja (opciono):');
    if (reason === null) return;
    await runAction('Odbijanje', () => api.post(`/admin/customers/${id}/reject`, { reason: reason || '' }));
  };

  const block = () => runAction('Blokiranje', () => api.post(`/admin/customers/${id}/block`));
  const unblock = () => runAction('Odblokiranje', () => api.post(`/admin/customers/${id}/unblock`));

  if (initialLoading && !data) return <LoadingState />;
  if (!data) return <p>Nije moguće učitati kupca.</p>;

  const p = data.profile;

  return (
    <>
      <div className="row-flex" style={{ marginBottom: 16 }}>
        <Link to="/admin/customers" className="btn btn--ghost btn--sm">← Nazad</Link>
      </div>
      <div className="row-flex" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ margin: 0 }}>Kupac</h1>
        <StatusBadge status={data.status} />
      </div>
      <p className="text-muted">{data.email} · registrovan {formatDate(data.createdAt)}</p>

      {feedback && (
        <div
          role="status"
          style={{
            marginBottom: 16,
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid',
            borderColor: feedback.type === 'ok' ? '#86efac' : '#fecaca',
            background: feedback.type === 'ok' ? '#f0fdf4' : '#fef2f2',
            color: feedback.type === 'ok' ? '#166534' : '#991b1b'
          }}
        >
          {feedback.text}
        </div>
      )}

      <div className="grid-2" style={{ marginTop: 20 }}>
        <Card><div className="card__body">
          <h3 style={{ marginTop: 0 }}>Profil firme</h3>
          {!p && <p className="text-muted">Nema profila.</p>}
          {p && (
            <dl style={{ margin: 0 }}>
              <dt className="text-muted">Kompanija</dt><dd style={{ margin: '0 0 8px' }}>{p.companyName}</dd>
              <dt className="text-muted">Pravni naziv</dt><dd style={{ margin: '0 0 8px' }}>{p.legalEntityName}</dd>
              <dt className="text-muted">PIB / MB</dt><dd style={{ margin: '0 0 8px' }}>{p.pib} / {p.mb}</dd>
              <dt className="text-muted">Adresa</dt><dd style={{ margin: '0 0 8px' }}>{p.address}, {p.postalCode} {p.city}</dd>
              <dt className="text-muted">Kontakt</dt><dd style={{ margin: '0 0 8px' }}>{p.contactFirstName} {p.contactLastName} · {p.phone}</dd>
              {p.note && <><dt className="text-muted">Napomena</dt><dd style={{ margin: 0 }}>{p.note}</dd></>}
              {p.rejectionReason && <><dt className="text-muted">Razlog odbijanja</dt><dd style={{ margin: 0 }}>{p.rejectionReason}</dd></>}
            </dl>
          )}
        </div></Card>

        <Card><div className="card__body">
          <h3 style={{ marginTop: 0 }}>Dokumenti</h3>
          {downloadError && (
            <p style={{ color: 'var(--color-danger)', marginBottom: 12, fontSize: '0.9rem' }}>{downloadError}</p>
          )}
          {!data.documents?.length && <p className="text-muted">Nema dokumenata.</p>}
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {data.documents?.map((d) => (
              <li key={d.id} style={{ marginBottom: 8 }}>
                <strong>{documentTypeLabel(d.documentType)}</strong> — {d.originalFileName}{' '}
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => download(d.id, d.originalFileName)}>Preuzmi</button>
              </li>
            ))}
          </ul>
        </div></Card>
      </div>

      <div className="row-flex" style={{ marginTop: 20, flexWrap: 'wrap' }}>
        <Button type="button" variant="primary" disabled={actionLoading || data.status !== 'PENDING'} onClick={() => approve()}>Odobri</Button>
        <Button type="button" variant="outline" disabled={actionLoading || data.status !== 'PENDING'} onClick={() => reject()}>Odbij</Button>
        <Button type="button" variant="outline" disabled={actionLoading} onClick={() => block()}>Blokiraj</Button>
        <Button type="button" variant="ghost" disabled={actionLoading} onClick={() => unblock()}>Odblokiraj</Button>
      </div>
    </>
  );
}
