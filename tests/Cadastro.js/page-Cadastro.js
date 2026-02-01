const { expect } = require('@playwright/test');

const abrirSite2 = async (page) => {
    await page.goto('https://automationpratice.com.br/register')
}

const PreencheNome2 = async (page) => {
    await page.locator('#user').fill('eullin do zap')
}
const PreencheEmail2 = async (page) => {
    await page.locator('#email').fill('eullin@hotmail.com')
}
const PreencheSenha2 = async (page) => {
    await page.locator('#password').fill('12345678')
}
const ClicarCadastrar2 = async (page) => {
    await page.getByRole('button', { name: 'Cadastrar' }).click()
}
const validarCadastroSucesso2 = async (page) => {
    await expect(page.getByRole('heading', { name: 'Cadastro realizado!' })).toBeVisible()
}
const validarCadastroFalha2 = async (page) => {
    await expect(page.getByText('O campo e-mail deve ser')).toBeVisible()

}
const validarCadastroFalhaNome2 = async (page) => {
    await expect(page.getByText('O campo nome deve ser')).toBeVisible()
}
const cadastroComSucesso2 = async (page) => {
 //   await page.goto('https://automationpratice.com.br/register')
    await page.locator('#user').fill('eullin do zap')
    await page.locator('#email').fill('eullin@hotmail.com')
    await page.locator('#password').fill('12345678')
    await page.getByRole('button', { name: 'Cadastrar' }).click()
    await expect(page.getByRole('heading', { name: 'Cadastro realizado!' })).toBeVisible()
}

module.exports = {
    abrirSite2,
    PreencheNome2,
    PreencheEmail2,
    PreencheSenha2,
    ClicarCadastrar2,
    validarCadastroSucesso2,
    validarCadastroFalha2,
    validarCadastroFalhaNome2,
    cadastroComSucesso2
}// 

