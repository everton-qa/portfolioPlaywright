import { test, expect } from '@playwright/test';

test.describe('Checkout Automation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the checkout page
    await page.goto('https://automationpratice.com.br/checkout-one');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test('Should fill billing information and complete checkout successfully', async ({ page }) => {
    // Fill the billing information form using element IDs/names
    
    // Fill First Name
    await page.getByRole('textbox', { name: 'First name*' }).fill('João');
    
    // Fill Last Name
    await page.getByRole('textbox', { name: 'Last name*' }).fill('Silva');
    
    // Fill Company Name
    await page.getByRole('textbox', { name: 'Company Name*' }).fill('Test Company');
    
    // Fill Email Address
    await page.getByRole('textbox', { name: 'Email Addresse*' }).fill('joao@example.com');
    
    // Select Country
    await page.getByLabel('Country*').selectOption('usa');
    
    // Select State/City
    await page.getByLabel('State/City*').selectOption('Aland Islands');
    
    // Fill Zip Code
    await page.getByRole('textbox', { name: 'Zip Code*' }).fill('12345');
    
    // Fill Full Address
    await page.getByRole('textbox', { name: 'Full Address*' }).fill('123 Test Street, Test City');
    
    // Fill Additional Notes
    await page.getByRole('textbox', { name: 'Additional Notes*' }).fill('Test order');
    
    // Click the Save button to save billing information
    await page.getByRole('button', { name: 'Save' }).click();
    
    // Wait for success message
    await expect(page.getByText('Billings Information registred with success!')).toBeVisible();
    
    // Verify that form fields are now disabled after saving
    await expect(page.getByRole('textbox', { name: 'First name*' })).toBeDisabled();
    
    // Click the Place Order button
    await page.getByRole('button', { name: 'Place Order' }).click();
    
    // Wait for the success heading to appear in the modal
    await expect(page.getByRole('heading', { name: 'Order success!' })).toBeVisible({ timeout: 15000 });
    
    // Also verify the congratulations message
    await expect(page.getByRole('heading', { name: 'Congrats! Your order was created with sucess!' })).toBeVisible();
    
    // Verify the modal is present
    const modal = page.locator('dialog');
    await expect(modal).toBeVisible();
  });

  test('Should display order success modal with correct elements', async ({ page }) => {
    // Fill the form
    await page.getByRole('textbox', { name: 'First name*' }).fill('Maria');
    await page.getByRole('textbox', { name: 'Last name*' }).fill('Santos');
    await page.getByRole('textbox', { name: 'Company Name*' }).fill('Test Corp');
    await page.getByRole('textbox', { name: 'Email Addresse*' }).fill('maria@example.com');
    await page.getByLabel('Country*').selectOption('usa');
    await page.getByLabel('State/City*').selectOption('Afghanistan');
    await page.getByRole('textbox', { name: 'Zip Code*' }).fill('54321');
    await page.getByRole('textbox', { name: 'Full Address*' }).fill('456 Another Street');
    await page.getByRole('textbox', { name: 'Additional Notes*' }).fill('Please handle with care');
    
    // Save billing information
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Billings Information registred with success!')).toBeVisible();
    
    // Place the order
    await page.getByRole('button', { name: 'Place Order' }).click();
    
    // Wait for the success heading to appear in the modal
    await expect(page.getByRole('heading', { name: 'Order success!' })).toBeVisible({ timeout: 15000 });
    
    // Verify the entire dialog structure
    const dialog = page.locator('dialog');
    await expect(dialog.getByRole('heading', { name: 'Order success!' })).toBeVisible();
  });

  test('Should validate all required fields before saving', async ({ page }) => {
    // Try to save without filling any information
    await page.getByRole('button', { name: 'Save' }).click();
    
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
    // Fill and save billing information
    await page.getByRole('textbox', { name: 'First name*' }).fill('Pedro');
    await page.getByRole('textbox', { name: 'Last name*' }).fill('Oliveira');
    await page.getByRole('textbox', { name: 'Company Name*' }).fill('Test Ltd');
    await page.getByRole('textbox', { name: 'Email Addresse*' }).fill('pedro@example.com');
    await page.getByLabel('Country*').selectOption('usa');
    await page.getByLabel('State/City*').selectOption('Aland Islands');
    await page.getByRole('textbox', { name: 'Zip Code*' }).fill('99999');
    await page.getByRole('textbox', { name: 'Full Address*' }).fill('789 Test Avenue');
    await page.getByRole('textbox', { name: 'Additional Notes*' }).fill('Test payment');
    
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Billings Information registred with success!')).toBeVisible();
    
    // Check that "Direct Bank Transfer" is selected by default
    const bankTransferRadio = page.getByRole('radio', { name: 'Direct Bank Transfer' });
    await expect(bankTransferRadio).toBeChecked();
    
    // Select "Mobile Banking"
    const mobileBankingRadio = page.getByRole('radio', { name: 'Mobile Banking' });
    await mobileBankingRadio.click();
    await expect(mobileBankingRadio).toBeChecked();
    
    // Select "Paypal"
    const paypalRadio = page.getByRole('radio', { name: 'Paypal' });
    await paypalRadio.click();
    await expect(paypalRadio).toBeChecked();
  });
});
