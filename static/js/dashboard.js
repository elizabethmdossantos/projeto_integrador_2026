function atualizarPainelKpi() {
    // 1. Busca o histórico de vendas (ou array vazio se não houver nada)
    const historico = JSON.parse(localStorage.getItem('historico_vendas')) || [];
    
    // 2. Define a data de hoje no formato YYYY-MM-DD (mesmo formato salvo no accept-btn)
    const hoje = new Date().toISOString().split('T')[0];

    // 3. Filtra apenas as vendas realizadas hoje
    const vendasHoje = historico.filter(venda => venda.data === hoje);

    // 4. Calcula o faturamento total do dia
    const faturamentoTotal = vendasHoje.reduce((acumulador, venda) => {
        return acumulador + (venda.total || 0);
    }, 0);

    // 5. Captura os elementos do HTML
    const campoVendas = document.getElementById('kpi-vendas');
    const campoPedidos = document.getElementById('kpi-pedidos');

    // 6. Atualiza a tela com os valores reais
    if (campoVendas) {
        campoVendas.innerText = faturamentoTotal.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        });
    }

    if (campoPedidos) {
        campoPedidos.innerText = vendasHoje.length;
    }
}

// Executa a função assim que a página carregar
document.addEventListener('DOMContentLoaded', atualizarPainelKpi);