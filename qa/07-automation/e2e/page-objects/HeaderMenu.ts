import { Page, Locator, expect } from '@playwright/test';

// NAV-MENU: header, side menu (react-burger-menu) and footer, shared by every internal view.
// INSPECTION 2026-11-21: #react-burger-menu-btn, #react-burger-cross-btn, `.bm-menu-wrap`
// (aria-hidden), links inventory/dynamic-catalog/about/logout/reset-sidebar-link,
// dynamic-catalog-submenu with lazy-load/spinner/slider links, shopping-cart-link,
// shopping-cart-badge (absent with an empty cart), footer, footer-copy, social-x/facebook/linkedin.
export class HeaderMenu {
  readonly page: Page;
  readonly burger: Locator;
  readonly cross: Locator;
  readonly wrap: Locator;
  readonly sidebarLinks: Locator;
  readonly allItems: Locator;
  readonly dynamicCatalog: Locator;
  readonly dynamicSubmenu: Locator;
  readonly about: Locator;
  readonly logout: Locator;
  readonly reset: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly logo: Locator;
  readonly footer: Locator;
  readonly footerCopy: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burger = page.locator('#react-burger-menu-btn');
    this.cross = page.locator('#react-burger-cross-btn');
    this.wrap = page.locator('.bm-menu-wrap');
    this.sidebarLinks = this.wrap.locator('[data-test$="-sidebar-link"]');
    this.allItems = page.getByTestId('inventory-sidebar-link');
    this.dynamicCatalog = page.getByTestId('dynamic-catalog-sidebar-link');
    this.dynamicSubmenu = page.getByTestId('dynamic-catalog-submenu');
    this.about = page.getByTestId('about-sidebar-link');
    this.logout = page.getByTestId('logout-sidebar-link');
    this.reset = page.getByTestId('reset-sidebar-link');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.logo = page.locator('.app_logo');
    this.footer = page.getByTestId('footer');
    this.footerCopy = page.getByTestId('footer-copy');
    this.title = page.getByTestId('title');
  }

  /**
   * Waits until a closed menu has settled. react-burger-menu adds the `hidden` attribute
   * to the closed panel through a timer ~0.3-0.8 s after the view renders. A burger click
   * that lands while that timer fires leaves the panel in an inconsistent state
   * (aria-hidden="false" AND hidden): the links never become visible (FLK-SD-06, REC-SD-013).
   * A real user does not click within that window; the suite waits for the settled state.
   */
  async waitForClosedMenuSettled(): Promise<void> {
    if ((await this.wrap.getAttribute('aria-hidden')) === 'true') {
      await expect(this.wrap).toHaveAttribute('hidden');
    }
  }

  /** Opens the side menu and waits until the panel is exposed (aria-hidden=false, not hidden). */
  async open(): Promise<void> {
    await this.waitForClosedMenuSettled();
    await this.burger.click();
    await expect(this.wrap).toHaveAttribute('aria-hidden', 'false');
    await expect(this.wrap).not.toHaveAttribute('hidden');
  }

  /**
   * Expands the Dynamic Catalog submenu only when it is collapsed: a blind second click
   * collapses it and removes the submenu from the DOM (memory: saucedemo-app-behavior).
   */
  async expandDynamicCatalog(): Promise<void> {
    if ((await this.dynamicCatalog.getAttribute('aria-expanded')) !== 'true') {
      await this.dynamicCatalog.click();
    }
    await expect(this.dynamicSubmenu).toBeVisible();
  }

  async openDynamicView(view: 'lazy-load' | 'spinner' | 'slider'): Promise<void> {
    await this.open();
    await this.expandDynamicCatalog();
    await this.page.getByTestId(`dynamic-catalog-${view}-link`).click();
    await this.page.waitForURL(`**/dynamic-catalog-${view}.html`);
  }

  async logoutViaMenu(): Promise<void> {
    await this.open();
    await this.logout.click();
    await this.page.getByTestId('login-button').waitFor({ state: 'visible' });
  }

  async resetAppState(): Promise<void> {
    await this.open();
    await this.reset.click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
    await this.page.waitForURL('**/cart.html');
    await this.page.getByTestId('cart-list').waitFor({ state: 'visible' });
  }
}
