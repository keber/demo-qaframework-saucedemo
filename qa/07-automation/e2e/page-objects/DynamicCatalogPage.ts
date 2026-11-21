import { Page, Locator, expect } from '@playwright/test';
import { HeaderMenu } from './HeaderMenu';

// INV-DYN: Dynamic Catalog views (/dynamic-catalog-lazy-load.html, -spinner.html, -slider.html)
// INSPECTION 2026-11-21:
//   Lazy Load: dynamic-catalog-lazy-load-container, cards lazy-load-item-{n} with
//     -img/-name/-price (loaded) or -placeholder "Loading..." (8 loaded + 4 placeholders
//     on first render), dynamic-catalog-lazy-load-sentinel at the end.
//   Spinner: dynamic-catalog-spinner (0.9-3.6 s), then dynamic-catalog-spinner-grid with
//     spinner-item-{0..5} (-img/-name/-price).
//   Slider: dynamic-catalog-slider-container, dynamic-catalog-slider-item(-img/-name/-price),
//     dynamic-catalog-slider-dot-{0..5} with aria-current (autoplay).
// Known defects: none.
export class DynamicCatalogPage {
  readonly page: Page;
  readonly header: HeaderMenu;
  readonly lazyNames: Locator;
  readonly lazyPrices: Locator;
  readonly lazyPlaceholders: Locator;
  readonly sentinel: Locator;
  readonly spinner: Locator;
  readonly spinnerGrid: Locator;
  readonly spinnerCards: Locator;
  readonly spinnerPrices: Locator;
  readonly sliderContainer: Locator;
  readonly sliderItem: Locator;
  readonly sliderName: Locator;
  readonly sliderPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderMenu(page);
    this.lazyNames = page.locator('[data-test^="lazy-load-item-"][data-test$="-name"]');
    this.lazyPrices = page.locator('[data-test^="lazy-load-item-"][data-test$="-price"]');
    this.lazyPlaceholders = page.locator('[data-test^="lazy-load-item-"][data-test$="-placeholder"]');
    this.sentinel = page.getByTestId('dynamic-catalog-lazy-load-sentinel');
    this.spinner = page.getByTestId('dynamic-catalog-spinner');
    this.spinnerGrid = page.getByTestId('dynamic-catalog-spinner-grid');
    this.spinnerCards = page.locator('[data-test^="spinner-item-"]:not([data-test$="-img"]):not([data-test$="-name"]):not([data-test$="-price"])');
    this.spinnerPrices = page.locator('[data-test^="spinner-item-"][data-test$="-price"]');
    this.sliderContainer = page.getByTestId('dynamic-catalog-slider-container');
    this.sliderItem = page.getByTestId('dynamic-catalog-slider-item');
    this.sliderName = page.getByTestId('dynamic-catalog-slider-item-name');
    this.sliderPrice = page.getByTestId('dynamic-catalog-slider-item-price');
  }

  /** Number of lazy-load card roots (data-test exactly lazy-load-item-{n}). */
  async lazyCardCount(): Promise<number> {
    return this.page.locator('[data-test^="lazy-load-item-"]').evaluateAll(
      (els) => els.filter((e) => /^lazy-load-item-\d+$/.test(e.getAttribute('data-test') ?? '')).length
    );
  }

  async gotoLazyLoad(): Promise<void> {
    await this.page.goto('/dynamic-catalog-lazy-load.html');
    await expect.poll(() => this.lazyCardCount(), { timeout: 10_000 }).toBeGreaterThanOrEqual(12);
  }

  /** Scrolls to the sentinel `times` times, waiting each time for more cards. */
  async scrollMore(times: number): Promise<void> {
    for (let i = 0; i < times; i++) {
      const before = await this.lazyNames.count();
      await this.sentinel.scrollIntoViewIfNeeded();
      await expect.poll(() => this.lazyNames.count(), { timeout: 10_000 }).toBeGreaterThan(before);
    }
  }

  async gotoSpinner(): Promise<void> {
    await this.page.goto('/dynamic-catalog-spinner.html');
    await this.spinnerGrid.waitFor({ state: 'visible', timeout: 10_000 });
  }

  async gotoSlider(): Promise<void> {
    await this.page.goto('/dynamic-catalog-slider.html');
    await this.sliderItem.waitFor({ state: 'visible' });
  }

  sliderDot(n: number): Locator {
    return this.page.getByTestId(`dynamic-catalog-slider-dot-${n}`);
  }
}
