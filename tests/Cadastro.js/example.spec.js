import { test, expect } from '@playwright/test';

const {
    abrirSite2,
    PreencheNome2,
    PreencheEmail2,
    PreencheSenha2,
    ClicarCadastrar2,
    validarCadastroSucesso2,
    validarCadastroFalha2,
    validarCadastroFalhaNome2,
    cadastroComSucesso2
} = require('./page-Cadastro')

test.describe('Cadastro de Usuário', () => {


    test.beforeEach(async ({ page }) => {
        await abrirSite2(page)
    });


    test('Cenário 1 - Página de Cadastro', async ({ page }) => {

        await PreencheNome2(page)
        await PreencheEmail2(page)
        await PreencheSenha2(page)
        await ClicarCadastrar2(page)
        await validarCadastroSucesso2(page)
        // /\ validar texto por mensagem
    })
    test('Cenário 1.1 - Cadastro com sucesso', async ({ page }) => {
        await cadastroComSucesso2(page)
    })

    test('Cenário 2 - Cadastro sem e-mail', async ({ page }) => {

        await PreencheNome2(page)
        await PreencheSenha2(page)
        await ClicarCadastrar2(page)
        await validarCadastroFalha2(page)
    })

    test('Cadastro sem nome', async ({ page }) => {

        await PreencheEmail2(page)
        await PreencheSenha2(page)
        await ClicarCadastrar2(page)
        await validarCadastroFalhaNome2(page)
    })
});
