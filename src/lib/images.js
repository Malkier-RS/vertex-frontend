import heroProducts from '../assets/images/hero-products.png';
import storeTablet from '../assets/images/store-tablet.png';
import vertexVanPurple from '../assets/images/vertex-van-purple.png';
import vertexDeliveryCustomer from '../assets/images/vertex-delivery-customer.png';
import teamPlanning from '../assets/images/team-planning.png';
import deliveryOldTown from '../assets/images/delivery-old-town.png';
import warehouseMinimal from '../assets/images/warehouse-minimal.png';
import warehouseWorkers from '../assets/images/warehouse-workers.png';
import wholesalePallets from '../assets/images/wholesale-pallets.png';
import warehousePringles from '../assets/images/warehouse-pringles.png';
import warehouseAisle from '../assets/images/warehouse-aisle.png';
import groceryStore from '../assets/images/grocery-store.png';
import wholesaleOverview from '../assets/images/wholesale-overview.png';
import vertexWarehouseVan from '../assets/images/vertex-warehouse-van.png';

import catFood1 from '../assets/images/cat-food-1.png';
import catFood2 from '../assets/images/cat-food-2.png';
import catDrinks from '../assets/images/cat-drinks.png';
import catCoffee from '../assets/images/cat-coffee.png';
import catSnacks from '../assets/images/cat-snacks.png';
import catSnacksDark from '../assets/images/cat-snacks-dark.png';
import catCandy1 from '../assets/images/cat-candy-1.png';
import catCandy2 from '../assets/images/cat-candy-2.png';
import catLaundry from '../assets/images/cat-laundry.png';
import catDishwash from '../assets/images/cat-dishwash.png';
import catHygiene1 from '../assets/images/cat-hygiene-1.png';
import catHygiene2 from '../assets/images/cat-hygiene-2.png';
import catHygiene3 from '../assets/images/cat-hygiene-3.png';

export const IMAGES = {
  heroProducts,
  storeTablet,
  vertexVanPurple,
  vertexDeliveryCustomer,
  teamPlanning,
  deliveryOldTown,
  warehouseMinimal,
  warehouseWorkers,
  wholesalePallets,
  warehousePringles,
  warehouseAisle,
  groceryStore,
  wholesaleOverview,
  vertexWarehouseVan,
  catFood1,
  catFood2,
  catDrinks,
  catCoffee,
  catSnacks,
  catSnacksDark,
  catCandy1,
  catCandy2,
  catLaundry,
  catDishwash,
  catHygiene1,
  catHygiene2,
  catHygiene3
};

const CATEGORY_COVERS = {
  food: catFood1,
  'food-and-grocery': catFood1,
  groceries: catFood1,
  drinks: catDrinks,
  beverages: catDrinks,
  'soft-drinks': catDrinks,
  coffee: catCoffee,
  'coffee-and-snacks': catCoffee,
  snacks: catSnacks,
  grickalice: catSnacks,
  candy: catCandy1,
  confectionery: catCandy1,
  konditori: catCandy1,
  slatkisi: catCandy1,
  hygiene: catHygiene1,
  'personal-hygiene': catHygiene1,
  'baby-products': catHygiene2,
  household: catLaundry,
  'cleaning-products': catLaundry,
  'home-care': catLaundry,
  laundry: catLaundry,
  detergents: catLaundry,
  dishwashing: catDishwash,
  'pet-products': catFood2,
  oils: catFood2,
  pantry: catFood2
};

export function getCategoryCover(slug) {
  if (!slug) return catFood1;
  const normalized = String(slug).toLowerCase();
  return CATEGORY_COVERS[normalized] || catFood1;
}
