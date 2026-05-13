document.addEventListener('DOMContentLoaded', () => {
    const historico = JSON.parse(localStorage.getItem('historico_vendas')) || [];
    const hoje = new Date().toISOString().split('T')[0];

    let faturamentoHoje = 0;
    let totalPedidosHoje = 0;
    let contagemProdutos = {};

    historico.forEach(venda => {
        // 1. Filtrar apenas vendas de hoje
        if (venda.data === hoje) {
            faturamentoHoje += (venda.total || 0);
            totalPedidosHoje++;

            // 2. Contabilizar produtos (Se existirem itens)
            if (venda.itens && Array.isArray(venda.itens)) {
                venda.itens.forEach(item => {
                    const nome = item.nome;
                    const quantidade = parseInt(item.qtd) || 1;

                    if (contagemProdutos[nome]) {
                        contagemProdutos[nome] += quantidade;
                    } else {
                        contagemProdutos[nome] = quantidade;
                    }
                });
            }
        }
    });

    // 3. Atualizar KPIs na tela
    const elFaturamento = document.getElementById('faturamento-dia');
    const elPedidos = document.getElementById('total-pedidos'); // Verifique se esse ID existe no HTML

    if (elFaturamento) elFaturamento.innerText = faturamentoHoje.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    if (elPedidos) elPedidos.innerText = totalPedidosHoje;

    // 4. Gerar Ranking na Tabela
    const ranking = Object.entries(contagemProdutos).sort((a, b) => b[1] - a[1]);
    const corpoTabela = document.querySelector('#tabela-mais-vendidos tbody');

    if (corpoTabela) {
        corpoTabela.innerHTML = ""; 
        if (ranking.length === 0) {
            corpoTabela.innerHTML = `<tr><td colspan="2" class="text-center">Nenhuma venda hoje.</td></tr>`;
        } else {
            ranking.forEach(([nome, qtd]) => {
                const row = `<tr><td>${nome}</td><td class="text-center">${qtd}</td></tr>`;
                corpoTabela.innerHTML += row;
            });
        }
    }
});