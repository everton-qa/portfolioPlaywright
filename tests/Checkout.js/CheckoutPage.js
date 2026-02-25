// Page Object Model for Checkout Page
/**
 * CheckoutPage encapsulates all interactions with the checkout page
 * This page object provides methods for filling forms, selecting payment methods,
 * and verifying order completion
 */
export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.checkoutUrl = 'https://automationpratice.com.br/checkout-one';
  }

  // ============================================
  // Navigation Methods
  // ============================================
  
  /**
   * Navigate to the checkout page and wait for it to load
   */
  async goto() {
    await this.page.goto(this.checkoutUrl);
    await this.page.waitForLoadState('networkidle');
  }

  // ============================================
  // Billing Information Fields
  // ============================================
  
  /**
   * Fill the first name field
   * @param {string} firstName - The first name to enter
   */
  async fillFirstName(firstName) {
    await this.page.getByRole('textbox', { name: 'First name*' }).fill(firstName);
  }

  /**
   * Fill the last name field
   * @param {string} lastName - The last name to enter
   */
  async fillLastName(lastName) {
    await this.page.getByRole('textbox', { name: 'Last name*' }).fill(lastName);
  }

  /**
   * Fill the company name field
   * @param {string} companyName - The company name to enter
   */
  async fillCompanyName(companyName) {
    await this.page.getByRole('textbox', { name: 'Company Name*' }).fill(companyName);
  }

  /**
   * Fill the email address field
   * @param {string} email - The email address to enter
   */
  async fillEmailAddress(email) {
    await this.page.getByRole('textbox', { name: 'Email Addresse*' }).fill(email);
  }

  /**
   * Select a country from the dropdown
   * @param {string} country - The country value to select
   */
  async selectCountry(country) {
    await this.page.getByLabel('Country*').selectOption(country);
  }

  /**
   * Select a state/city from the dropdown
   * @param {string} stateCity - The state/city value to select
   */
  async selectStateCity(stateCity) {
    await this.page.getByLabel('State/City*').selectOption(stateCity);
  }

  /**
   * Fill the zip code field
   * @param {string} zipCode - The zip code to enter
   */
  async fillZipCode(zipCode) {
    await this.page.getByRole('textbox', { name: 'Zip Code*' }).fill(zipCode);
  }

  /**
   * Fill the full address field
   * @param {string} address - The address to enter
   */
  async fillFullAddress(address) {
    await this.page.getByRole('textbox', { name: 'Full Address*' }).fill(address);
  }

  /**
   * Fill the additional notes field
   * @param {string} notes - The notes to enter
   */
  async fillAdditionalNotes(notes) {
    await this.page.getByRole('textbox', { name: 'Additional Notes*' }).fill(notes);
  }

  /**
   * Check the "Save In Address Book" checkbox
   */
  async checkSaveInAddressBook() {
    await this.page.getByRole('checkbox', { name: 'Save In Address Book' }).check();
  }

  /**
   * Fill the complete billing information form with all required fields
   * @param {Object} billingData - Object containing all billing information
   * @param {string} billingData.firstName - First name
   * @param {string} billingData.lastName - Last name
   * @param {string} billingData.companyName - Company name
   * @param {string} billingData.email - Email address
   * @param {string} billingData.country - Country code
   * @param {string} billingData.stateCity - State/City value
   * @param {string} billingData.zipCode - Zip code
   * @param {string} billingData.address - Full address
   * @param {string} billingData.notes - Additional notes
   */
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

  // ============================================
  // Form Actions
  // ============================================
  
  /**
   * Click the Save button to save billing information
   */
  async saveBillingInformation() {
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  /**
   * Save billing information and wait for success message
   */
  async saveBillingInformationAndWait() {
    await this.saveBillingInformation();
    await this.page.waitForSelector('h3:has-text("Billings Information registred with success!")');
  }

  // ============================================
  // Payment Methods
  // ============================================
  
  /**
   * Select the "Direct Bank Transfer" payment method
   */
  async selectDirectBankTransfer() {
    await this.page.getByRole('radio', { name: 'Direct Bank Transfer' }).click();
  }

  /**
   * Select the "Mobile Banking" payment method
   */
  async selectMobileBanking() {
    await this.page.getByRole('radio', { name: 'Mobile Banking' }).click();
  }

  /**
   * Select the "Paypal" payment method
   */
  async selectPaypal() {
    await this.page.getByRole('radio', { name: 'Paypal' }).click();
  }

  // ============================================
  // Order Placement
  // ============================================
  
  /**
   * Click the "Place Order" button to submit the order
   */
  async placeOrder() {
    await this.page.getByRole('button', { name: 'Place Order' }).click();
  }

  /**
   * Place order and wait for the success modal to appear
   */
  async placeOrderAndWaitForSuccess() {
    await this.placeOrder();
    await this.page.waitForSelector('dialog', { timeout: 5000 });
  }

  // ============================================
  // Verification Methods
  // ============================================
  
  /**
   * Check if billing information was successfully saved
   * @returns {boolean} - True if success message is visible
   */
  async isBillingInformationSaved() {
    return await this.page.getByText('Billings Information registred with success!').isVisible();
  }

  /**
   * Check if the first name field is disabled (indicating form was saved)
   * @returns {boolean} - True if field is disabled
   */
  async isFirstNameDisabled() {
    return await this.page.getByRole('textbox', { name: 'First name*' }).isDisabled();
  }

  /**
   * Check if the order success modal is visible
   * @returns {boolean} - True if modal is visible
   */
  async isOrderSuccessModalVisible() {
    const modal = this.page.locator('dialog');
    return await modal.isVisible();
  }

  /**
   * Check if the "Order success!" heading is visible
   * @returns {boolean} - True if heading is visible
   */
  async isOrderSuccessMessageVisible() {
    return await this.page.getByRole('heading', { name: 'Order success!' }).isVisible();
  }

  /**
   * Check if the congratulations message heading is visible
   * @returns {boolean} - True if heading is visible
   */
  async isCongratulationsMessageVisible() {
    return await this.page.getByRole('heading', { name: 'Congrats! Your order was created with sucess!' }).isVisible();
  }

  /**
   * Get the text content of the "Order success!" message
   * @returns {string} - The text content
   */
  async getOrderSuccessText() {
    return await this.page.getByText('Order success!').textContent();
  }

  /**
   * Get the text content of the order success heading
   * @returns {string} - The heading text
   */
  async getOrderSuccessHeading() {
    return await this.page.getByRole('heading', { name: 'Order success!' }).textContent();
  }

  // ============================================
  // Modal Management
  // ============================================
  
  /**
   * Close the success modal if visible
   */
  async closeSuccessModal() {
    const closeButton = this.page.locator('dialog button[aria-label="Close"]');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }
  }

  // ============================================
  // Amount Methods
  // ============================================
  
  /**
   * Get the total amount from the order summary
   * @returns {string} - The total amount as text (e.g., "$100.00")
   */
  async getTotalAmount() {
    const totalCell = this.page.getByText('Total').locator('..').getByText(/\$\d+\.\d+/).last();
    return await totalCell.textContent();
  }

  /**
   * Get the subtotal amount from the order summary
   * @returns {string} - The subtotal amount as text (e.g., "$100.00")
   */
  async getSubtotalAmount() {
    const subtotalCell = this.page.getByText('SubTotal').locator('..').getByText(/\$\d+\.\d+/).first();
    return await subtotalCell.textContent();
  }
}
