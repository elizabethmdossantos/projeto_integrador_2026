// Inicializa o carrinho vazio ou recupera o existente
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

document.querySelectorAll('.btn-warning').forEach((botao, index) => {
    botao.addEventListener('click', () => {
        const card = botao.closest('.card-body');
        const nome = card.querySelector('.card-title').innerText;
        const precoTexto = card.querySelector('.product-price').innerText;
        
        // Remove o "R$" e converte para número
        const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.').trim());

        // Adiciona ao array
        carrinho.push({ nome, preco });
        
        // Salva no LocalStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        
        alert(`${nome} adicionado ao carrinho!`);
    });
});

// --- NOVO BLOCO: Validação do Carrinho ---
// Este código garante que o usuário não vá para o pagamento sem itens.

document.addEventListener('DOMContentLoaded', () => {
    // Procura o link que leva para a página de pagamento (ajuste o seletor se necessário)
    // Se o seu link estiver no ícone do carrinho no topo:
    const linkPagamento = document.querySelector('a[href="pagamento.html"]');

    if (linkPagamento) {
        linkPagamento.addEventListener('click', (e) => {
            const itensNoCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            
            if (itensNoCarrinho.length === 0) {
                e.preventDefault(); // Cancela o clique (não muda de página)
                alert("Seu carrinho está vazio! Escolha um item antes de finalizar.");
            }
        });
    }
});