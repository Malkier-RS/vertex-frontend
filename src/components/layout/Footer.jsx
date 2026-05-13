import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Sparkles } from 'lucide-react';

const CATS = [
  { to: '/categories/food', label: 'Prehrana' },
  { to: '/categories/drinks', label: 'Pića' },
  { to: '/categories/coffee-and-snacks', label: 'Kafa' },
  { to: '/categories/snacks', label: 'Grickalice' },
  { to: '/categories/confectionery', label: 'Slatkiši' },
  { to: '/categories/hygiene', label: 'Higijena' },
  { to: '/categories/household', label: 'Kućna hemija' }
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col footer-col--brand">
          <div className="footer-brand">
            <span className="footer-brand__mark"><Sparkles size={18} /></span>
            <span>Vertex Distribution DOO</span>
          </div>
          <p className="footer-about">
            Veleprodaja brendova kao što su San Pellegrino, Pringles, Trolli, Haribo, Chupa Chups i
            Monini. Digitalna B2B prodavnica za STR objekte i maloprodaje u Srbiji.
          </p>
          <Link to="/register" className="btn btn--primary btn--sm" style={{ marginTop: 8 }}>
            Otvori B2B nalog
          </Link>
        </div>
        <div className="footer-col">
          <h4>Sajt</h4>
          <Link to="/shop">Prodavnica</Link>
          <Link to="/about">O nama</Link>
          <Link to="/distribution-logistics">Distribucija i logistika</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/register">Registracija firme</Link>
          <Link to="/login">Prijava</Link>
        </div>
        <div className="footer-col">
          <h4>Kategorije</h4>
          {CATS.map((c) => (
            <Link key={c.to} to={c.to}>{c.label}</Link>
          ))}
        </div>
        <div className="footer-col">
          <h4>Kontakt</h4>
          <a href="mailto:prodaja@vertex.rs" className="footer-contact">
            <Mail size={16} /> prodaja@vertex.rs
          </a>
          <a href="tel:+381110000000" className="footer-contact">
            <Phone size={16} /> +381 11 000 0000
          </a>
          <span className="footer-contact">
            <MapPin size={16} /> Beograd · Pančevački put 86D
          </span>
          <span className="footer-meta">PIB 115611143 · MB 22183281</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Vertex Distribution DOO. Sva prava zadržana.</span>
        <span>B2B prodaja isključivo registrovanim kupcima.</span>
      </div>
    </footer>
  );
}
