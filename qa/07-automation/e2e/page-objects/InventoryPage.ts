import { Page, Locator } from '@playwright/test';
import { HeaderMenu } from './HeaderMenu';

// INV-CAT: product list (/inventory.html) and product detail (/inventory-item.html?id=N)
// INSPECTION 2026-11-21: inventory-list > inventory-item (6) with inventory-item-name,
// inventory-item-desc, inventory-item-price, inventory-item-{slug}-img,
// item-{id}-title-link, item-{id}-img-link, add-to-cart-{slug} / remove-{slug};
// product-sort-container (az, za, lohi, hilo) + active-option.
// Detail: back-to-products, inventory-item-name/desc/price, add-to-cart / remove,
// image item-{slug}-img. State: localStorage `cart-contents` (JSON array of ids).
// Known defects: DEF-SD-001..008 (problem_user, error_user, visual_user).
export class InventoryPage {
  static readonly route = '/inventory.html';
  readonly page: Page;
  readonly header: HeaderMenu;
  readonly list: Locator;
  readonly items: Locator;
  readonly names: Locator;
  readonly descs: Locator;
  readonly prices: Locator;
  readonly sort: Locator;
  readonly activeOption: Locator;
  readonly backToProducts: Locator;
  readonly detailAdd: Locator;
  readonly detailRemove: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderMenu(page);
    this.list = page.getByTestId('inventory-list');
    this.items = page.getByTestId('inventory-item');
    this.names = page.getByTestId('inventory-item-name');
    this.descs = page.getByTestId('inventory-item-desc');
    this.prices = page.getByTestId('inventory-item-price');
    this.sort = page.getByTestId('product-sort-container');
    this.activeOption = page.getByTestId('active-option');
    this.backToProducts = page.getByTestId('back-to-products');
    this.detailAdd = page.getByTestId('add-to-cart');
    this.detailRemove = page.getByTestId('remove');
  }

  async goto(): Promise<void> {
    await this.page.goto(InventoryPage.route);
    await this.list.waitFor({ state: 'visible' });
  }

  async gotoDetail(id: number): Promise<void> {
    await this.page.goto(`/inventory-item.html?id=${id}`);
    await this.backToProducts.waitFor({ state: 'visible' });
  }

  addButton(slug: string): Locator {
    return this.page.getByTestId(`add-to-cart-${slug}`);
  }

  removeButton(slug: string): Locator {
    return this.page.getByTestId(`remove-${slug}`);
  }

  image(slug: string): Locator {
    return this.page.getByTestId(`inventory-item-${slug}-img`);
  }

  titleLink(id: number): Locator {
    return this.page.getByTestId(`item-${id}-title-link`);
  }

  imgLink(id: number): Locator {
    return this.page.getByTestId(`item-${id}-img-link`);
  }

  /** Clicks a link that navigates to a detail and waits for URL + detail view (SPA). */
  async openDetailBy(link: Locator): Promise<void> {
    await link.click();
    await this.page.waitForURL(/inventory-item\.html\?id=/);
    await this.backToProducts.waitFor({ state: 'visible' });
  }

  async backToList(): Promise<void> {
    await this.backToProducts.click();
    await this.page.waitForURL('**/inventory.html');
    await this.list.waitFor({ state: 'visible' });
  }

  async readNames(): Promise<string[]> {
    return (await this.names.allTextContents()).map((t) => t.trim());
  }

  async readPrices(): Promise<string[]> {
    return (await this.prices.allTextContents()).map((t) => t.trim());
  }

  async cartContents(): Promise<string | null> {
    return this.page.evaluate(() => localStorage.getItem('cart-contents'));
  }

  /** Setup shortcut (allowed by the plans): seeds the cart in localStorage and reloads. */
  async seedCart(ids: number[]): Promise<void> {
    await this.page.evaluate((v) => localStorage.setItem('cart-contents', v), JSON.stringify(ids));
    await this.page.reload();
    await this.list.waitFor({ state: 'visible' });
  }
}
