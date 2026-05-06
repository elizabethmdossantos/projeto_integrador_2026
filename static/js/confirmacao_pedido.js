document.addEventListener('DOMContentLoaded', () => {
    // Recupera o pedido do LocalStorage
    const pedido = JSON.parse(localStorage.getItem('pedidoFinal'));

    if (pedido) {
        // Preenche os dados do cliente
        document.getElementById('info-nome').innerText = pedido.nome || "Não informado";
        document.getElementById('info-telefone').innerText = pedido.telefone || "Não informado";
        document.getElementById('client-address').innerText = pedido.endereco;
    }
    
    if (!pedido) {
        alert("Nenhum pedido encontrado! Volte à página anterior.");
        return;
    }

    // 1. Preencher ID, Endereço e Totais
    document.getElementById('order-id').innerText = `Pedido #${pedido.id}`;
    document.getElementById('client-address').innerText = pedido.endereco;
    document.getElementById('summary-subtotal').innerText = pedido.subtotal;
    document.getElementById('summary-total').innerText = pedido.total;
    
    // Ajustar o badge de pagamento
    const badgePagamento = document.getElementById('payment-method');
    badgePagamento.innerHTML = `<i class="bi bi-credit-card me-1"></i>${pedido.pagamento}`;

    // 2. Preencher os Itens (A parte que está a falhar)
    const containerItens = document.querySelector('#order-items ul');
    
    if (containerItens) {
        containerItens.innerHTML = ''; // Limpa o que estiver lá

        pedido.itens.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>(1x) ${item.nome}</span>
                <strong>R$ ${item.preco.toFixed(2).replace('.', ',')}</strong>
            `;
            containerItens.appendChild(li);
        });
    } else {
        console.error("Erro: Não foi encontrada uma tag <ul> dentro de #order-items");
    }
});