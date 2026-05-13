document.addEventListener('DOMContentLoaded', () => {
    // 1. Recupera o histórico de vendas do LocalStorage
    const historico = JSON.parse(localStorage.getItem('historico_vendas')) || [];

    // 2. Define a data de hoje no formato YYYY-MM-DD (mesmo padrão usado no aceite do pedido)
    const agora = new Date();
    const hoje = agora.getFullYear() + '-' + 
                String(agora.getMonth() + 1).padStart(2, '0') + '-' + 
                String(agora.getDate()).padStart(2, '0');

    // Variáveis para os cálculos
    let faturamentoTotal = 0;
    let totalPedidos = 0;
    let contagemProdutos = {}; // Objeto para agrupar produtos e somar quantidades

    // 3. Filtra e processa as vendas do dia
    historico.forEach(venda => {
        if (venda.data === hoje) {
            totalPedidos++;
            faturamentoTotal += parseFloat(venda.total) || 0;

            // Percorre os itens dentro de cada venda para o ranking
            if (venda.itens && Array.isArray(venda.itens)) {
                venda.itens.forEach(item => {
                    const nome = item.nome;
                    const qtd = parseInt(item.qtd) || 1;

                    if (contagemProdutos[nome]) {
                        contagemProdutos[nome] += qtd;
                    } else {
                        contagemProdutos[nome] = qtd;
                    }
                });
            }
        }
    });

    // 4. Atualiza os cards de KPI no topo da página
    const campoFaturamento = document.getElementById('faturamento-dia');
    const campoPedidos = document.getElementById('total-pedidos');

    if (campoFaturamento) {
        campoFaturamento.innerText = faturamentoTotal.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        });
    }

    if (campoPedidos) {
        campoPedidos.innerText = totalPedidos;
    }

    // 5. Preenche a Tabela de Produtos Mais Vendidos
    const corpoTabela = document.querySelector('#tabela-mais-vendidos tbody');
    
    if (corpoTabela) {
        corpoTabela.innerHTML = ''; // Limpa a tabela antes de popular

        // Converte o objeto de contagem em um array e ordena do maior para o menor
        const ranking = Object.entries(contagemProdutos).sort((a, b) => b[1] - a[1]);

        if (ranking.length === 0) {
            corpoTabela.innerHTML = `
                <tr>
                    <td colspan="3" class="text-center text-muted py-4">
                        Nenhuma venda registrada para o dia de hoje.
                    </td>
                </tr>`;
        } else {
            ranking.forEach(([nome, qtd]) => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td class="fw-medium">${nome}</td>
                    <td class="text-center">${qtd}</td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-outline-secondary" onclick="alert('Relatório detalhado de ${nome} em breve!')">
                            <i class="bi bi-eye"></i>
                        </button>
                    </td>
                `;
                corpoTabela.appendChild(linha);
            });
        }
    }
});

const btnZerar = document.getElementById('btn-zerar');

if (btnZerar) {
    btnZerar.addEventListener('click', () => {
        if (confirm("Tem certeza que deseja apagar TODO o histórico de vendas? Esta ação não pode ser desfeita.")) {
            // Apaga apenas a chave do histórico de vendas
            localStorage.removeItem('historico_vendas');
            
            // Recarrega a página para zerar os números na tela
            alert("Histórico apagado com sucesso!");
            window.location.reload();
        }
    });
}