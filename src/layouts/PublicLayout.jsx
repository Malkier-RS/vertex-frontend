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
  const close = () => setOpen(false);

  return (
    <div className="app-root">
      <header className={`site-header${open ? ' site-header--nav-open' : ''}`.trim()}>
        <div className="container site-header__inner">
          <Link to="/" className="site-logo" onClick={close}>
            <img src={vertexLogo} alt="Vertex logo" className="site-logo__image" />
            Vertex B2B
          </Link>

          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-label={open ? 'Zatvori meni' : 'Otvori meni'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <button type="button" className="site-header__backdrop" aria-label="Zatvori meni" onClick={close} />

          <div className={`site-header__drawer${open ? ' site-header__drawer--open' : ''}`.trim()}>
            <nav className="site-nav">
              {nav.map((n) => (
                <NavLink key={n.to} to={n.to} end={n.end} onClick={close} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                  {n.label}
                </NavLink>
              ))}
            </nav>

            <div className="site-actions">
              <Link to="/korpa" className="icon-btn icon-btn--cart" aria-label="Korpa" onClick={close}>
                <ShoppingCart size={20} />
                {items.length > 0 && <span className="icon-btn__badge">{items.length}</span>}
              </Link>
              {!user ? (
                <>
                  <Link to="/login" className="btn btn--outline btn--sm" onClick={close}>Prijava</Link>
                  <Link to="/register" className="btn btn--primary btn--sm" onClick={close}>Registracija</Link>
                </>
              ) : (
                <>
                  <Link to="/account" className="icon-btn" title="Nalog" onClick={close}>
                    <UserRound size={20} />
                  </Link>
                  {user.role === 'ADMIN' && (
                    <Link to="/admin" className="btn btn--secondary btn--sm" onClick={close}>Admin</Link>
                  )}
                  <button type="button" className="icon-btn" onClick={() => { logout(); close(); }} title="Odjava">
                    <LogOut size={20} />
                  </button>
                </>
              )}
            </div>
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
