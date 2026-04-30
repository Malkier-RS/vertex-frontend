import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { LogOut, Menu, ShoppingCart, UserRound, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import vertexLogo from '../assets/vertex-logo.svg';

const nav = [
  { to: '/', label: 'Početna', end: true },
  { to: '/shop', label: 'Prodavnica' },
  { to: '/about', label: 'O nama' },
  { to: '/distribution-logistics', label: 'Distribucija i logistika' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Kontakt' }
];

export default function PublicLayout() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <div className="app-root">
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="site-logo" onClick={() => setOpen(false)}>
            <img src={vertexLogo} alt="Vertex logo" className="site-logo__image" />
            Vertex B2B
          </Link>

          <button type="button" className="icon-btn menu-toggle" aria-label="Meni" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav className={`site-nav ${open ? 'site-nav--open' : ''}`.trim()}>
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-actions">
            <Link to="/korpa" className="icon-btn icon-btn--cart" aria-label="Korpa" onClick={() => setOpen(false)}>
              <ShoppingCart size={20} />
              {items.length > 0 && <span className="icon-btn__badge">{items.length}</span>}
            </Link>
            {!user ? (
              <>
                <Link to="/login" className="btn btn--outline btn--sm">Prijava</Link>
                <Link to="/register" className="btn btn--primary btn--sm">Registracija</Link>
              </>
            ) : (
              <>
                <Link to="/account" className="icon-btn" title="Nalog" onClick={() => setOpen(false)}>
                  <UserRound size={20} />
                </Link>
                {user.role === 'ADMIN' && (
                  <Link to="/admin" className="btn btn--secondary btn--sm" onClick={() => setOpen(false)}>Admin</Link>
                )}
                <button type="button" className="icon-btn" onClick={logout} title="Odjava">
                  <LogOut size={20} />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="page-main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

