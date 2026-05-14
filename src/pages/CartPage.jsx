import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import api from '../api/client';
import { PageHero } from '../components/ui/PageHero.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { formatRsd } from '../lib/format.js';
import { productImageUrl } from '../lib/productImage.js';
import { FormField } from '../components/ui/FormField.jsx';

export function CartPage() {
  const { user } = useAuth();
  const { items, total, remove, update, clear } = useCart();
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const rows = useMemo(() => items.map((i) => ({
    ...i,
    unit: Number(i.price) || 0,
    line: (Number(i.price) || 0) * i.quantity
  })), [items]);

  const checkout = async () => {
    setError('');
    if (!items.length) return;
    if (user?.status !== 'APPROVED') {
      setError('Porudžbinu mogu poslati samo odobreni B2B korisnici.');
      return;
    }
    if (!deliveryAddress.trim()) {
      setError('Unesite adresu isporuke.');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/orders', {
        deliveryAddress: deliveryAddress.trim(),
        note: note.trim() || undefined,
        items: items.map((i) => ({ productId: i.id, quantity: i.quantity }))
      });
      clear();
      navigate('/orders');
    } catch (e) {
      setError(e?.response?.data?.message || 'Porudžbina nije poslata.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero variant="light" title="Korpa" subtitle="Pregled stavki, PDV i završetak porudžbine." />

      {!items.length ? (
        <EmptyState title="Korpa je prazna" description="Dodajte proizvode iz prodavnice." action={<Link to="/shop" className="btn btn--primary">Prodavnica</Link>} />
      ) : (
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="table-wrap cart-lines-wrap">
              <table className="cart-lines">
                <thead>
                  <tr>
                    <th className="cart-lines__thumb" scope="col"> </th>
                    <th scope="col">Proizvod</th>
                    <th scope="col" className="cart-lines__num">Jed. cena</th>
                    <th scope="col" className="cart-lines__num">Količina</th>
                    <th scope="col" className="cart-lines__num">Ukupno</th>
                    <th className="cart-lines__actions" scope="col"> </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((i) => (
                    <tr key={i.id}>
                      <td className="cart-lines__thumb">
                        <img src={productImageUrl(i)} alt="" />
                      </td>
                      <td>
                        <div className="cart-lines__title">{i.name}</div>
                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>PDV {i.vatRate}% uračunat u cenu</div>
                      </td>
                      <td className="cart-lines__num">{formatRsd(i.unit)}</td>
                      <td className="cart-lines__num">
                        <div className="row-flex" style={{ justifyContent: 'center', gap: 4 }}>
                          <button type="button" className="icon-btn icon-btn--ghost" onClick={() => update(i.id, i.quantity - 1)} aria-label="Smanji"><Minus size={16} /></button>
                          <span style={{ minWidth: 28, textAlign: 'center', fontWeight: 700 }}>{i.quantity}</span>
                          <button type="button" className="icon-btn icon-btn--ghost" onClick={() => update(i.id, i.quantity + 1)} aria-label="Povećaj"><Plus size={16} /></button>
                        </div>
                      </td>
                      <td className="cart-lines__num"><strong>{formatRsd(i.line)}</strong></td>
                      <td className="cart-lines__actions">
                        <button type="button" className="icon-btn" onClick={() => remove(i.id)} aria-label="Ukloni"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0 }}>
              Prikazane cene uključuju PDV. Poseban prikaz rabata ili dodatnog obračuna PDV možemo uskladiti sa vašim B2B procesom po dogovoru.
            </p>
          </div>

          <Card>
            <div className="card__body">
              <h3 style={{ marginTop: 0 }}>Pregled</h3>
              <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: 0 }}>
                Prikazane cene uključuju PDV po stopi proizvoda. Pri slanju porudžbine server ponovo validira cene i formira zvaničan obračun.
              </p>
              <div className="row-flex" style={{ justifyContent: 'space-between', marginTop: 8, fontSize: '1.15rem' }}><strong>Ukupno</strong><strong>{formatRsd(total)}</strong></div>

              <hr style={{ border: 0, borderTop: '1px solid var(--color-border)', margin: '20px 0' }} />

              <FormField label="Adresa isporuke">
                <textarea rows={3} value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Ulica i broj, grad" />
              </FormField>
              <FormField label="Napomena uz porudžbinu">
                <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
              </FormField>

              {user?.status !== 'APPROVED' && (
                <div className="price-panel price-panel--locked" style={{ marginTop: 12 }}>
                  <div className="row-flex" style={{ gap: 8 }}><Lock size={16} /><span>Checkout je dostupan samo odobrenim korisnicima.</span></div>
                </div>
              )}

              {error && <p style={{ color: 'var(--color-danger)', marginTop: 8 }}>{error}</p>}

              <div className="row-flex" style={{ marginTop: 16 }}>
                <Button type="button" variant="primary" disabled={submitting || user?.status !== 'APPROVED'} onClick={checkout}>
                  <ShoppingCart size={18} /> Pošalji porudžbinu
                </Button>
                <Button type="button" variant="outline" onClick={clear} disabled={submitting}>Isprazni korpu</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
