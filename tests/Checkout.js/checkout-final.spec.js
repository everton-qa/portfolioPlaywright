import { test, expect } from '@playwright/test';

// Increase timeout for tests due to network delays
test.setTimeout(60000);

test.describe('Checkout Order Success Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://automationpratice.com.br/checkout-one');
    await page.waitForLoadState('domcontentloaded');
  });

  test('Checkout with Order success message - Main Test', async ({ page }) => {
    // Fill billing form
    await page.fill('input[placeholder="First name"]', 'João');
    await page.fill('input[placeholder="Last name"]', 'Silva');
    await page.fill('input[placeholder="Company Name"]', 'QAZANDO');
    await page.fill('input[placeholder="info@gmail.com"]', 'teste@qazando.com');
    
    // Select dropdowns
    await page.selectOption('select', 'usa', { nth: 0 });
    await page.selectOption('select', 'Aland Islands', { nth: 1 });
    
    await page.fill('input[placeholder="Enter Your zipcode"]', '12345');
    await page.fill('input[placeholder="Enter your address here.."]', 'Rua Test 123');
    await page.fill('input[placeholder="Order notes"]', 'Teste automatizado');
    
    // Save billing info
    const saveButtons = page.locator('button:has-text("Save")');
    await saveButtons.first().click();
    
    await page.waitForFunction(() => {
      const el = document.querySelector('h3');
      return el && el.textContent && el.textContent.includes('registred with success');
    }, { timeout: 15000 });
    
    // Place order
    const placeOrderButton = page.locator('button:has-text("Place Order")');
    await placeOrderButton.click();
    
    // Wait for and verify success message
    await page.waitForFunction(() => {
      const elements = document.body.innerText;
      return elements.includes('Order success!');
    }, { timeout: 15000 });
    
    // Final verification
    const orderSuccessText = page.locator('text=Order success!');
    await expect(orderSuccessText).toBeVisible();
  });

  test('Verify billing form saves and fields become disabled', async ({ page }) => {
    await page.fill('input[placeholder="First name"]', 'Ana');
    await page.fill('input[placeholder="Last name"]', 'Costa');
    await page.fill('input[placeholder="Company Name"]', 'Dev Lab');
    await page.fill('input[placeholder="info@gmail.com"]', 'ana@devlab.com');
    await page.selectOption('select', 'usa', { nth: 0 });
    await page.selectOption('select', 'Afghanistan', { nth: 1 });
    await page.fill('input[placeholder="Enter Your zipcode"]', '54321');
    await page.fill('input[placeholder="Enter your address here.."]', 'Rua Dev 456');
    await page.fill('input[placeholder="Order notes"]', 'Urgent');
    
    // Save
    await page.locator('button:has-text("Save")').first().click();
    
    // Wait and check that fields are disabled
    await page.waitForFunction(() => {
      const field = document.querySelector('input[placeholder="First name"]');
      return field && field.disabled === true;
    }, { timeout: 10000 });
    
    const firstNameField = page.locator('input[placeholder="First name"]');
    await expect(firstNameField).toBeDisabled();
  });

  test('Form validation - empty fields show errors', async ({ page }) => {
    // Click save without filling
    await page.locator('button:has-text("Save")').first().click();
    
    // Wait for validation messages
    await page.waitForFunction(() => {
      const text = document.body.innerText;
      return text.includes('O campo First Name');
    }, { timeout: 10000 });
    
    const errorMsg = page.locator('text=O campo First Name deve ser prenchido');
    await expect(errorMsg).toBeVisible();
  });
});
