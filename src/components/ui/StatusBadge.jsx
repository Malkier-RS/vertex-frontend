import { Badge } from './Badge.jsx';
import { normalizeEnum, orderStatusLabel, userStatusLabel } from '../../lib/labels.js';

const map = {
  CREATED: 'neutral',
  CONFIRMED: 'accent',
  IN_PREPARATION: 'warning',
  SENT: 'accent',
  DELIVERED: 'success',
  CANCELLED: 'danger',
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'danger',
  BLOCKED: 'danger'
};

function displayLabel(status) {
  const s = normalizeEnum(status);
  const orderLbl = orderStatusLabel(s);
  if (orderLbl !== s) return orderLbl;
  const userLbl = userStatusLabel(s);
  if (userLbl !== s) return userLbl;
  return s || '—';
}

export function StatusBadge({ status }) {
  const s = normalizeEnum(status);
  const tone = map[s] || 'neutral';
  return <Badge tone={tone}>{displayLabel(s) || '—'}</Badge>;
}
