/**
 * @module INV
 * @submodule DYN
 * @spec qa/01-specifications/module-inventory/submodule-dynamic-catalog/05-test-scenarios.md
 * @plan qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-saucedemo-Sprint-1-INV.md
 *
 * INSPECTION: 2026-11-21
 * Menu: dynamic-catalog-sidebar-link (aria-expanded) toggles dynamic-catalog-submenu
 * (lazy-load / spinner / slider links). A second click collapses it and removes the
 * submenu from the DOM: read aria-expanded before clicking (HeaderMenu.expandDynamicCatalog).
 * Lazy Load: 12 cards lazy-load-item-{n} on first render (8 loaded + 4 -placeholder
 * "Loading..."), sentinel dynamic-catalog-lazy-load-sentinel.
 * Spinner: dynamic-catalog-spinner then dynamic-catalog-spinner-grid with spinner-item-{0..5}.
 * Slider: dynamic-catalog-slider-item(-name/-price), dots dynamic-catalog-slider-dot-{0..5}
 * with aria-current, autoplay.
 */

import { test, expect } from '../../fixtures/base';
import type { Page } from '@playwright/test';
import { DynamicCatalogPage } from '../../page-objects/DynamicCatalogPage';
import { PRICE_BY_NAME, protectedRouteError } from '../../fixtures/catalog';
import type { SauceUser } from '../../fixtures/base';

async function openCatalog(page: Page): Promise<DynamicCatalogPage> {
  const dyn = new DynamicCatalogPage(page);
  await page.goto('/inventory.html');
  await expect(dyn.header.title).toHaveText('Products');
  return dyn;
}

/** Base product of a lazy-load card name: strips a trailing size suffix like " (XS)". */
function baseProduct(name: string): string {
  return name.replace(/ \((XS|S|M|L|XL|XXL|2XL|3XL)\)$/, '').trim();
}

