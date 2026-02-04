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
    validarCadastroFalhaSenha2,
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
        await validarCadastroFalha2(page, 'email')
    })

    test('Cadastro sem nome', async ({ page }) => {

        await PreencheEmail2(page)
        await PreencheSenha2(page)
        await ClicarCadastrar2(page)
        await validarCadastroFalha2(page, 'nome')
    })
    test('Cenário 3 - Cadastro sem senha', async ({ page }) => {

        await PreencheNome2(page)
        await PreencheEmail2(page)
        await ClicarCadastrar2(page)
        await validarCadastroFalha2(page, 'senha')
    })
    test('Cenário 4 - Cadastro sem nome, e-mail e senha', async ({ page }) => {

        await ClicarCadastrar2(page)
        await validarCadastroFalha2(page, 'nome')
    });
    test('Cenário 5 - Cadastro com e-mail inválido', async ({ page }) => {

        await PreencheNome2(page)
        await PreencheEmail2(page, 'emailinválido')
        await PreencheSenha2(page)
        await ClicarCadastrar2(page)
        await validarCadastroFalha2(page, 'email')
    });
    test('Cenário 6 - Cadastro com senha fraca', async ({ page }) => {

        await PreencheNome2(page)
        await PreencheEmail2(page)
        await PreencheSenha2(page, '123')
        await ClicarCadastrar2(page)
        await validarCadastroFalha2(page, 'senha')
    });
    test('Cenário 7 - Cadastro com nome muito longo', async ({ page }) => {

        await PreencheNome2(page, 'eullin eullin eullin eullin eullin eullin eullin eullin eullin eullin')
        await PreencheEmail2(page)
        await PreencheSenha2(page)
        await ClicarCadastrar2(page)
        //await validarCadastroFalhaNome2(page)
    });
    //    test('Cenário 8 - Cadastro com e-mail já cadastrado', async ({ page }) => {

    //await PreencheNome2(page)
    //await page.fill('input[placeholder="Email"]', 'email@já.cadastrado')
    //await PreencheSenha2(page)
    //await ClicarCadastrar2(page)
    // await validarCadastroFalha2(page)
    //  });
    test('Cenário 9 - Cadastro com caracteres especiais no nome', async ({ page }) => {

        await PreencheNome2(page, 'eullin@zap#2024!')
        await PreencheEmail2(page)
        await PreencheSenha2(page)
        await ClicarCadastrar2(page)
    });
    test('Cenário 10 - Cadastro com espaços em branco nos campos', async ({ page }) => {

        await PreencheNome2(page, '   ')
        await PreencheEmail2(page, '   ')
        await PreencheSenha2(page, '   ')
        await ClicarCadastrar2(page)
        await validarCadastroFalha2(page, 'email')
    });
    
});