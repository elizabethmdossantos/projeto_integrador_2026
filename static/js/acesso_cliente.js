// Inicializa o carrinho vazio ou recupera o existente
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

document.querySelectorAll('.btn-warning').forEach((botao, index) => {
    botao.addEventListener('click', () => {
        const card = botao.closest('.card-body');
        const nome = card.querySelector('.card-title').innerText;
        const precoTexto = card.querySelector('.product-price').innerText;
        const preco = parseFloat(precoTexto.replace(',', '.'));

        // Adiciona ao array
        carrinho.push({ nome, preco });
        
        // Salva no LocalStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        
        alert(`${nome} adicionado ao carrinho!`);
    });
});