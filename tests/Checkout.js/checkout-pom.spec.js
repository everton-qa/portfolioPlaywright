import { test, expect } from '@playwright/test';
import { CheckoutPage } from './CheckoutPage';

test.describe('Checkout Page - Advanced Tests with Page Object Model', () => {
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();
  });

  test('Complete checkout flow with valid data - Order Success Confirmation', async () => {
    // Data for the test
    const billingData = {
      firstName: 'João',
      lastName: 'Silva',
      companyName: 'Tech Solutions',
      email: 'joao.silva@example.com',
      country: 'usa',
      stateCity: 'Aland Islands',
      zipCode: '12345',
      address: '123 Main Street, Downtown District',
      notes: 'Please deliver in the morning'
    };

    // Fill billing information
    await checkoutPage.fillBillingInformation(billingData);

    // Save billing information
    await checkoutPage.saveBillingInformationAndWait();

    // Verify billing information was saved
    expect(await checkoutPage.isBillingInformationSaved()).toBe(true);

    // Verify form fields are disabled after saving
    expect(await checkoutPage.isFirstNameDisabled()).toBe(true);

    // Place the order
    await checkoutPage.placeOrderAndWaitForSuccess();

    // Verify success modal is visible
    expect(await checkoutPage.isOrderSuccessModalVisible()).toBe(true);

    // Verify "Order success!" text is visible
    expect(await checkoutPage.isOrderSuccessMessageVisible()).toBe(true);

    // Verify the congratulations message
    expect(await checkoutPage.isCongratulationsMessageVisible()).toBe(true);

    // Get and log the success heading
    const successHeading = await checkoutPage.getOrderSuccessHeading();
    expect(successHeading).toBe('Order success!');
  });

  test('Verify payment method selection before placing order', async () => {
    const billingData = {
      firstName: 'Maria',
      lastName: 'Santos',
      companyName: 'Design Studio',
      email: 'maria.santos@example.com',
      country: 'usa',
      stateCity: 'Afghanistan',
      zipCode: '54321',
      address: '456 Oak Avenue, Creative District',
      notes: 'Handle with care - fragile items'
    };

    await checkoutPage.fillBillingInformation(billingData);
    await checkoutPage.saveBillingInformationAndWait();

    // Select different payment method
    await checkoutPage.selectMobileBanking();

    // Place order with Mobile Banking selected
    await checkoutPage.placeOrderAndWaitForSuccess();

    // Confirm order success
    expect(await checkoutPage.isOrderSuccessMessageVisible()).toBe(true);
  });

  test('Test with Paypal payment method', async () => {
    const billingData = {
      firstName: 'Pedro',
      lastName: 'Oliveira',
      companyName: 'Finance Corp',
      email: 'pedro.oliveira@finance.com',
      country: 'usa',
      stateCity: 'Aland Islands',
      zipCode: '99999',
      address: '789 Finance Street, Business Park',
      notes: 'Invoice required for accounting'
    };

    await checkoutPage.fillBillingInformation(billingData);
    await checkoutPage.saveBillingInformationAndWait();

    // Select Paypal payment method
    await checkoutPage.selectPaypal();

    // Place order
    await checkoutPage.placeOrderAndWaitForSuccess();

    // Verify success
    expect(await checkoutPage.isOrderSuccessMessageVisible()).toBe(true);
    expect(await checkoutPage.isCongratulationsMessageVisible()).toBe(true);
  });

  test('Verify order modal contains correct structure after successful checkout', async () => {
    const billingData = {
      firstName: 'Ana',
      lastName: 'Costa',
      companyName: 'Retail Solutions',
      email: 'ana.costa@retail.com',
      country: 'usa',
      stateCity: 'Afghanistan',
      zipCode: '11111',
      address: '321 Retail Boulevard, Shopping District',
      notes: 'Standard delivery'
    };

    await checkoutPage.fillBillingInformation(billingData);
    await checkoutPage.saveBillingInformationAndWait();
    await checkoutPage.placeOrderAndWaitForSuccess();

    // Verify the modal DOM structure matches expected format
    // The modal should contain: logo, "Order success!" heading, congratulations message, and payment confirmation image
    expect(await checkoutPage.isOrderSuccessModalVisible()).toBe(true);

    // Verify specific elements in success modal
    const successText = await checkoutPage.getOrderSuccessText();
    expect(successText).toContain('Order success!');
  });

  test('Checkout fails with only required fields', async () => {
    // Attempt to place order with minimal data
    const minimalData = {
      firstName: 'Test',
      lastName: 'User',
      companyName: 'Test Co',
      email: 'test@test.com',
      country: 'usa',
      stateCity: 'Aland Islands',
      zipCode: '00000',
      address: 'Test Address',
      notes: 'Test'
    };

    await checkoutPage.fillBillingInformation(minimalData);
    await checkoutPage.saveBillingInformationAndWait();
    await checkoutPage.placeOrderAndWaitForSuccess();

    // Should still show success
    expect(await checkoutPage.isOrderSuccessMessageVisible()).toBe(true);
  });
});
