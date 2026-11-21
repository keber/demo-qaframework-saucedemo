import { Page, Locator } from '@playwright/test';
import { HeaderMenu } from './HeaderMenu';
import { CHECKOUT_DATA } from '../fixtures/catalog';

// CHK-FLW: checkout step one (/checkout-step-one.html), overview (/checkout-step-two.html)
// and complete (/checkout-complete.html).
// INSPECTION 2026-11-21: checkout-info-container, firstName, lastName, postalCode,
// cancel (BUTTON), continue (INPUT value "Continue"), error, error-button, 3 `.error_icon`;
// checkout-summary-container, payment-info-value, shipping-info-value, subtotal-label,
// tax-label, total-label, finish; checkout-complete-container, pony-express,
// complete-header, complete-text, back-to-products, generate-pdf-order.
// Known defects: DEF-SD-010..016 (empty-cart checkout, validation, flow, personas).
export class CheckoutPage {
  readonly page: Page;
  readonly header: HeaderMenu;
  readonly infoContainer: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueBtn: Locator;
  readonly cancel: Locator;
  readonly error: Locator;
  readonly errorButton: Locator;
  readonly errorIcons: Locator;
  readonly summary: Locator;
  readonly summaryRows: Locator;
  readonly payment: Locator;
  readonly shipping: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finish: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly pony: Locator;
  readonly backHome: Locator;
  readonly pdfButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderMenu(page);
    this.infoContainer = page.getByTestId('checkout-info-container');
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueBtn = page.getByTestId('continue');
    this.cancel = page.getByTestId('cancel');
    this.error = page.getByTestId('error');
    this.errorButton = page.getByTestId('error-button');
    this.errorIcons = page.locator('.error_icon');
    this.summary = page.getByTestId('checkout-summary-container');
    this.summaryRows = page.locator('.cart_item');
    this.payment = page.getByTestId('payment-info-value');
    this.shipping = page.getByTestId('shipping-info-value');
    this.subtotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.finish = page.getByTestId('finish');
    this.completeHeader = page.getByTestId('complete-header');
    this.completeText = page.getByTestId('complete-text');
    this.pony = page.getByTestId('pony-express');
    this.backHome = page.getByTestId('back-to-products');
    this.pdfButton = page.getByTestId('generate-pdf-order');
  }

  async fillInfo(data: { firstName?: string; lastName?: string; postalCode?: string } = CHECKOUT_DATA): Promise<void> {
    if (data.firstName !== undefined) await this.firstName.fill(data.firstName);
    if (data.lastName !== undefined) await this.lastName.fill(data.lastName);
    if (data.postalCode !== undefined) await this.postalCode.fill(data.postalCode);
  }

  /** Fills the standard data, clicks continue and waits for the overview. */
  async continueToOverview(): Promise<void> {
    await this.fillInfo();
    await this.continueBtn.click();
    await this.page.waitForURL('**/checkout-step-two.html');
    await this.summary.waitFor({ state: 'visible' });
  }

  async finishOrder(): Promise<void> {
    await this.finish.click();
    await this.page.waitForURL('**/checkout-complete.html');
    await this.completeHeader.waitFor({ state: 'visible' });
  }

  async totals(): Promise<{ subtotal: string; tax: string; total: string }> {
    return {
      subtotal: ((await this.subtotal.textContent()) ?? '').trim(),
      tax: ((await this.tax.textContent()) ?? '').trim(),
      total: ((await this.total.textContent()) ?? '').trim(),
    };
  }
}
