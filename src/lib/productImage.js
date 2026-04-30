const UNSPLASH = [
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1604719311146-2e8fefd8f30c?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1556910096-6f5e84db9d7a?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1604719311146-2e8fefd8f30c?w=800&h=600&fit=crop&q=80'
];

export function productImageUrl(product) {
  if (product?.imageUrl) return product.imageUrl;
  const idx = (product?.id || 0) % UNSPLASH.length;
  return UNSPLASH[idx];
}

export function categoryCoverUrl(slug) {
  const map = {
    food: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&h=500&fit=crop&q=80',
    drinks: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=900&h=500&fit=crop&q=80',
    'coffee-and-snacks': 'https://images.unsplash.com/photo-1495474472417-baad1753d5ab?w=900&h=500&fit=crop&q=80',
    hygiene: 'https://images.unsplash.com/photo-1583947215259-38db31c8a9a4?w=900&h=500&fit=crop&q=80',
    household: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&h=500&fit=crop&q=80',
    'cleaning-products': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=900&h=500&fit=crop&q=80',
    'baby-products': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=900&h=500&fit=crop&q=80',
    'pet-products': 'https://images.unsplash.com/photo-1583337130417-334622a0d227?w=900&h=500&fit=crop&q=80'
  };
  return map[slug] || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&h=500&fit=crop&q=80';
}
