import { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, FolderTree, Tags, Users, ShoppingCart, BookOpen, LogOut, Menu, Store, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { LoadingState } from '../components/ui/LoadingState.jsx';
import vertexLogo from '../assets/vertex-logo.svg';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Proizvodi', icon: Package },
  { to: '/admin/categories', label: 'Kategorije', icon: FolderTree },
  { to: '/admin/brands', label: 'Brendovi', icon: Tags },
  { to: '/admin/customers', label: 'Kupci', icon: Users },
  { to: '/admin/orders', label: 'Porudžbine', icon: ShoppingCart },
  { to: '/admin/blog', label: 'Blog', icon: BookOpen }
];

export default function AdminLayout() {
  const { user, logout, authReady } = useAuth();
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => { setNavOpen(false); }, [location.pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (navOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [navOpen]);

  if (!authReady) return <LoadingState />;
  if (!user || user.role !== 'ADMIN') return <Navigate to="/login" replace />;

  return (
    <div className={`admin-shell ${navOpen ? 'admin-shell--nav-open' : ''}`}>
      <aside className={`admin-sidebar ${navOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__brand">
          <img src={vertexLogo} alt="Vertex logo" className="site-logo__image site-logo__image--admin" />
          Vertex admin
        </div>
        <nav className="admin-nav">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? 'admin-nav__link active' : 'admin-nav__link')}
            >
              <l.icon size={18} /> {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <Link to="/" className="admin-nav__link admin-nav__link--ghost">
            <Store size={18} /> Nazad na Vertex B2B
          </Link>
          <button
            type="button"
            className="admin-nav__link admin-nav__link--button"
            onClick={logout}
          >
            <LogOut size={18} /> Odjava
          </button>
        </div>
      </aside>

      {navOpen && (
        <button
          type="button"
          className="admin-shell__backdrop"
          aria-label="Zatvori meni"
          onClick={() => setNavOpen(false)}
        />
      )}

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="row-flex" style={{ gap: 12 }}>
            <button
              type="button"
              className="admin-topbar__menu"
              aria-label={navOpen ? 'Zatvori meni' : 'Otvori meni'}
              aria-expanded={navOpen}
              onClick={() => setNavOpen((open) => !open)}
            >
              {navOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <strong>Administracija</strong>
          </div>
          <span className="row-flex admin-topbar__right" style={{ gap: 12 }}>
            <Link to="/" className="btn btn--outline btn--sm" style={{ textDecoration: 'none' }}><Store size={16} /> Vertex B2B</Link>
            <span className="text-muted admin-topbar__email">{user.email}</span>
          </span>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
