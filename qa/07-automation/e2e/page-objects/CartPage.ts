import { Page, Locator } from '@playwright/test';
import { HeaderMenu } from './HeaderMenu';

// CART-CRT: cart page (/cart.html)
// INSPECTION 2026-11-21: title "Your Cart", cart-list, cart-quantity-label "QTY",
// cart-desc-label "Description", rows `.cart_item` (a removed row leaves a hidden
// `.removed_cart_item`, never count children), item-quantity, inventory-item-name/price,
// item-{id}-title-link, remove-{slug}, continue-shopping, checkout.
// Known defects: DEF-SD-009 (shared cart between users), DEF-SD-010 (empty-cart checkout).
export class CartPage {
  static readonly route = '/cart.html';
  readonly page: Page;
  readonly header: HeaderMenu;
  readonly list: Locator;
  readonly rows: Locator;
  readonly rowNames: Locator;
  readonly rowPrices: Locator;
  readonly quantities: Locator;
  readonly quantityLabel: Locator;
  readonly descLabel: Locator;
  readonly continueShopping: Locator;
  readonly checkout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderMenu(page);
    this.list = page.getByTestId('cart-list');
    this.rows = page.locator('.cart_item');
    this.rowNames = this.rows.getByTestId('inventory-item-name');
    this.rowPrices = this.rows.getByTestId('inventory-item-price');
    this.quantities = this.rows.getByTestId('item-quantity');
    this.quantityLabel = page.getByTestId('cart-quantity-label');
    this.descLabel = page.getByTestId('cart-desc-label');
    this.continueShopping = page.getByTestId('continue-shopping');
    this.checkout = page.getByTestId('checkout');
  }

  async goto(): Promise<void> {
    await this.page.goto(CartPage.route);
    await this.list.waitFor({ state: 'visible' });
  }

  removeButton(slug: string): Locator {
    return this.page.getByTestId(`remove-${slug}`);
  }

  async backToCatalog(): Promise<void> {
    await this.continueShopping.click();
    await this.page.waitForURL('**/inventory.html');
    await this.page.getByTestId('inventory-list').waitFor({ state: 'visible' });
  }

  async startCheckout(): Promise<void> {
    await this.checkout.click();
    await this.page.waitForURL('**/checkout-step-one.html');
    await this.page.getByTestId('firstName').waitFor({ state: 'visible' });
  }
}
