// Page Object Model for Checkout Page
export class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to checkout page
  async goto() {
    await this.page.goto('https://automationpratice.com.br/checkout-one');
    await this.page.waitForLoadState('networkidle');
  }

  // Billing Information Fields
  async fillFirstName(firstName) {
    await this.page.getByRole('textbox', { name: 'First name*' }).fill(firstName);
  }

  async fillLastName(lastName) {
    await this.page.getByRole('textbox', { name: 'Last name*' }).fill(lastName);
  }

  async fillCompanyName(companyName) {
    await this.page.getByRole('textbox', { name: 'Company Name*' }).fill(companyName);
  }

  async fillEmailAddress(email) {
    await this.page.getByRole('textbox', { name: 'Email Addresse*' }).fill(email);
  }

  async selectCountry(country) {
    await this.page.getByLabel('Country*').selectOption(country);
  }

  async selectStateCity(stateCity) {
    await this.page.getByLabel('State/City*').selectOption(stateCity);
  }

  async fillZipCode(zipCode) {
    await this.page.getByRole('textbox', { name: 'Zip Code*' }).fill(zipCode);
  }

  async fillFullAddress(address) {
    await this.page.getByRole('textbox', { name: 'Full Address*' }).fill(address);
  }

  async fillAdditionalNotes(notes) {
    await this.page.getByRole('textbox', { name: 'Additional Notes*' }).fill(notes);
  }

  async checkSaveInAddressBook() {
    await this.page.getByRole('checkbox', { name: 'Save In Address Book' }).check();
  }

  async saveBillingInformation() {
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async saveBillingInformationAndWait() {
    await this.saveBillingInformation();
    await this.page.waitForSelector('h3:has-text("Billings Information registred with success!")');
  }

  // Fill complete billing information form
  async fillBillingInformation(billingData) {
    await this.fillFirstName(billingData.firstName);
    await this.fillLastName(billingData.lastName);
    await this.fillCompanyName(billingData.companyName);
    await this.fillEmailAddress(billingData.email);
    await this.selectCountry(billingData.country);
    await this.selectStateCity(billingData.stateCity);
    await this.fillZipCode(billingData.zipCode);
    await this.fillFullAddress(billingData.address);
    await this.fillAdditionalNotes(billingData.notes);
  }

  // Payment Methods
  async selectDirectBankTransfer() {
    await this.page.getByRole('radio', { name: 'Direct Bank Transfer' }).click();
  }

  async selectMobileBanking() {
    await this.page.getByRole('radio', { name: 'Mobile Banking' }).click();
  }

  async selectPaypal() {
    await this.page.getByRole('radio', { name: 'Paypal' }).click();
  }

  // Order placement
  async placeOrder() {
    await this.page.getByRole('button', { name: 'Place Order' }).click();
  }

  async placeOrderAndWaitForSuccess() {
    await this.placeOrder();
    await this.page.waitForSelector('dialog', { timeout: 5000 });
  }

  // Verification methods
  async isBillingInformationSaved() {
    return await this.page.getByText('Billings Information registred with success!').isVisible();
  }

  async isFirstNameDisabled() {
    return await this.page.getByRole('textbox', { name: 'First name*' }).isDisabled();
  }

  async isOrderSuccessModalVisible() {
    const modal = this.page.locator('dialog');
    return await modal.isVisible();
  }

  async isOrderSuccessMessageVisible() {
    return await this.page.getByRole('heading', { name: 'Order success!' }).isVisible();
  }

  async isCongratulationsMessageVisible() {
    return await this.page.getByRole('heading', { name: 'Congrats! Your order was created with sucess!' }).isVisible();
  }

  async getOrderSuccessText() {
    return await this.page.getByText('Order success!').textContent();
  }

  async getOrderSuccessHeading() {
    return await this.page.getByRole('heading', { name: 'Order success!' }).textContent();
  }

  // Close modal
  async closeSuccessModal() {
    const closeButton = this.page.locator('dialog button[aria-label="Close"]');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }
  }

  // Get total amount
  async getTotalAmount() {
    const totalCell = this.page.getByText('Total').locator('..').getByText(/\$\d+\.\d+/).last();
    return await totalCell.textContent();
  }

  // Get subtotal amount
  async getSubtotalAmount() {
    const subtotalCell = this.page.getByText('SubTotal').locator('..').getByText(/\$\d+\.\d+/).first();
    return await subtotalCell.textContent();
  }
}
