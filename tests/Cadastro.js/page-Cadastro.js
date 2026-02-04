const { expect } = require('@playwright/test');

const abrirSite2 = async (page) => {
    await page.goto('https://automationpratice.com.br/register')
}

const PreencheNome2 = async (
    page,
    nome = 'eullin do zap'
) => {
    await page.locator('#user').fill(nome)
}
const PreencheEmail2 = async (
    page,
    email = 'eullin@hotmail.com'
) => {
    await page.locator('#email').fill(email)
}
const PreencheSenha2 = async (
    page,
    senha = '12345678'
) => {
    await page.locator('#password').fill(senha)
}
const ClicarCadastrar2 = async (page) => {
    await page.getByRole('button', { name: 'Cadastrar' }).click()
}
const validarCadastroSucesso2 = async (page) => {
    await expect(page.getByRole('heading', { name: 'Cadastro realizado!' })).toBeVisible()
}
const mensagensErroCadastro = {
  nome: 'O campo nome deve ser',
  email: 'O campo e-mail deve ser',
  senha: 'O campo senha deve ter pelo',
}

const validarCadastroFalha2 = async (page, tipo) => {
  const mensagem = mensagensErroCadastro[tipo]

  if (!mensagem) {
    throw new Error(`Tipo de erro inválido: ${tipo}`)
  }

  await expect(page.getByText(mensagem)).toBeVisible()
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
    cadastroComSucesso2

}// 


