function atualizarStatus() {
const pedido = JSON.parse(localStorage.getItem('pedidoFinal'));
if (!pedido) return;

// Atualiza o resumo
document.getElementById('resumo-pedido').innerText = `${pedido.itens.length} itens`;
document.getElementById('resumo-total').innerText = pedido.total;

const status = localStorage.getItem('status_pedido') || 'recebido';

// Elementos das etapas
const stepPreparo = document.getElementById('step-preparo');
const stepEntrega = document.getElementById('step-entrega');
const statusText = document.getElementById('status-text');

// Reset visual (opcional, bom para testar várias vezes)
stepPreparo.classList.remove('step-active');
stepEntrega.classList.remove('step-active');

if (status === 'recebido') {
    statusText.innerText = 'Aguardando confirmação do restaurante...';
} 
else if (status === 'preparo') {
    stepPreparo.classList.add('step-active');
    statusText.innerText = 'O chef já está preparando sua comida!';
} 
else if (status === 'entrega') {
    stepPreparo.classList.add('step-active');
    stepEntrega.classList.add('step-active');
    statusText.innerText = 'Seu pedido saiu para entrega!';
}
else if (status === 'cancelado') {
    statusText.innerText = 'Ops! Seu pedido foi cancelado pelo restaurante.';
    statusText.classList.add('text-danger');
}
}

// Checa por atualizações a cada 3 segundos
setInterval(atualizarStatus, 3000);
atualizarStatus();