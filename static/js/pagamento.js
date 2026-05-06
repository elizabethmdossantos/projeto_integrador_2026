document.addEventListener('DOMContentLoaded', () => {
    const listaItens = document.querySelector('.list-group-flush');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutTotal = document.getElementById('checkout-total');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const taxaEntrega = 5.00;

    function renderizarCarrinho() {
        if (carrinho.length === 0) {
            listaItens.innerHTML = '<li class="list-group-item">Carrinho vazio</li>';
            return;
        }

        listaItens.innerHTML = '';
        let subtotal = 0;

        carrinho.forEach(item => {
            subtotal += item.preco;
            listaItens.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span>(1x) ${item.nome}</span>
                    <strong>R$ ${item.preco.toFixed(2).replace('.', ',')}</strong>
                </li>`;
        });

        checkoutSubtotal.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        checkoutTotal.innerText = `R$ ${(subtotal + taxaEntrega).toFixed(2).replace('.', ',')}`;
    }

    // Lógica para selecionar pagamento
    let formaPagamento = "Não selecionado";
    document.querySelectorAll('[data-payment]').forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.preventDefault();
            formaPagamento = opt.querySelector('span').innerText;
            // Estilização básica de seleção
            document.querySelectorAll('[data-payment]').forEach(el => el.classList.remove('active'));
            opt.classList.add('active');
        });
    });

    // Botão Confirmar
    document.getElementById('confirmar-pedido-btn').addEventListener('click', () => {
        const pedidoFinal = {
            id: Math.floor(Math.random() * 100000),
            // CAPTURANDO OS NOVOS CAMPOS:
            nome: document.getElementById('nome-cliente').value,
            telefone: document.getElementById('telefone-cliente').value,
            endereco: document.getElementById('endereco').value,
            
            itens: carrinho, // A lista de itens que já fizemos antes
            subtotal: document.getElementById('checkout-subtotal').innerText,
            total: document.getElementById('checkout-total').innerText,
            pagamento: formaPagamento // Definida na lógica de seleção de botões
        };
        
        localStorage.setItem('pedidoFinal', JSON.stringify(pedidoFinal));
        window.location.href = 'confirmacao_pedido.html';
    });

    renderizarCarrinho();
});