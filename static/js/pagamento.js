document.addEventListener('DOMContentLoaded', () => {
    const listaItens = document.querySelector('.list-group-flush');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutTotal = document.getElementById('checkout-total');
    const inputTelefone = document.getElementById('telefone-cliente');
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const taxaEntrega = 5.00;

    // --- MÁSCARA DE TELEFONE ---
    if (inputTelefone) {
        inputTelefone.addEventListener('input', (e) => {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    // --- FUNÇÃO PARA RENDERIZAR O CARRINHO COM BOTÕES + E - ---
    function renderizarCarrinho() {
        if (carrinho.length === 0) {
            listaItens.innerHTML = '<li class="list-group-item text-center text-muted py-4">Seu carrinho está vazio</li>';
            checkoutSubtotal.innerText = 'R$ 0,00';
            checkoutTotal.innerText = 'R$ 0,00';
            return;
        }

        listaItens.innerHTML = '';
        let subtotal = 0;

        carrinho.forEach((item, index) => {
            const totalItem = item.preco * item.quantidade;
            subtotal += totalItem;

            listaItens.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
                    <div class="d-flex align-items-center">
                        <button class="btn p-0 border-0 shadow-none btn-alterar" data-index="${index}" data-acao="diminuir">
                            <i class="bi ${item.quantidade > 1 ? 'bi-dash-square' : 'bi-trash'} text-danger fs-5"></i>
                        </button>
                        
                        <span class="mx-3 fw-bold fs-5" style="min-width: 20px; text-align: center;">${item.quantidade}</span>
                        
                        <button class="btn p-0 border-0 shadow-none btn-alterar" data-index="${index}" data-acao="aumentar">
                            <i class="bi bi-plus-square text-success fs-5"></i>
                        </button>

                        <span class="ms-3 fw-medium">${item.nome}</span>
                    </div>
                    <strong class="text-dark">R$ ${totalItem.toFixed(2).replace('.', ',')}</strong>
                </li>`;
        });

        checkoutSubtotal.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        checkoutTotal.innerText = `R$ ${(subtotal + taxaEntrega).toFixed(2).replace('.', ',')}`;
        
        adicionarEventosBotoes();
    }

    // --- LÓGICA DE AUMENTAR / DIMINUIR ---
    function adicionarEventosBotoes() {
        document.querySelectorAll('.btn-alterar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                const acao = e.currentTarget.getAttribute('data-acao');

                if (acao === 'aumentar') {
                    carrinho[index].quantidade += 1;
                } else if (acao === 'diminuir') {
                    if (carrinho[index].quantidade > 1) {
                        carrinho[index].quantidade -= 1;
                    } else {
                        // Se for 1 e clicar em diminuir, remove o item
                        carrinho.splice(index, 1);
                    }
                }

                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                renderizarCarrinho();
            });
        });
    }

    // --- LÓGICA DE PAGAMENTO E CONFIRMAÇÃO ---
    let formaPagamento = "Não selecionado";
    document.querySelectorAll('[data-payment]').forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.preventDefault();
            formaPagamento = opt.querySelector('span').innerText;
            document.querySelectorAll('[data-payment]').forEach(el => el.classList.remove('active'));
            opt.classList.add('active');
        });
    });

    document.getElementById('confirmar-pedido-btn').addEventListener('click', () => {
        const nome = document.getElementById('nome-cliente').value.trim();
        const telefone = document.getElementById('telefone-cliente').value.trim();
        const endereco = document.getElementById('endereco').value.trim();

        if (!nome || telefone.length < 14 || !endereco || formaPagamento === "Não selecionado" || carrinho.length === 0) {
            alert("Por favor, preencha todos os dados, selecione o pagamento e certifique-se de que o carrinho não está vazio.");
            return;
        }

        const pedidoFinal = {
            id: Math.floor(Math.random() * 100000),
            nome, telefone, endereco,
            itens: carrinho,
            subtotal: checkoutSubtotal.innerText,
            total: checkoutTotal.innerText,
            pagamento: formaPagamento
        };
        
        localStorage.setItem('pedidoFinal', JSON.stringify(pedidoFinal));
        localStorage.setItem('status_pedido', 'recebido');
        window.location.href = 'status_pedido.html';
    });

    renderizarCarrinho();
});