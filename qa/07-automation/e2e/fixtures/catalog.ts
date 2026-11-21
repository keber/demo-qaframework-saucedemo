/**
 * fixtures/catalog.ts - reference catalog of saucedemo (RN-INV-001, RN-INV-012).
 * Source: qa/01-specifications/module-inventory/submodule-catalog/04-test-data.md and
 * qa/memory/saucedemo-app-behavior.md (verified live in stages 1 and 2).
 */

export interface Product {
  id: number;
  name: string;
  price: string;
  slug: string;
  /** Fragment of the image file name expected in the `src` (RN-INV-011). */
  image: string;
}

export const PRODUCTS: Product[] = [
  { id: 4, name: 'Sauce Labs Backpack', price: '$29.99', slug: 'sauce-labs-backpack', image: 'sauce-backpack' },
  { id: 0, name: 'Sauce Labs Bike Light', price: '$9.99', slug: 'sauce-labs-bike-light', image: 'bike-light' },
  { id: 1, name: 'Sauce Labs Bolt T-Shirt', price: '$15.99', slug: 'sauce-labs-bolt-t-shirt', image: 'bolt-shirt' },
  { id: 5, name: 'Sauce Labs Fleece Jacket', price: '$49.99', slug: 'sauce-labs-fleece-jacket', image: 'sauce-pullover' },
  { id: 2, name: 'Sauce Labs Onesie', price: '$7.99', slug: 'sauce-labs-onesie', image: 'red-onesie' },
  { id: 3, name: 'Test.allTheThings() T-Shirt (Red)', price: '$15.99', slug: 'test.allthethings()-t-shirt-(red)', image: 'red-tatt' },
];

export const byId = (id: number): Product => {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) throw new Error(`unknown product id ${id}`);
  return p;
};

/** Name -> price of the reference catalog. */
export const PRICE_BY_NAME: Record<string, string> = Object.fromEntries(PRODUCTS.map((p) => [p.name, p.price]));

export const PRICE_FORMAT = /^\$\d+\.\d{2}$/;

export const toNumber = (price: string): number => Number(price.replace(/[^0-9.]/g, ''));

/** Unique per-minute execution suffix (Pattern 1, EXEC_IDX). */
export const EXEC_IDX = Math.floor(Date.now() / 60_000) % 100_000;

/** Checkout data used by every plan (04-test-data.md). */
export const CHECKOUT_DATA = {
  firstName: `QA-${EXEC_IDX}`,
  lastName: 'Pérez',
  postalCode: '8320000',
};

export const protectedRouteError = (route: string): string =>
  `Epic sadface: You can only access '${route}' when you are logged in.`;
