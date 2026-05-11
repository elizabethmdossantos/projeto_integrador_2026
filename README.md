🚚 TruckGestão - Sistema de Gestão para Food Trucks

O TruckGestão é uma plataforma web completa projetada para otimizar a operação de Food Trucks. O sistema oferece desde uma interface de autoatendimento para o cliente final até um painel administrativo robusto para o controlo de vendas, estoque e fornecedores.

🌟 Diferenciais do Projeto

Persistência de Dados: Utiliza localStorage para gerir o carrinho de compras e o estado dos pedidos entre diferentes páginas sem necessidade de base de dados externa nesta fase.

Interface Responsiva: Construído com Bootstrap 5, garantindo que o sistema funcione perfeitamente em tablets, smartphones e computadores.

Experiência do Usuário (UX): Inclui máscaras de entrada (ex: telefone), validações de formulário em tempo real e feedbacks visuais de status do pedido.


🛠️ Tecnologias Utilizadas

Linguagens: HTML5, CSS3, JavaScript (ES6+).

Framework CSS: Bootstrap 5.3.

Ícones: Bootstrap Icons.

Arquitetura: Front-end modular com separação clara de responsabilidades (HTML para estrutura, CSS para estilo e JS para lógica).

📂 Organização do Repositório
O projeto está estruturado da seguinte forma:

├── html/                      
│   ├── index.html             # Landing page institucional
│   ├── login.html             # Página de Login
│   ├── cadastro.html          # Página de cadastro
│   ├── dashboard.html         # Gestão administrativa
|   ├── cadastro_produtos.html # Cadastro de novos produtos
│   ├── painel_produtos.html   # Gestão de cardápio
│   ├── fornecedores.html      # Gestão de parceiros
│   ├── acesso_cliente.html    # Cardápio digital do cliente
│   ├── pagamento.html         # Checkout e validação (cliente)
│   ├── status_pedido.html     # Tracking em tempo real
│   └── confirmacao_pedido.html# Validação do pedido pelo admin
├── static/
│   ├── css/                   # Estilização customizada
│   │   ├── style.css          
│   │   ├── dashboard.css      
│   │   └── acesso_cliente     
│   │   └── confirmacao_pedido 
│   │   └── pagamento          
│   └── js/                    # Lógica de interatividade
│       ├── acesso_cliente.js  # Gestão do carrinho
│       ├── pagamento.js       # Máscaras e validação de checkout
│       ├── confirmacao_pedido.js # Lógica de aceite/rejeição de pedidos
│       └── fornecedores.js    # Filtros e pesquisa


🚀 Funcionalidades Detalhadas

👤 Área do Cliente

Cardápio Interativo: Adição de produtos ao carrinho com persistência local.

Checkout Inteligente: Validação de campos obrigatórios, máscara de telefone automática e cálculo de subtotal com taxa de entrega.

Acompanhamento: Visualização do status do pedido (Recebido, Em Preparo, Saiu para Entrega) através de uma barra de progresso visual.

💼 Área Administrativa

Dashboard: Resumo operacional e métricas.

Gestão de Inventário: Visualização de produtos por categorias (Sanduíches, Bebidas, etc.).

Gestão de Fornecedores: Filtro dinâmico por categoria de insumo (Carnes, Bebidas, Embalagens).

Fluxo de Pedidos: Interface para o administrador aceitar ou rejeitar pedidos, atualizando o status para o cliente instantaneamente.

⚙️ Como Instalar e Rodar
1 - Clone o repositório:

Bash
git clone https://github.com/seu-usuario/truckgestao.git

2 - Aceda ao diretório:

Bash
cd truckgestao

3 - Execução:
Como o projeto é baseado em tecnologias front-end puras, basta abrir o arquivo index.html em qualquer navegador moderno.

📝 Licença

Este projeto é livre para fins de estudo e uso pessoal. Verifique o arquivo LICENSE para mais detalhes.