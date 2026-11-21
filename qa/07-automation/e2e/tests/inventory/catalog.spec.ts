/**
 * @module INV
 * @submodule CAT
 * @spec qa/01-specifications/module-inventory/submodule-catalog/05-test-scenarios.md
 * @plan qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-saucedemo-Sprint-1-INV.md
 *
 * The plan step "iniciar sesión con {usuario}" is satisfied by the persona storageState
 * created in global-setup.ts (test.use({ qaUser })); tests never type credentials.
 *
 * INSPECTION: 2026-11-21
 * List: inventory-list > 6 inventory-item (inventory-item-name/-desc/-price,
 * inventory-item-{slug}-img, item-{id}-title-link, item-{id}-img-link, add-to-cart-{slug}).
 * Sort: product-sort-container options az/za/lohi/hilo, active-option.
 * Detail: back-to-products, add-to-cart/remove, inventory-item-name/-desc/-price.
 * Persona defects (rule 10, expectOpenDefect): DEF-SD-001..008.
 */

import { test, expect, newPersonaContext } from '../../fixtures/base';
import type { Page } from '@playwright/test';
import { expectOpenDefect } from '../../fixtures/defects';
import { InventoryPage } from '../../page-objects/InventoryPage';
import { CartPage } from '../../page-objects/CartPage';
import { PRODUCTS, PRICE_BY_NAME, PRICE_FORMAT, byId, toNumber } from '../../fixtures/catalog';

const SORT_OPTIONS = [
  { value: 'az', label: 'Name (A to Z)' },
  { value: 'za', label: 'Name (Z to A)' },
  { value: 'lohi', label: 'Price (low to high)' },
  { value: 'hilo', label: 'Price (high to low)' },
];

async function openCatalog(page: Page): Promise<InventoryPage> {
  const inventory = new InventoryPage(page);
  await inventory.goto();
  await expect(inventory.header.title).toHaveText('Products');
  return inventory;
}

/** Text of the badge, or null when it is not in the DOM (empty cart). */
async function badgeText(inventory: InventoryPage): Promise<string | null> {
  return (await inventory.header.cartBadge.count()) ? ((await inventory.header.cartBadge.textContent()) ?? '').trim() : null;
}

/**
 * Observation helper for the add/remove persona TCs: clicks add (then remove) on each of
 * the 6 products when the button exists, and records the resulting state. Clicking a
 * missing button would only time out, so a missing button is recorded, not clicked.
 */
async function addAndRemoveAll(inventory: InventoryPage) {
  for (const p of PRODUCTS) {
    if (await inventory.addButton(p.slug).count()) await inventory.addButton(p.slug).click();
  }
  const afterAdd = {
    badge: await badgeText(inventory),
    removeButtons: await inventory.page.locator('[data-test^="remove-"]').count(),
  };
  for (const p of PRODUCTS) {
    if (await inventory.removeButton(p.slug).count()) await inventory.removeButton(p.slug).click();
  }
  const afterRemove = {
    badge: await badgeText(inventory),
    addButtons: await inventory.page.locator('[data-test^="add-to-cart-"]').count(),
  };
  return { afterAdd, afterRemove };
}

