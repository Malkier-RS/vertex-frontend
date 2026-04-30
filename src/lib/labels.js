/** Normalizuje enum vrednost iz JSON-a (string ili { name }) u stabilan string ključ. */
export function normalizeEnum(v) {
  if (v == null || v === '') return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'object' && v !== null && 'name' in v) return String(v.name);
  return String(v);
}

export const ORDER_STATUS_OPTIONS = [
  { value: 'CREATED', label: 'Kreirano' },
  { value: 'CONFIRMED', label: 'Potvrđeno' },
  { value: 'IN_PREPARATION', label: 'U pripremi' },
  { value: 'SENT', label: 'Poslato' },
  { value: 'DELIVERED', label: 'Isporučeno' },
  { value: 'CANCELLED', label: 'Otkazano' }
];

export function orderStatusLabel(status) {
  const s = normalizeEnum(status);
  const row = ORDER_STATUS_OPTIONS.find((o) => o.value === s);
  return row?.label || s;
}

export const USER_STATUS_LABELS = {
  PENDING: 'Na čekanju',
  APPROVED: 'Odobreno',
  REJECTED: 'Odbijeno',
  BLOCKED: 'Blokiran'
};

export function userStatusLabel(status) {
  const s = normalizeEnum(status);
  return USER_STATUS_LABELS[s] || s;
}

export const ROLE_LABELS = {
  ADMIN: 'Administrator',
  CUSTOMER: 'Kupac'
};

export function roleLabel(role) {
  const r = normalizeEnum(role);
  return ROLE_LABELS[r] || r;
}

export const STOCK_STATUS_LABELS = {
  IN_STOCK: 'Na stanju',
  LOW_STOCK: 'Niska zaliha',
  OUT_OF_STOCK: 'Nema na stanju'
};

export const STOCK_STATUS_OPTIONS = [
  { value: 'IN_STOCK', label: 'Na stanju' },
  { value: 'LOW_STOCK', label: 'Niska zaliha' },
  { value: 'OUT_OF_STOCK', label: 'Nema na stanju' }
];

export function stockStatusLabel(status) {
  const s = normalizeEnum(status);
  return STOCK_STATUS_LABELS[s] || s;
}

export const DOCUMENT_TYPE_LABELS = {
  APR_EXTRACT: 'APR izvod',
  ID_CARD: 'Lična karta'
};

export function documentTypeLabel(type) {
  const s = normalizeEnum(type);
  return DOCUMENT_TYPE_LABELS[s] || s;
}
