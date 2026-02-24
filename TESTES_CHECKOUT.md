# Testes Automatizados de Checkout - QAZANDO

## Descrição

Este projeto contém testes automatizados para validar o fluxo de checkout do site https://automationpratice.com.br/checkout-one utilizando **Playwright** com testes baseados em **IDs e seletores de elementos HTML**.

## Objetivo Principal

Validar que o processo de checkout funciona corretamente e que quando um pedido é finalizado com sucesso, aparece uma mensagem modal com:
- Heading: **"Order success!"**
- Subheading: **"Congrats! Your order was created with sucess!"**

## Estrutura dos Testes

### Arquivos Criados

1. **checkout-automation.spec.js** - Testes iniciais usando seletores de role
2. **checkout-order-success.spec.js** - Testes otimizados com seletores de placeholder
3. **checkout-final.spec.js** - Testes finais com waitForFunction para melhor confiabilidade
4. **CheckoutPage.js** - Page Object Model reutilizável
5. **checkout-pom.spec.js** - Testes usando o Page Object Model

## Campos do Formulário (Identificados por ID/Placeholder)

| Campo | Seletor | ID/Atributo |
|-------|---------|-------------|
| First Name | input[placeholder="First name"] | fname |
| Last Name | input[placeholder="Last name"] | lname |
| Company Name | input[placeholder="Company Name"] | cname |
| Email Address | input[placeholder="info@gmail.com"] | email |
| Country | select (primeiro) | country |
| State/City | select (segundo) | city |
| Zip Code | input[placeholder="Enter Your zipcode"] | zipcode |
| Full Address | input[placeholder="Enter your address here.."] | address |
| Additional Notes | input[placeholder="Order notes"] | notes |
| Save Button | button:has-text("Save") | - |
| Place Order Button | button:has-text("Place Order") | - |

## Métodos do Page Object Model (CheckoutPage.js)

```javascript
// Navegação
await checkoutPage.goto();

// Preenchimento de campos
await checkoutPage.fillFirstName(firstName);
await checkoutPage.fillLastName(lastName);
await checkoutPage.fillCompanyName(companyName);
await checkoutPage.fillEmailAddress(email);
await checkoutPage.selectCountry(country);
await checkoutPage.selectStateCity(stateCity);
await checkoutPage.fillZipCode(zipCode);
await checkoutPage.fillFullAddress(address);
await checkoutPage.fillAdditionalNotes(notes);

// Métodos de ação
await checkoutPage.saveBillingInformation();
await checkoutPage.saveBillingInformationAndWait();
await checkoutPage.placeOrder();
await checkoutPage.placeOrderAndWaitForSuccess();

// Métodos de verificação
await checkoutPage.isOrderSuccessModalVisible(); // true/false
await checkoutPage.isOrderSuccessMessageVisible(); // true/false
await checkoutPage.getOrderSuccessHeading(); // "Order success!"
await checkoutPage.getOrderSuccessText(); // texto completo
```

## Cenários de Teste

### Teste 1: Checkout Completo com Sucesso
**Arquivo:** `checkout-final.spec.js`

**Passos:**
1. Navega para a página de checkout
2. Preenche todos os campos obrigatórios com dados válidos:
   - Nome: João
   - Sobrenome: Silva
   - Empresa: QAZANDO
   - Email: teste@qazando.com
   - País: USA
   - Estado: Aland Islands
   - CEP: 12345
   - Endereço: Rua Test 123
   - Notas: Teste automatizado

3. Clica no botão "Save" para salvar informações de faturamento
4. Aguarda mensagem de sucesso "Billings Information registred with success!"
5. Clica no botão "Place Order"
6. **Valida se a mensagem "Order success!" aparece no modal**

**Resultado Esperado:** ✅ Modal com mensagem "Order success!" é exibido

### Teste 2: Validar Campos Desabilitados
**Arquivo:** `checkout-final.spec.js`

**Passos:**
1. Preenche formulário com dados válidos
2. Clica em "Save"
3. Valida que todos os campos ficam desabilitados (disabled=true)

**Resultado Esperado:** ✅ Campos estão disabled após salvar

### Teste 3: Validação de Campos Vazios
**Arquivo:** `checkout-final.spec.js`

**Passos:**
1. Clica em "Save" sem preencher nenhum campo
2. Aguarda mensagens de validação