test.describe('INV-CAT - Listado y ordenamiento', () => {
  test('[TC-INV-CAT-001] El listado muestra 6 productos completos @P0', async ({ page }) => {
    const inventory = await openCatalog(page);
    await expect(inventory.list.getByTestId('inventory-item')).toHaveCount(6);
    for (let i = 0; i < 6; i++) {
      const card = inventory.items.nth(i);
      const name = ((await card.getByTestId('inventory-item-name').textContent()) ?? '').trim();
      expect(name).not.toBe('');
      expect(((await card.getByTestId('inventory-item-desc').textContent()) ?? '').trim()).not.toBe('');
      await expect(card.getByTestId('inventory-item-price')).toBeVisible();
      await expect(card.locator('img')).toHaveAttribute('alt', name);
      const product = PRODUCTS.find((p) => p.name === name);
      expect(product, `"${name}" belongs to the reference catalog`).toBeTruthy();
      await expect(card.getByTestId(`add-to-cart-${product!.slug}`)).toHaveText('Add to cart');
    }
  });

  test('[TC-INV-CAT-002] Nombres y precios coinciden con el catálogo de referencia @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    const names = await inventory.readNames();
    const prices = await inventory.readPrices();
    expect(Object.fromEntries(names.map((n, i) => [n, prices[i]]))).toEqual(PRICE_BY_NAME);
    for (const price of prices) expect(price).toMatch(PRICE_FORMAT);
  });

  test('[TC-INV-CAT-003] Orden por defecto A-Z @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await expect(inventory.activeOption).toHaveText('Name (A to Z)');
    await expect(inventory.sort).toHaveValue('az');
    const names = await inventory.readNames();
    expect(names).toEqual([...names].sort());
    expect(names[0]).toBe('Sauce Labs Backpack');
    expect(names[names.length - 1]).toBe('Test.allTheThings() T-Shirt (Red)');
  });

  test('[TC-INV-CAT-004] Ordenar por nombre Z-A @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.sort.selectOption('za');
    await expect(inventory.activeOption).toHaveText('Name (Z to A)');
    const names = await inventory.readNames();
    expect(names).toEqual([...names].sort().reverse());
    expect(names[0]).toBe('Test.allTheThings() T-Shirt (Red)');
    expect(names[names.length - 1]).toBe('Sauce Labs Backpack');
  });

  test('[TC-INV-CAT-005] Ordenar por precio de menor a mayor @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.sort.selectOption('lohi');
    await expect(inventory.activeOption).toHaveText('Price (low to high)');
    const prices = (await inventory.readPrices()).map(toNumber);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
    expect(prices[0]).toBe(7.99);
    expect(prices[prices.length - 1]).toBe(49.99);
    expect((await inventory.readNames())[0]).toBe('Sauce Labs Onesie');
  });

  test('[TC-INV-CAT-006] Ordenar por precio de mayor a menor @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.sort.selectOption('hilo');
    await expect(inventory.activeOption).toHaveText('Price (high to low)');
    const prices = (await inventory.readPrices()).map(toNumber);
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
    expect(prices[0]).toBe(49.99);
    expect(prices[prices.length - 1]).toBe(7.99);
    expect((await inventory.readNames())[0]).toBe('Sauce Labs Fleece Jacket');
  });

  test('[TC-INV-CAT-007] El orden vuelve a A-Z al recargar @P3', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.sort.selectOption('hilo');
    await expect(inventory.activeOption).toHaveText('Price (high to low)');
    await page.reload();
    await inventory.list.waitFor({ state: 'visible' });
    await expect(inventory.activeOption).toHaveText('Name (A to Z)');
    await expect(inventory.sort).toHaveValue('az');
    await expect(inventory.names.first()).toHaveText('Sauce Labs Backpack');
  });

  test('[TC-INV-CAT-028] El selector de orden ofrece las 4 opciones estáticas @P3', async ({ page }) => {
    const inventory = await openCatalog(page);
    const options = await inventory.sort.locator('option').evaluateAll((els) =>
      els.map((e) => ({ value: (e as HTMLOptionElement).value, label: (e.textContent ?? '').trim() }))
    );
    expect(options).toEqual(SORT_OPTIONS);
  });
});

