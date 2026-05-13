document.addEventListener('DOMContentLoaded', () => {
    // 1. Recupera o pedido do LocalStorage
    const pedido = JSON.parse(localStorage.getItem('pedidoFinal'));

    // 2. Verificação de segurança
    if (!pedido) {
        alert("Nenhum pedido encontrado!");
        window.location.href = 'acesso_cliente.html';
        return;
    }

    // 3. Preenche as Informações do Cliente (Seus códigos permanecem iguais...)
    const infoNome = document.getElementById('info-nome');
    const infoTelefone = document.getElementById('info-telefone');
    const infoEndereco = document.getElementById('client-address');
    if (infoNome) infoNome.innerText = pedido.nome || "Não informado";
    if (infoTelefone) infoTelefone.innerText = pedido.telefone || "Não informado";
    if (infoEndereco) infoEndereco.innerText = pedido.endereco || "Endereço não informado";

    // 4. Preenche os Dados da Ordem
    const orderId = document.getElementById('order-id');
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryTotal = document.getElementById('summary-total');
    if (orderId) orderId.innerText = `Pedido #${pedido.id}`;
    if (summarySubtotal) summarySubtotal.innerText = pedido.subtotal;
    if (summaryTotal) summaryTotal.innerText = pedido.total;
    
    // 5. Ajustar a Forma de Pagamento
    const badgePagamento = document.getElementById('payment-method');
    if (badgePagamento) {
        badgePagamento.innerHTML = `<i class="bi bi-credit-card me-1"></i>${pedido.pagamento}`;
    }

    // 6. Preencher a lista de Itens do Pedido
    const containerItens = document.querySelector('#order-items ul');
    if (containerItens) {
        containerItens.innerHTML = ''; 
        pedido.itens.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>(${item.qtd || 1}x) ${item.nome}</span>
                <strong>R$ ${item.preco.toFixed(2).replace('.', ',')}</strong>
            `;
            containerItens.appendChild(li);
        });
    }

    // --- LÓGICA DOS BOTÕES DE AÇÃO (ATUALIZADA) ---

    const acceptBtn = document.getElementById('accept-btn');
    if (acceptBtn) {
        acceptBtn.addEventListener('click', (e) => {
            e.preventDefault(); 

            let valorLimpo = pedido.total.toString().replace("R$", "").replace(/\s/g, "").replace(".", "").replace(",", ".");
            let totalNumerico = parseFloat(valorLimpo);

            const novaVenda = {
                id: pedido.id,
                total: totalNumerico,
                itens: pedido.itens,
                data: new Date().toISOString().split('T')[0],
                hora: new Date().toLocaleTimeString()
            };

            historico.push(novaVenda);
            localStorage.setItem('historico_vendas', JSON.stringify(historico));

            localStorage.setItem('status_pedido', 'preparo');
            alert("Pedido aceito e registrado no histórico!");
            window.location.href = 'dashboard.html';
        });
    }

    // Ação do Botão Rejeitar
    const rejectBtn = document.getElementById('reject-btn');
    if (rejectBtn) {
        rejectBtn.addEventListener('click', () => {
            if (confirm("Tem certeza que deseja rejeitar este pedido?")) {
                localStorage.setItem('status_pedido', 'cancelado');
                alert("Pedido rejeitado.");
            }
        });
    }
});