**Resultado Esperado:** ✅ Mensagens de erro aparecem para campos obrigatórios

## Como Executar os Testes

### Instalação de Dependências

```bash
npm install
```

### Rodar Todos os Testes

```bash
npx playwright test
```

### Rodar Testes Específicos

```bash
# Teste final (recomendado)
npx playwright test checkout-final.spec.js

# Teste com Page Object Model
npx playwright test checkout-pom.spec.js

# Teste de sucesso do pedido
npx playwright test checkout-order-success.spec.js
```

### Rodar Teste em Modo Interativo

```bash
npx playwright test --ui
```

### Rodar Teste com Modo Debug

```bash
npx playwright test --debug
```

### Ver Relatório HTML

```bash
npx playwright show-report
```

## Estrutura HTML do Modal de Sucesso

Quando o checkout é bem-sucedido, o seguinte elemento aparece:

```html
<dialog>
  <div class="modal-body modal1 modal-bg">
    <div class="row">
      <div class="col-12">
        <button type="button" class="close" data-dismiss="modal">×</button>
      </div>
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-7 col-md-6">
            <div class="offer_modal_left">
              <img src="/static/media/logo.ae0f7f9d.png" alt="logo">
              <h2>Order success!</h2>
              <h3>Congrats! Your order was created with sucess!</h3>
            </div>
          </div>
          <div class="col-lg-5 col-md-6">
            <div class="offer_modal_img">
              <img src="/static/media/payment-ok.e47da4fa.png" alt="img">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</dialog>
```

## Seletores Usados nos Testes

### Por Placeholder
```javascript
await page.fill('input[placeholder="First name"]', 'João');
await page.fill('input[placeholder="Last name"]', 'Silva');
await page.fill('input[placeholder="Company Name"]', 'QAZANDO');
await page.fill('input[placeholder="info@gmail.com"]', 'teste@qazando.com');
await page.fill('input[placeholder="Enter Your zipcode"]', '12345');
await page.fill('input[placeholder="Enter your address here.."]', 'Rua Test 123');
await page.fill('input[placeholder="Order notes"]', 'Teste automatizado');
```

### Por Atributo
```javascript
await page.selectOption('select', 'usa', { nth: 0 }); // País
await page.selectOption('select', 'Aland Islands', { nth: 1 }); // Estado
```

### Por Texto
```javascript
await page.locator('button:has-text("Save")').first().click();
await page.locator('button:has-text("Place Order")').click();
await page.locator('text=Order success!').isVisible();
```

## Dados de Teste Válidos

```javascript
const billingData = {
  firstName: 'João',
  lastName: 'Silva',
  companyName: 'QAZANDO',
  email: 'teste@qazando.com',
  country: 'usa',
  stateCity: 'Aland Islands',
  zipCode: '12345',
  address: 'Rua Test 123, São Paulo',
  notes: 'Teste automatizado'
};
```

## Validações Implementadas

✅ Preenchimento de formulário com seletores de ID/placeholder
✅ Seleção de dropdowns de país e estado
✅ Validação de mensagem de sucesso "Order success!"
✅ Validação de desabilitação de campos após salvar
✅ Validação de mensagens de erro de campos obrigatórios
✅ Verificação do modal de sucesso aparecer
✅ Confirmação da mensagem de congratulações

## Troubleshooting

### Problema: Timeouts nos testes
**Solução:** Aumentar o timeout nos testes (padrão: 30000ms)

```javascript
test.setTimeout(60000); // 60 segundos
```

### Problema: Modal não aparece
**Solução:** Usar `waitForFunction` em vez de `waitForSelector`

```javascript
await page.waitForFunction(() => {
  const elements = document.body.innerText;
  return elements.includes('Order success!');
}, { timeout: 15000 });
```

### Problema: Campos não são encontrados
**Solução:** Usar seletores de placeholder em vez de role

```javascript
await page.fill('input[placeholder="First name"]', 'valor');
```

## Próximas Melhorias

- [ ] Adicionar testes com diferentes formas de pagamento
- [ ] Testar com múltiplas moedas
- [ ] Validar cálculos de impostos e frete
- [ ] Teste de carregamento (load testing)
- [ ] Integração com CI/CD (GitHub Actions, GitLab CI)
- [ ] Relatórios visuais com screenshots de falhas

## Contato e Suporte

Para dúvidas sobre os testes, acesse: https://www.qazando.com.br
