# Mapeamento de Validações (Frontend) 🛡️

Uma das premissas de UX e segurança no frontend é garantir que o lixo digital não chegue ao servidor. Para isso, aplicamos travas e máscaras diretamente nas páginas de entrada de dados. Este guia serve para você explicar onde e como as validações estão operando.

## 1. Tela de Cadastro de Usuários (`SignupPage.tsx`)
A porta de entrada do sistema é blindada da seguinte forma:

### Máscara de Documento (Passiva e Dinâmica)
- **Onde e como:** No campo `documento`, o usuário pode digitar apenas números no teclado. Enquanto ele digita, a função `formatDocument` entra em ação, formatando o texto no formato `000.000.000-00` (CPF) ou `00.000.000/0001-00` (CNPJ) dinamicamente.
- **Vantagem (IHC):** O usuário não precisa se preocupar em digitar os pontos e traços (Prevenção de Erros).

### Limitações Físicas e Ativas
- **Nome:** Exige no mínimo 3 letras e bloqueia a inserção de números através de Expressões Regulares (`pattern="^[a-zA-ZÀ-ÿ\s]*$"`).
- **Senha:** Exige um tamanho mínimo de 8 caracteres.
- **Nascimento:** O campo de calendário tem uma âncora fixa baseada no dia de hoje (`max={hoje}`), sendo impossível que o usuário "nasça no futuro".

## 2. Criação de Eventos/Oportunidades (`PostInput.tsx` e `Input.tsx`)
Quando um novo evento é criado, a data de expiração é fundamental para a automação do sistema.

### Trava Temporal (Passiva)
- **Onde e como:** O componente universal de calendário (`<Input type="date">`) calcula a data exata do momento do clique e injeta na tag `min={hoje}`.
- **Vantagem:** O calendário simplesmente oculta/desabilita os dias do passado, impedindo que um usuário publique um evento que "já expirou".

## 3. Autenticação e Geral
- **Required Ativo:** Todos os inputs sensíveis (email, senha) possuem a flag `required` nativa do HTML5.
- **Type Checking:** Os campos de email utilizam `type="email"`, o que faz com que o navegador valide a existência do `@` e do domínio antes mesmo do React disparar a requisição de login ou cadastro.

Essas camadas garantem que o payload enviado para a API REST esteja sempre sanitizado, reduzindo o tráfego inútil e protegendo o banco de dados.
