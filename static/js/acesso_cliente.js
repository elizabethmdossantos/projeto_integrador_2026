// Inicializa o carrinho vazio ou recupera o existente
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

document.querySelectorAll('.btn-warning').forEach((botao) => {
    botao.addEventListener('click', () => {
        const card = botao.closest('.card-body');
        const nome = card.querySelector('.card-title').innerText;
        const precoTexto = card.querySelector('.product-price').innerText;
        
        // Remove o "R$" e converte para número
        const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.').trim());

        // --- LÓGICA DE AGRUPAMENTO (ITEM 3) ---
        // Verifica se esse produto já existe na lista
        const itemExistente = carrinho.find(item => item.nome === nome);

        if (itemExistente) {
            // Se já existe, apenas aumenta a quantidade
            itemExistente.quantidade += 1;
        } else {
            // Se não existe, adiciona o objeto com quantidade inicial 1
            carrinho.push({ 
                nome: nome, 
                preco: preco, 
                quantidade: 1 
            });
        }
        
        // Salva no LocalStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        
        alert(`${nome} adicionado ao carrinho!`);
    });
});

// --- VALIDAÇÃO DO CARRINHO ---
document.addEventListener('DOMContentLoaded', () => {
    const linkPagamento = document.querySelector('a[href="pagamento.html"]');

    if (linkPagamento) {
        linkPagamento.addEventListener('click', (e) => {
            // Pegamos o carrinho mais atualizado
            const itensNoCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            
            if (itensNoCarrinho.length === 0) {
                e.preventDefault(); 
                alert("Seu carrinho está vazio! Escolha um item antes de finalizar.");
            }
        });
    }
});

// --- LÓGICA DE BUSCA EM TEMPO REAL (ITEM 4) ---
const inputBusca = document.getElementById('cardapio-search');

if (inputBusca) {
    inputBusca.addEventListener('input', () => {
        const termoBusca = inputBusca.value.toLowerCase(); // Texto digitado em minúsculo
        const cards = document.querySelectorAll('.col'); // Seleciona as colunas que envolvem os cards

        cards.forEach((cardColuna) => {
            // Buscamos o título dentro de cada card
            const tituloElemento = cardColuna.querySelector('.card-title');
            
            if (tituloElemento) {
                const nomeProduto = tituloElemento.innerText.toLowerCase();

                // Se o nome do produto incluir o que foi digitado, mostra. Caso contrário, esconde.
                if (nomeProduto.includes(termoBusca)) {
                    cardColuna.style.display = 'block';
                } else {
                    cardColuna.style.display = 'none';
                }
            }
        });
    });
}