test.describe('INV-DYN - Dynamic Catalog', () => {
  test('[TC-INV-DYN-001] Desplegar el submenú Dynamic Catalog @P2', async ({ page }) => {
    const dyn = await openCatalog(page);
    await dyn.header.open();
    await expect(dyn.header.dynamicCatalog).toHaveAttribute('aria-expanded', 'false');
    await dyn.header.dynamicCatalog.click();
    await expect(dyn.header.dynamicCatalog).toHaveAttribute('aria-expanded', 'true');
    await expect(dyn.header.dynamicSubmenu).toBeVisible();
    await expect(page.getByTestId('dynamic-catalog-lazy-load-link')).toHaveText('Lazy Load');
    await expect(page.getByTestId('dynamic-catalog-spinner-link')).toHaveText('Spinner');
    await expect(page.getByTestId('dynamic-catalog-slider-link')).toHaveText('Slider');
    await expect(page).toHaveURL(/\/inventory\.html$/);
  });

  test('[TC-INV-DYN-002] Abrir Lazy Load @P2', async ({ page }) => {
    const dyn = await openCatalog(page);
    await dyn.header.openDynamicView('lazy-load');
    await expect(dyn.header.title).toHaveText('Dynamic Catalog - Lazy Load');
    await expect.poll(() => dyn.lazyCardCount()).toBe(12);
    await expect(dyn.lazyPlaceholders).toHaveCount(4);
    // The app renders "Loading" + U+2026 (horizontal ellipsis); the plan writes it as
    // "Loading..." because rule 11 forbids U+2026 in documents. Both forms are accepted.
    for (let i = 0; i < 4; i++) await expect(dyn.lazyPlaceholders.nth(i)).toHaveText(/^Loading(\.\.\.|\u2026)$/);
  });

  test('[TC-INV-DYN-003] El scroll carga más productos @P2', async ({ page }) => {
    const dyn = await openCatalog(page);
    await dyn.gotoLazyLoad();
    await dyn.scrollMore(3);
    expect(await dyn.lazyNames.count()).toBeGreaterThan(12);
    // No card that already shows its name keeps a placeholder.
    const withBoth = await page.locator('[data-test^="lazy-load-item-"][data-test$="-name"]').evaluateAll((els) =>
      els.filter((e) => {
        const root = (e.getAttribute('data-test') ?? '').replace(/-name$/, '');
        return document.querySelector(`[data-test="${root}-placeholder"]`) !== null;
      }).length
    );
    expect(withBoth).toBe(0);
  });

  test('[TC-INV-DYN-004] Precios de Lazy Load iguales al catálogo @P3', async ({ page }) => {
    const dyn = await openCatalog(page);
    await dyn.gotoLazyLoad();
    await dyn.scrollMore(3);
    // One DOM pass per card (FLK-SD-08): the list keeps loading while it is read.
    const cards = await dyn.readLazyCards();
    expect(cards.length).toBeGreaterThan(12);
    for (const card of cards) {
      const product = baseProduct(card.name);
      expect.soft(PRICE_BY_NAME[product], `"${card.name}" belongs to the reference catalog`).toBeTruthy();
      expect.soft(card.price, `price of "${card.name}"`).toBe(PRICE_BY_NAME[product]);
    }
  });

  test('[TC-INV-DYN-005] Spinner visible durante la carga @P2', async ({ page }) => {
    const dyn = await openCatalog(page);
    await dyn.header.open();
    await dyn.header.expandDynamicCatalog();
    await page.getByTestId('dynamic-catalog-spinner-link').click();
    await expect(dyn.spinner).toBeVisible();
    await expect(dyn.spinnerGrid).toBeVisible({ timeout: 10_000 });
    await expect(dyn.spinnerCards).toHaveCount(6);
    await expect(dyn.header.title).toHaveText('Dynamic Catalog - Spinner');
  });

  test('[TC-INV-DYN-006] El spinner reaparece al recargar @P3', async ({ page }) => {
    const dyn = await openCatalog(page);
    await dyn.gotoSpinner();
    await page.reload();
    await expect(dyn.spinner).toBeVisible();
    await expect(dyn.spinnerGrid).toBeVisible({ timeout: 10_000 });
    await expect(dyn.spinnerCards).toHaveCount(6);
  });

  test('[TC-INV-DYN-007] El punto del slider muestra su producto @P2', async ({ page }) => {
    const dyn = await openCatalog(page);
    await dyn.gotoSlider();
    await dyn.sliderDot(4).click();
    // Asserted right after the click because of the autoplay.
    await expect(dyn.sliderName).toHaveText('Sauce Labs Backpack');
    await expect(dyn.sliderPrice).toHaveText('$29.99');
    await expect(dyn.sliderDot(4)).toHaveAttribute('aria-current', 'true');
  });

  test('[TC-INV-DYN-008] El slider avanza automáticamente @P3', async ({ page }) => {
    const dyn = await openCatalog(page);
    await dyn.gotoSlider();
    const first = ((await dyn.sliderName.textContent()) ?? '').trim();
    await expect.poll(async () => ((await dyn.sliderName.textContent()) ?? '').trim(), { timeout: 8_000 }).not.toBe(first);
  });

  test('[TC-INV-DYN-011] Las vistas del Dynamic Catalog son de solo lectura @P3', async ({ page }) => {
    const dyn = await openCatalog(page);
    await dyn.gotoLazyLoad();
    await expect(page.locator('[data-test^="add-to-cart"]')).toHaveCount(0);
    await dyn.gotoSpinner();
    await expect(page.locator('[data-test^="add-to-cart"]')).toHaveCount(0);
    await dyn.gotoSlider();
    await expect(page.locator('[data-test^="add-to-cart"]')).toHaveCount(0);
    await dyn.gotoLazyLoad();
    await page.getByTestId('lazy-load-item-0').click();
    await expect(page).toHaveURL(/\/dynamic-catalog-lazy-load\.html$/);
    await expect(dyn.header.cartBadge).toHaveCount(0);
  });

  test('[TC-INV-DYN-013] Cerrar el submenú con un segundo clic @P3', async ({ page }) => {
    const dyn = await openCatalog(page);
    await dyn.header.open();
    await dyn.header.dynamicCatalog.click();
    await expect(dyn.header.dynamicCatalog).toHaveAttribute('aria-expanded', 'true');
    await expect(dyn.header.dynamicSubmenu).toBeVisible();
    await dyn.header.dynamicCatalog.click();
    await expect(dyn.header.dynamicCatalog).toHaveAttribute('aria-expanded', 'false');
    await expect(dyn.header.dynamicSubmenu).toHaveCount(0);
    await expect(page).toHaveURL(/\/inventory\.html$/);
  });
});