test.describe('INV-CAT - Agregar y quitar desde el catálogo', () => {
  test('[TC-INV-CAT-008] Agregar un producto desde el listado @P0', async ({ page }) => {
    const inventory = await openCatalog(page);
    await expect(inventory.header.cartBadge).toHaveCount(0);
    await inventory.addButton('sauce-labs-backpack').click();
    await expect(inventory.removeButton('sauce-labs-backpack')).toHaveText('Remove');
    await expect(inventory.addButton('sauce-labs-backpack')).toHaveCount(0);
    await expect(inventory.header.cartBadge).toHaveText('1');
    expect(await inventory.cartContents()).toBe('[4]');
  });

  test('[TC-INV-CAT-009] Agregar los 6 productos @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await expect(inventory.header.cartBadge).toHaveCount(0);
    for (const p of PRODUCTS) await inventory.addButton(p.slug).click();
    await expect(inventory.header.cartBadge).toHaveText('6');
    for (const p of PRODUCTS) await expect(inventory.removeButton(p.slug)).toHaveText('Remove');
    await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(0);
  });

  test('[TC-INV-CAT-010] Quitar un producto desde el listado @P0', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.addButton('sauce-labs-backpack').click();
    await expect(inventory.header.cartBadge).toHaveText('1');
    await inventory.removeButton('sauce-labs-backpack').click();
    await expect(inventory.addButton('sauce-labs-backpack')).toHaveText('Add to cart');
    await expect(inventory.header.cartBadge).toHaveCount(0);
    const contents = await inventory.cartContents();
    expect(contents === null ? [] : (JSON.parse(contents) as number[])).not.toContain(4);
  });

  test('[TC-INV-CAT-014] Agregar y quitar desde el detalle @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await expect(inventory.header.cartBadge).toHaveCount(0);
    await inventory.gotoDetail(4);
    await expect(inventory.names).toHaveText('Sauce Labs Backpack');
    await inventory.detailAdd.click();
    await expect(inventory.detailRemove).toHaveText('Remove');
    await expect(inventory.header.cartBadge).toHaveText('1');
    await inventory.detailRemove.click();
    await expect(inventory.detailAdd).toHaveText('Add to cart');
    await expect(inventory.header.cartBadge).toHaveCount(0);
  });

  test('[TC-INV-CAT-015] El detalle refleja un producto que ya está en el carrito @P2', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.addButton('sauce-labs-backpack').click();
    await expect(inventory.header.cartBadge).toHaveText('1');
    await inventory.openDetailBy(inventory.titleLink(4));
    await expect(page).toHaveURL(/inventory-item\.html\?id=4$/);
    await expect(inventory.detailRemove).toHaveText('Remove');
    await expect(inventory.detailAdd).toHaveCount(0);
    await expect(inventory.header.cartBadge).toHaveText('1');
  });
});

test.describe('INV-CAT - Detalle de producto', () => {
  test('[TC-INV-CAT-011] El nombre abre el detalle del mismo producto @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.openDetailBy(inventory.titleLink(4));
    await expect(page).toHaveURL(/inventory-item\.html\?id=4$/);
    await expect(inventory.names).toHaveText('Sauce Labs Backpack');
    await expect(inventory.prices).toHaveText('$29.99');
  });

  test('[TC-INV-CAT-012] La imagen abre el detalle del mismo producto @P2', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.openDetailBy(inventory.imgLink(0));
    await expect(page).toHaveURL(/inventory-item\.html\?id=0$/);
    await expect(inventory.names).toHaveText('Sauce Labs Bike Light');
    await expect(inventory.prices).toHaveText('$9.99');
  });

  test('[TC-INV-CAT-013] El detalle muestra los mismos datos que el listado para los 6 productos @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    const listed: Record<number, { name: string; desc: string; price: string }> = {};
    for (const p of PRODUCTS) {
      const card = inventory.items.filter({ has: page.getByTestId(`item-${p.id}-title-link`) });
      listed[p.id] = {
        name: ((await card.getByTestId('inventory-item-name').textContent()) ?? '').trim(),
        desc: ((await card.getByTestId('inventory-item-desc').textContent()) ?? '').trim(),
        price: ((await card.getByTestId('inventory-item-price').textContent()) ?? '').trim(),
      };
    }
    for (const id of [4, 0, 1, 5, 2, 3]) {
      await test.step(`detalle id=${id}`, async () => {
        await inventory.openDetailBy(inventory.titleLink(id));
        await expect(page).toHaveURL(new RegExp(`\\?id=${id}$`));
        const detail = {
          name: ((await inventory.names.textContent()) ?? '').trim(),
          desc: ((await inventory.descs.textContent()) ?? '').trim(),
          price: ((await inventory.prices.textContent()) ?? '').trim(),
        };
        expect(detail).toEqual(listed[id]);
        await inventory.backToList();
      });
    }
  });

  test('[TC-INV-CAT-016] Volver al listado desde el detalle @P2', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.gotoDetail(4);
    await expect(inventory.names).toHaveText('Sauce Labs Backpack');
    await inventory.backToList();
    await expect(inventory.header.title).toHaveText('Products');
    await expect(inventory.items).toHaveCount(6);
  });

  test('[TC-INV-CAT-017] Detalle de un producto inexistente @P3', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.gotoDetail(99);
    // Price "$√-1" and an operable button are REC-SD-007: not asserted.
    await expect(inventory.names).toHaveText('ITEM NOT FOUND');
  });
});

