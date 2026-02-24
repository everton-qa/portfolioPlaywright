import { test, expect } from '@playwright/test';

test.describe('Checkout Order Success Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the checkout page
    await page.goto('https://automationpratice.com.br/checkout-one');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });

  test('Complete checkout and verify "Order success!" message appears', async ({ page }) => {
    // Fill form using input selectors with placeholders
    await page.locator('input[placeholder="First name"]').fill('João');
    await page.locator('input[placeholder="Last name"]').fill('Silva');
    await page.locator('input[placeholder="Company Name"]').fill('Test Company');
    await page.locator('input[placeholder="info@gmail.com"]').fill('joao@example.com');
    
    // Select country and state using select elements
    await page.locator('select').first().selectOption('usa');
    await page.locator('select').nth(1).selectOption('Aland Islands');
    
    await page.locator('input[placeholder="Enter Your zipcode"]').fill('12345');
    await page.locator('input[placeholder="Enter your address here.."]').fill('123 Test Street');
    await page.locator('input[placeholder="Order notes"]').fill('Test order');
    
    // Click Save button
    await page.locator('button:has-text("Save")').first().click();
    
    // Wait for save to complete
    await page.waitForTimeout(2000);
    
    // Click Place Order button
    await page.locator('button:has-text("Place Order")').click();
    
    // Wait for modal to appear
    await page.waitForTimeout(3000);
    
    // Verify "Order success!" text is visible
    const orderSuccessElement = page.locator('text=Order success!');
    await expect(orderSuccessElement).toBeVisible({ timeout: 10000 });
  });

  test('Verify form fields are disabled after saving billing info', async ({ page }) => {
    // Fill and save form
    await page.locator('input[placeholder="First name"]').fill('Maria');
    await page.locator('input[placeholder="Last name"]').fill('Santos');
    await page.locator('input[placeholder="Company Name"]').fill('Test Corp');
    await page.locator('input[placeholder="info@gmail.com"]').fill('maria@example.com');
    await page.locator('select').first().selectOption('usa');
    await page.locator('select').nth(1).selectOption('Afghanistan');
    await page.locator('input[placeholder="Enter Your zipcode"]').fill('54321');
    await page.locator('input[placeholder="Enter your address here.."]').fill('456 Another St');
    await page.locator('input[placeholder="Order notes"]').fill('Note');
    
    // Save
    await page.locator('button:has-text("Save")').first().click();
    
    // Wait for save
    await page.waitForTimeout(2000);
    
    // Verify fields are disabled
    const firstNameField = page.locator('input[placeholder="First name"]');
    await expect(firstNameField).toBeDisabled();
    
    const lastNameField = page.locator('input[placeholder="Last name"]');
    await expect(lastNameField).toBeDisabled();
  });

  test('Verify validation messages when submitting empty form', async ({ page }) => {
    // Click Save without filling any fields
    await page.locator('button:has-text("Save")').first().click();
    
    // Wait for validation messages
    await page.waitForTimeout(1000);
    
    // Check for validation messages
    const firstNameValidation = page.locator('text=O campo First Name deve ser prenchido');
    await expect(firstNameValidation).toBeVisible();
  });

  test('Complete checkout with congratulations message confirmation', async ({ page }) => {
    // Fill form
    await page.locator('input[placeholder="First name"]').fill('Pedro');
    await page.locator('input[placeholder="Last name"]').fill('Oliveira');
    await page.locator('input[placeholder="Company Name"]').fill('Tech Corp');
    await page.locator('input[placeholder="info@gmail.com"]').fill('pedro@example.com');
    await page.locator('select').first().selectOption('usa');
    await page.locator('select').nth(1).selectOption('Aland Islands');
    await page.locator('input[placeholder="Enter Your zipcode"]').fill('99999');
    await page.locator('input[placeholder="Enter your address here.."]').fill('789 Avenue');
    await page.locator('input[placeholder="Order notes"]').fill('Urgent');
    
    // Save and Place Order
    await page.locator('button:has-text("Save")').first().click();
    await page.waitForTimeout(2000);
    
    await page.locator('button:has-text("Place Order")').click();
    await page.waitForTimeout(3000);
    
    // Verify success message
    const successHeading = page.locator('h2:has-text("Order success!")');
    await expect(successHeading).toBeVisible({ timeout: 10000 });
    
    // Verify congratulations message
    const congratsHeading = page.locator('h3:has-text("Congrats!")');
    await expect(congratsHeading).toBeVisible();
  });
});
