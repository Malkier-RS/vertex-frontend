import { getCategoryCover, IMAGES } from './images.js';

const FALLBACK_PRODUCT_IMAGES = [
  IMAGES.heroProducts,
  IMAGES.catFood1,
  IMAGES.catDrinks,
  IMAGES.catCoffee,
  IMAGES.catSnacks
];

export function productImageUrl(product) {
  if (product?.imageUrl) return product.imageUrl;
  const idx = (product?.id || 0) % FALLBACK_PRODUCT_IMAGES.length;
  return FALLBACK_PRODUCT_IMAGES[idx];
}

export function categoryCoverUrl(slug) {
  return getCategoryCover(slug);
}