test.describe('INV-CAT - Acceso sin sesión', () => {
  test.use({ qaUser: 'anonymous' });

  test('[TC-INV-CAT-018] Catálogo sin sesión redirige al login @P1', async ({ page, context }) => {
    expect((await context.cookies()).filter((c) => c.name === 'session-username')).toHaveLength(0);
    await page.goto('/inventory.html');
    await expect(page.getByTestId('error')).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
    await expect(page.getByTestId('login-button')).toBeVisible();
    await page.goto('/inventory-item.html?id=1');
    await expect(page.getByTestId('error')).toHaveText("Epic sadface: You can only access '/inventory-item.html' when you are logged in.");
    await expect(page.getByTestId('login-button')).toBeVisible();
  });
});

test.describe('INV-CAT - Comportamiento por usuario: problem_user', () => {
  test.use({ qaUser: 'problem_user' });

  test('[TC-INV-CAT-019] problem_user ve la imagen propia de cada producto @P2', async ({ page }) => {
    const inventory = await openCatalog(page);
    const srcs: Record<string, string> = {};
    for (const p of PRODUCTS) srcs[p.slug] = (await inventory.image(p.slug).getAttribute('src')) ?? '';
    await expectOpenDefect('DEF-SD-001', 'RN-INV-011: problem_user ve sl-404 en todas las imágenes del listado', () => {
      for (const p of PRODUCTS) {
        expect.soft(srcs[p.slug], `src de ${p.name}`).not.toContain('sl-404');
        expect.soft(srcs[p.slug], `src de ${p.name}`).toContain(p.image);
      }
    });
  });

  test('[TC-INV-CAT-020] problem_user puede ordenar el listado @P2', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.sort.selectOption('za');
    const za = { active: ((await inventory.activeOption.textContent()) ?? '').trim(), first: (await inventory.readNames())[0] };
    await inventory.sort.selectOption('lohi');
    const lohi = { active: ((await inventory.activeOption.textContent()) ?? '').trim(), prices: (await inventory.readPrices()).map(toNumber) };
    await expectOpenDefect('DEF-SD-002', 'RN-INV-003/004: el orden elegido no tiene efecto para problem_user', () => {
      expect.soft(za.active).toBe('Name (Z to A)');
      expect.soft(za.first).toBe('Test.allTheThings() T-Shirt (Red)');
      expect.soft(lohi.active).toBe('Price (low to high)');
      expect.soft(lohi.prices).toEqual([...lohi.prices].sort((a, b) => a - b));
    });
  });

  test('[TC-INV-CAT-021] problem_user puede agregar y quitar los 6 productos @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await expect(inventory.header.cartBadge).toHaveCount(0);
    const result = await addAndRemoveAll(inventory);
    await expectOpenDefect('DEF-SD-003', 'RN-INV-005/006: problem_user no puede agregar 3 productos ni quitar desde el listado', () => {
      expect.soft(result.afterAdd.badge).toBe('6');
      expect.soft(result.afterAdd.removeButtons).toBe(6);
      expect.soft(result.afterRemove.badge).toBeNull();
      expect.soft(result.afterRemove.addButtons).toBe(6);
    });
  });

  test('[TC-INV-CAT-022] problem_user abre el detalle del producto elegido @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.openDetailBy(inventory.titleLink(4));
    const observed = {
      url: page.url(),
      name: ((await inventory.names.textContent()) ?? '').trim(),
      price: ((await inventory.prices.textContent()) ?? '').trim(),
    };
    await expectOpenDefect('DEF-SD-004', 'RN-INV-007: el enlace de un producto abre el detalle de otro (id+1) para problem_user', () => {
      expect.soft(observed.url).toMatch(/inventory-item\.html\?id=4$/);
      expect.soft(observed.name).toBe('Sauce Labs Backpack');
      expect.soft(observed.price).toBe('$29.99');
    });
  });
});

