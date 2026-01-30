import { test, expect } from '@playwright/test';

 test('Página de Cadastro', async ({ page }) => {
    await page.goto('https://automationpratice.com.br/register')
    await page.locator('#user').fill('eullin do zap')
    await page.locator('#email').fill('eullin@hotmail.com')
    await page.locator('#password').fill('12345678')    
    await page.getByRole('button', { name: 'Cadastrar' }).click()
    
    await expect(page.getByRole('heading', { name: 'Cadastro realizado!' })).toBeVisible()
    // /\ validar texto por mensagem

})



