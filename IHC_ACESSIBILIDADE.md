# Guia de Apresentação: IHC e Acessibilidade 🎓

O frontend deste projeto (UniHub) foi construído para ser não apenas funcional, mas também **acessível e amigável**, seguindo heurísticas de usabilidade (Jakob Nielsen) e padrões de conformidade da web (WCAG/WAI-ARIA).

Este documento serve como roteiro para explicar como esses conceitos estão mapeados no código.

---

## 1. Heurísticas de Usabilidade (IHC - Jakob Nielsen)

### Visibilidade do Status do Sistema (Heurística 1)
> **Conceito:** O usuário precisa sempre saber o que está acontecendo no sistema através de feedback em tempo razoável.
- **Onde encontrar no código:** 
  1. **Sino de Notificação:** Uma "bolinha vermelha" (badge) surge em tempo real avisando sobre novos eventos sem que o usuário precise atualizar a página (`NotificationBell.tsx`).
  2. **Carregamento (Spinner):** Um ícone animado (`CircleNotchIcon`) aparece no fim do feed indicando que mais publicações estão sendo baixadas do servidor (`Feed.tsx`).
  3. **Toasts (Feedback pop-up):** Alertas de canto de tela confirmam o sucesso ou falha ao criar/deletar posts ou ao fazer login (`use-posts.ts` e `LoginPage.tsx`).

### Controle e Liberdade do Usuário (Heurística 3)
> **Conceito:** O usuário deve poder explorar a interface, desfazer ações facilmente e ter saídas de emergência.
- **Onde encontrar no código:**
  1. **Filtros Dinâmicos:** Os botões de Filtro no topo da `HomePage`. O usuário ativa e desativa tópicos do Feed dinamicamente com 1 clique, sem ficar preso e sem recarregar a página.
  2. **Modal de Inscrição (Manage Subscriptions):** Permite selecionar tópicos padrão para a conta e possui botões claros de "Salvar" ou "Cancelar", dando a opção de desistir da alteração a qualquer momento.

### Prevenção de Erros (Heurística 5)
> **Conceito:** Melhor do que boas mensagens de erro, é um design que impede que o problema ocorra em primeiro lugar.
- **Onde encontrar no código:** 
  1. **Cadastro (`SignupPage.tsx`):** O formulário limita a entrada do documento para `maxLength={14}`. Além disso, o botão de "Sign Up" é desabilitado instantaneamente após o sucesso, impedindo cliques duplos acidentais que causariam duplicidade no banco.

---

## 2. Acessibilidade (A11y e WAI-ARIA)

Para usuários com deficiências visuais ou motoras, o projeto utiliza a especificação ARIA (*Accessible Rich Internet Applications*) e recursos de *affordance* via CSS.

### No Botão de Sino de Notificação (`NotificationBell.tsx`)
- **Tag `aria-label="Notificações"`:** 
  - *Explicação:* O botão contém apenas o ícone de um sino. Para um usuário cego usando um leitor de tela, o sistema apenas diria "Botão". Com o `aria-label`, o sistema dita explicitamente a palavra "Notificações".
- **Tags `role="status"` e `aria-live="polite"`:**
  - *Explicação:* Transforma a bolinha vermelha num componente "vivo". Se uma nova notificação chegar enquanto o usuário navega, o leitor de tela o avisa ativamente: "Você tem novas notificações", garantindo acessibilidade em tempo real.

### Nos Filtros de Categoria (`HomePage.tsx`)
- **Tag `aria-pressed`:**
  - *Explicação:* Sinaliza semanticamente ao leitor de tela se o botão de filtro está no estado pressionado (Ativo) ou solto (Inativo).
- **Contorno de Foco (`focus:outline-none focus:ring-2 focus:ring-blue-500`):**
  - *Explicação (Affordance de Teclado):* Usuários com deficiência motora severa muitas vezes navegam apenas pela tecla `TAB`. Essas classes criam um "anel azul" visível ao redor do botão focado, deixando cristalino qual elemento está selecionado no momento.