test.describe('INV-CAT - Comportamiento por usuario: error_user', () => {
  test.use({ qaUser: 'error_user' });

  test('[TC-INV-CAT-023] error_user puede ordenar sin errores @P2', async ({ page }) => {
    const dialogs: string[] = [];
    page.on('dialog', async (dialog) => {
      dialogs.push(dialog.message());
      await dialog.accept();
    });
    const inventory = await openCatalog(page);
    await inventory.sort.selectOption('za');
    const names = await inventory.readNames();
    const active = ((await inventory.activeOption.textContent()) ?? '').trim();
    await expectOpenDefect('DEF-SD-005', 'RN-INV-003/004: ordenar muestra un alert de error y no reordena para error_user', () => {
      expect.soft(names[0]).toBe('Test.allTheThings() T-Shirt (Red)');
      expect.soft(names[names.length - 1]).toBe('Sauce Labs Backpack');
      expect.soft(active).toBe('Name (Z to A)');
      expect.soft(dialogs).toHaveLength(0);
    });
  });

  test('[TC-INV-CAT-024] error_user puede agregar y quitar los 6 productos @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await expect(inventory.header.cartBadge).toHaveCount(0);
    const result = await addAndRemoveAll(inventory);
    await expectOpenDefect('DEF-SD-006', 'RN-INV-005/006: error_user no puede agregar 3 productos ni quitar desde el listado', () => {
      expect.soft(result.afterAdd.badge).toBe('6');
      expect.soft(result.afterAdd.removeButtons).toBe(6);
      expect.soft(result.afterRemove.badge).toBeNull();
      expect.soft(result.afterRemove.addButtons).toBe(6);
    });
  });
});

