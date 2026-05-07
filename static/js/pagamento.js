document.addEventListener('DOMContentLoaded', () => {
    const listaItens = document.querySelector('.list-group-flush');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutTotal = document.getElementById('checkout-total');
    const inputTelefone = document.getElementById('telefone-cliente');
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const taxaEntrega = 5.00;

    // --- 1. MÁSCARA DE TELEFONE (Melhoria do novo integrante) ---
    if (inputTelefone) {
        inputTelefone.addEventListener('input', (e) => {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    function renderizarCarrinho() {
        if (carrinho.length === 0) {
            listaItens.innerHTML = '<li class="list-group-item text-center">Carrinho vazio</li>';
            checkoutSubtotal.innerText = 'R$ 0,00';
            checkoutTotal.innerText = 'R$ 0,00';
            return;
        }

        listaItens.innerHTML = '';
        let subtotal = 0;

        carrinho.forEach((item, index) => {
            subtotal += item.preco;
            listaItens.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    <div>
                        <button class="btn btn-sm btn-outline-danger border-0 me-2 btn-remover" data-index="${index}">
                            <i class="bi bi-trash"></i>
                        </button>
                        <span>(1x) ${item.nome}</span>
                    </div>
                    <strong>R$ ${item.preco.toFixed(2).replace('.', ',')}</strong>
                </li>`;
        });

        checkoutSubtotal.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        checkoutTotal.innerText = `R$ ${(subtotal + taxaEntrega).toFixed(2).replace('.', ',')}`;
        
        adicionarEventosRemover();
    }

    function adicionarEventosRemover() {
        document.querySelectorAll('.btn-remover').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                removerItem(index);
            });
        });
    }

    function removerItem(index) {
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();
    }

    // Lógica para selecionar pagamento
    let formaPagamento = "Não selecionado";
    document.querySelectorAll('[data-payment]').forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.preventDefault();
            formaPagamento = opt.querySelector('span').innerText;
            document.querySelectorAll('[data-payment]').forEach(el => el.classList.remove('active'));
            opt.classList.add('active');
        });
    });

    // --- 2. BOTÃO CONFIRMAR COM VALIDAÇÕES (Melhoria do novo integrante) ---
    document.getElementById('confirmar-pedido-btn').addEventListener('click', () => {
        const nome = document.getElementById('nome-cliente').value.trim();
        const telefone = document.getElementById('telefone-cliente').value.trim();
        const endereco = document.getElementById('endereco').value.trim();

        // VALIDAÇÃO 1: Nome vazio
        if (nome === "") {
            alert("Por favor, digite seu nome.");
            return;
        }

        // VALIDAÇÃO 2: Telefone incompleto
        if (telefone.length < 14) {
            alert("Por favor, digite um telefone válido com DDD.");
            return;
        }

        // VALIDAÇÃO 3: Endereço vazio
        if (endereco === "") {
            alert("Por favor, informe o endereço de entrega.");
            return;
        }

        // VALIDAÇÃO 4: Forma de pagamento não selecionada
        if (formaPagamento === "Não selecionado") {
            alert("Por favor, selecione uma forma de pagamento.");
            return;
        }

        // VALIDAÇÃO 5: Carrinho vazio
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        // Se passar em tudo, cria o pedido
        const pedidoFinal = {
            id: Math.floor(Math.random() * 100000),
            nome: nome,
            telefone: telefone,
            endereco: endereco,
            itens: carrinho,
            subtotal: checkoutSubtotal.innerText,
            total: checkoutTotal.innerText,
            pagamento: formaPagamento
        };
        
        // Salva e envia para a tela de status (Acompanhamento do cliente)
        localStorage.setItem('pedidoFinal', JSON.stringify(pedidoFinal));
        localStorage.setItem('status_pedido', 'recebido');
        window.location.href = 'status_pedido.html';
    });

    renderizarCarrinho();
});