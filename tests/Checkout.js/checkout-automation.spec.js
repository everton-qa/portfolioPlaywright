import { test, expect } from '@playwright/test';
import { CheckoutPage } from './CheckoutPage';

test.describe('Checkout Automation Tests', () => {
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();
  });

  test('Should fill billing information and complete checkout successfully', async ({ page }) => {
    const billingData = {
      firstName: 'João',
      lastName: 'Silva',
      companyName: 'Test Company',
      email: 'joao@example.com',
      country: 'usa',
      stateCity: 'Aland Islands',
      zipCode: '12345',
      address: '123 Test Street, Test City',
      notes: 'Test order'
    };

    // Fill the billing information
    await checkoutPage.fillBillingInformation(billingData);
    
    // Save billing information
    await checkoutPage.saveBillingInformation();
    
    // Wait for success message
    await expect(page.getByText('Billings Information registred with success!')).toBeVisible();
    
    // Verify that form fields are now disabled after saving
    await expect(page.getByRole('textbox', { name: 'First name*' })).toBeDisabled();
    
    // Place order
    await checkoutPage.placeOrder();
    
    // Wait for the success heading to appear in the modal
    await expect(page.getByRole('heading', { name: 'Order success!' })).toBeVisible({ timeout: 15000 });
    
    // Also verify the congratulations message
    await expect(page.getByRole('heading', { name: 'Congrats! Your order was created with sucess!' })).toBeVisible();
  
  });

  test('Should display order success modal with correct elements', async ({ page }) => {
    const billingData = {
      firstName: 'Maria',
      lastName: 'Santos',
      companyName: 'Test Corp',
      email: 'maria@example.com',
      country: 'usa',
      stateCity: 'Afghanistan',
      zipCode: '54321',
      address: '456 Another Street',
      notes: 'Please handle with care'
    };

    // Fill the form
    await checkoutPage.fillBillingInformation(billingData);
    
    // Save billing information
    await checkoutPage.saveBillingInformation();
    await expect(page.getByText('Billings Information registred with success!')).toBeVisible();
    
    // Place the order
    await checkoutPage.placeOrder();
    
    // Wait for the success heading to appear in the modal
    await expect(page.getByRole('heading', { name: 'Order success!' })).toBeVisible({ timeout: 15000 });
    
  });

  test('Should validate all required fields before saving', async ({ page }) => {
    // Try to save without filling any information
    await checkoutPage.saveBillingInformation();
    
    // Wait a moment for validation messages to appear
    await page.waitForTimeout(1000);
    
    // Check that validation messages appear for required fields
    const firstNameError = page.getByText('O campo First Name deve ser prenchido');
    await expect(firstNameError).toBeVisible();
    
    const lastNameError = page.getByText('O campo Last Name deve ser prenchido');
    await expect(lastNameError).toBeVisible();
    
    const emailError = page.getByText(/O campo E-mail/);
    await expect(emailError).toBeVisible();
  });

  test('Should select different payment methods', async ({ page }) => {
    const billingData = {
      firstName: 'Pedro',
      lastName: 'Oliveira',
      companyName: 'Test Ltd',
      email: 'pedro@example.com',
      country: 'usa',
      stateCity: 'Aland Islands',
      zipCode: '99999',
      address: '789 Test Avenue',
      notes: 'Test payment'
    };

    // Fill and save billing information
    await checkoutPage.fillBillingInformation(billingData);
    await checkoutPage.saveBillingInformation();
    await expect(page.getByText('Billings Information registred with success!')).toBeVisible();
    
    // Check that "Direct Bank Transfer" is selected by default
    const bankTransferRadio = page.getByRole('radio', { name: 'Direct Bank Transfer' });
    await expect(bankTransferRadio).toBeChecked();
    
    // Select "Mobile Banking"
    await checkoutPage.selectMobileBanking();
    const mobileBankingRadio = page.getByRole('radio', { name: 'Mobile Banking' });
    await expect(mobileBankingRadio).toBeChecked();
    
    // Select "Paypal"
    await checkoutPage.selectPaypal();
    const paypalRadio = page.getByRole('radio', { name: 'Paypal' });
    await expect(paypalRadio).toBeChecked();
  });
});
