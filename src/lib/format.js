export function formatRsd(value) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return `${Number(value).toLocaleString('sr-RS', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} RSD`;
}

export function formatDate(iso) {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('sr-RS', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}
