import { Link, NavLink, Navigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, FolderTree, Users, ShoppingCart, BookOpen, LogOut, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { LoadingState } from '../components/ui/LoadingState.jsx';
import vertexLogo from '../assets/vertex-logo.svg';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Proizvodi', icon: Package },
  { to: '/admin/categories', label: 'Kategorije', icon: FolderTree },
  { to: '/admin/customers', label: 'Kupci', icon: Users },
  { to: '/admin/orders', label: 'Porudžbine', icon: ShoppingCart },
  { to: '/admin/blog', label: 'Blog', icon: BookOpen }
];

export default function AdminLayout() {
  const { user, logout, authReady } = useAuth();
  if (!authReady) return <LoadingState />;
  if (!user || user.role !== 'ADMIN') return <Navigate to="/login" replace />;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <img src={vertexLogo} alt="Vertex logo" className="site-logo__image site-logo__image--admin" />
          Vertex admin
        </div>
        <nav className="admin-nav">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              <l.icon size={18} /> {l.label}
            </NavLink>
          ))}
        </nav>
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(148,163,184,0.25)' }}>
          <Link to="/" className="admin-nav" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8, color: '#e2e8f0', fontWeight: 600, textDecoration: 'none' }}>
            <Store size={18} /> Nazad na Vertex B2B
          </Link>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <button type="button" className="admin-nav" style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8 }} onClick={logout}>
            <LogOut size={18} /> Odjava
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <strong>Administracija</strong>
          <span className="row-flex" style={{ gap: 12 }}>
            <Link to="/" className="btn btn--outline btn--sm" style={{ textDecoration: 'none' }}><Store size={16} /> Vertex B2B</Link>
            <span className="text-muted" style={{ fontSize: '0.9rem' }}>{user.email}</span>
          </span>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