test.describe('INV-CAT - Comportamiento por usuario: visual_user y performance_glitch_user', () => {
  test('[TC-INV-CAT-025] visual_user ve precios reales y con 2 decimales @P1', async ({ browser }) => {
    const context = await newPersonaContext(browser, 'visual_user');
    try {
      const page = await context.newPage();
      const inventory = await openCatalog(page);
      const names = await inventory.readNames();
      const prices = await inventory.readPrices();
      const listed = Object.fromEntries(names.map((n, i) => [n, prices[i]]));
      await inventory.openDetailBy(inventory.titleLink(4));
      const detailPrice = ((await inventory.prices.textContent()) ?? '').trim();
      await inventory.backToList();
      await inventory.addButton('sauce-labs-backpack').click();
      await inventory.header.goToCart();
      const cartPrice = ((await new CartPage(page).rowPrices.first().textContent()) ?? '').trim();
      await expectOpenDefect('DEF-SD-007', 'RN-INV-012: el listado de visual_user muestra precios aleatorios y sin 2 decimales', () => {
        expect.soft(listed).toEqual(PRICE_BY_NAME);
        for (const price of prices) expect.soft(price).toMatch(PRICE_FORMAT);
        expect.soft(listed['Sauce Labs Backpack']).toBe('$29.99');
        expect.soft(detailPrice).toBe('$29.99');
        expect.soft(cartPrice).toBe('$29.99');
      });
    } finally {
      await context.close();
    }
  });

  test('[TC-INV-CAT-026] visual_user ve imágenes y controles en su posición @P3', async ({ browser }, testInfo) => {
    const ctxA = await newPersonaContext(browser, 'standard_user');
    const ctxB = await newPersonaContext(browser, 'visual_user');
    try {
      const pageA = await ctxA.newPage();
      const invA = await openCatalog(pageA);
      const boxA = await invA.header.cartLink.boundingBox();
      await testInfo.attach('standard_user-inventory-list', { body: await invA.list.screenshot(), contentType: 'image/png' });

      const pageB = await ctxB.newPage();
      const invB = await openCatalog(pageB);
      const backpackSrc = (await invB.image('sauce-labs-backpack').getAttribute('src')) ?? '';
      const boxB = await invB.header.cartLink.boundingBox();
      const classes = await pageB.locator('[data-test^="add-to-cart-"]').evaluateAll((els) => els.map((e) => e.className));
      await testInfo.attach('visual_user-inventory-list', { body: await invB.list.screenshot(), contentType: 'image/png' });
      testInfo.annotations.push({
        type: 'manual-review',
        description: 'Comparación visual lado a lado de las 2 capturas adjuntas: ver qa/03-test-cases/TC-INV-CAT-026-visual-user-imagenes-y-controles.md',
      });
      if (!boxA || !boxB) throw new Error('shopping-cart-link has no bounding box');

      await expectOpenDefect('DEF-SD-008', 'RN-INV-011: visual_user ve la imagen sl-404 de Backpack, el ícono del carrito desplazado y un botón desalineado', () => {
        expect.soft(backpackSrc).not.toContain('sl-404');
        expect.soft(Math.abs(boxB.x - boxA.x), 'desplazamiento x del carrito').toBeLessThanOrEqual(2);
        expect.soft(Math.abs(boxB.y - boxA.y), 'desplazamiento y del carrito').toBeLessThanOrEqual(2);
        expect.soft(classes.filter((c) => c.includes('btn_inventory_misaligned'))).toHaveLength(0);
      });
    } finally {
      await ctxA.close();
      await ctxB.close();
    }
  });

  test('[TC-INV-CAT-026] visual_user ve imágenes y controles en su posición - revisión manual @P3', async () => {
    test.skip(
      true,
      'PENDING-CODE: parte manual del TC "Ambos" (comparación visual de capturas), no automatizable por diseño. ' +
        'Procedimiento: qa/03-test-cases/TC-INV-CAT-026-visual-user-imagenes-y-controles.md'
    );
  });

  test.describe('performance_glitch_user', () => {
    test.use({ qaUser: 'performance_glitch_user' });

    test('[TC-INV-CAT-027] performance_glitch_user ve el mismo catálogo que standard_user @P3', async ({ page }) => {
      const inventory = await openCatalog(page);
      const names = await inventory.readNames();
      const prices = await inventory.readPrices();
      expect(Object.fromEntries(names.map((n, i) => [n, prices[i]]))).toEqual(PRICE_BY_NAME);
      for (const p of PRODUCTS) expect(await inventory.image(p.slug).getAttribute('src')).not.toContain('sl-404');
      await inventory.sort.selectOption('lohi');
      const sorted = await inventory.readNames();
      expect(sorted[0]).toBe(byId(2).name);
      expect(sorted[sorted.length - 1]).toBe(byId(5).name);
    });
  });
});