test.describe('INV-DYN - Acceso sin sesión', () => {
  test.use({ qaUser: 'anonymous' });

  test('[TC-INV-DYN-009] Slider sin sesión redirige al login @P1', async ({ page, context }) => {
    expect((await context.cookies()).filter((c) => c.name === 'session-username')).toHaveLength(0);
    await page.goto('/dynamic-catalog-slider.html');
    await expect(page.getByTestId('error')).toHaveText(protectedRouteError('/dynamic-catalog-slider.html'));
    await expect(page.getByTestId('login-button')).toBeVisible();
    await expect(page.getByTestId('dynamic-catalog-slider-container')).toHaveCount(0);
  });

  test('[TC-INV-DYN-010] Lazy Load y Spinner sin sesión redirigen al login @P2', async ({ page, context }) => {
    expect((await context.cookies()).filter((c) => c.name === 'session-username')).toHaveLength(0);
    for (const route of ['/dynamic-catalog-lazy-load.html', '/dynamic-catalog-spinner.html']) {
      await page.goto(route);
      await expect(page.getByTestId('error')).toHaveText(protectedRouteError(route));
      await expect(page.getByTestId('login-button')).toBeVisible();
    }
  });
});

const NON_STANDARD: SauceUser[] = ['problem_user', 'error_user', 'visual_user', 'performance_glitch_user'];
for (const user of NON_STANDARD) {
  test.describe(`INV-DYN - Comportamiento por usuario (${user})`, () => {
    test.use({ qaUser: user });

    test(`[TC-INV-DYN-012] Dynamic Catalog con usuarios no estándar (${user}) @P3`, async ({ page }) => {
      const dialogs: string[] = [];
      const pageErrors: string[] = [];
      page.on('dialog', async (d) => {
        dialogs.push(d.message());
        await d.accept();
      });
      page.on('pageerror', (e) => pageErrors.push(e.message));
      const dyn = await openCatalog(page);

      await dyn.header.openDynamicView('lazy-load');
      await expect.poll(() => dyn.lazyCardCount()).toBe(12);
      await dyn.scrollMore(3);
      expect(await dyn.lazyNames.count()).toBeGreaterThan(12);
      const lazyImgs = await page.locator('[data-test^="lazy-load-item-"][data-test$="-img"]').evaluateAll((els) =>
        els.map((e) => e.getAttribute('src') ?? '')
      );

      await dyn.header.openDynamicView('spinner');
      await expect(dyn.spinnerGrid).toBeVisible({ timeout: 10_000 });
      await expect(dyn.spinnerCards).toHaveCount(6);
      expect((await dyn.spinnerPrices.allTextContents()).map((t) => t.trim())).toEqual(['$9.99', '$15.99', '$7.99', '$15.99', '$29.99', '$49.99']);
      const spinnerImgs = await page.locator('[data-test^="spinner-item-"][data-test$="-img"]').evaluateAll((els) =>
        els.map((e) => e.getAttribute('src') ?? '')
      );

      await dyn.header.openDynamicView('slider');
      await dyn.sliderItem.waitFor({ state: 'visible' });
      await dyn.sliderDot(4).click();
      await expect(dyn.sliderName).toHaveText('Sauce Labs Backpack');
      await expect(dyn.sliderPrice).toHaveText('$29.99');
      await expect(dyn.sliderDot(4)).toHaveAttribute('aria-current', 'true');

      expect([...lazyImgs, ...spinnerImgs].filter((s) => s.includes('sl-404'))).toHaveLength(0);
      expect(dialogs).toHaveLength(0);
      expect(pageErrors).toHaveLength(0);
    });
  });
}
