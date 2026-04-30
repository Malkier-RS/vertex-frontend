import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const CATS = [
  { to: '/categories/food', label: 'Hrana' },
  { to: '/categories/drinks', label: 'Piće' },
  { to: '/categories/hygiene', label: 'Higijena' },
  { to: '/categories/cleaning-products', label: 'Kućna hemija' },
  { to: '/categories/coffee-and-snacks', label: 'Kafa i grickalice' },
  { to: '/categories/pet-products', label: 'Pet program' }
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4>Vertex distribucija</h4>
          <p style={{ margin: 0, lineHeight: 1.6, maxWidth: 360 }}>
            Vertex Distribution DOO — veleprodaja brendova kao što su San Pellegrino, Pringles, Trolli, Haribo, Chupa Chups i Monini. Digitalna B2B prodavnica za STR objekte i maloprodaje.
          </p>
        </div>
        <div>
          <h4>Brzi linkovi</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link to="/shop">Prodavnica</Link>
            <Link to="/about">O nama</Link>
            <Link to="/distribution-logistics">Distribucija i logistika</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/register">Registracija firme</Link>
          </div>
        </div>
        <div>
          <h4>Kategorije</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CATS.map((c) => (
              <Link key={c.to} to={c.to}>{c.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4>Kontakt</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.95rem' }}>
            <span className="row-flex" style={{ gap: 8 }}><Mail size={16} /> prodaja@vertex.rs</span>
            <span className="row-flex" style={{ gap: 8 }}><Phone size={16} /> +381 11 000 0000</span>
            <span className="row-flex" style={{ gap: 8 }}><MapPin size={16} /> Beograd (Palilula), Pančevački put 86D · PIB 115611143 · MB 22183281</span>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        © {new Date().getFullYear()} Vertex Distribution DOO. Sva prava zadržana. B2B prodaja isključivo registrovanim kupcima.
      </div>
    </footer>
  );
}


