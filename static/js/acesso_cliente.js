(function () {
    'use strict'
    // 1. VALIDAÇÃO DE FORMULÁRIOS (Bootstrap)
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })
})()

// Inicializa o carrinho: tenta buscar do LocalStorage, se não existir, cria um array vazio
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// 2. LÓGICA DE ADICIONAR AO CARRINHO
document.querySelectorAll('.btn-warning').forEach((botao) => {
    botao.addEventListener('click', () => {
        const card = botao.closest('.card-body');
        const nome = card.querySelector('.card-title').innerText;
        const precoTexto = card.querySelector('.product-price').innerText;
        
        // Converte "R$ 25,00" para o número 25.00
        const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.').trim());

        // Verifica se o produto já está no carrinho para agrupar
        const itemExistente = carrinho.find(item => item.nome === nome);

        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            carrinho.push({ 
                nome: nome, 
                preco: preco, 
                quantidade: 1 
            });
        }
        
        // Salva a lista atualizada no navegador
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        
        // --- MELHORIA 1: FEEDBACK VISUAL NO BOTÃO ---
        const textoOriginal = botao.innerHTML;
        botao.innerText = "Adicionado! ✓";
        botao.classList.replace('btn-warning', 'btn-success'); // Muda a cor para verde
        botao.disabled = true; // Desabilita temporariamente para evitar cliques duplos

        setTimeout(() => {
            botao.innerHTML = textoOriginal;
            botao.classList.replace('btn-success', 'btn-warning'); // Volta para a cor original
            botao.disabled = false;
        }, 1500); // O feedback dura 1.5 segundos
    });
});

// 3. VALIDAÇÃO ANTES DE IR PARA O PAGAMENTO
document.addEventListener('DOMContentLoaded', () => {
    const linkPagamento = document.querySelector('a[href="pagamento.html"]');

    if (linkPagamento) {
        linkPagamento.addEventListener('click', (e) => {
            const itensNoCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            
            if (itensNoCarrinho.length === 0) {
                e.preventDefault(); 
                alert("Seu carrinho está vazio! Escolha um item antes de finalizar.");
            }
        });
    }
});

// 4. LÓGICA DE BUSCA EM TEMPO REAL
const inputBusca = document.getElementById('cardapio-search');

if (inputBusca) {
    inputBusca.addEventListener('input', () => {
        const termoBusca = inputBusca.value.toLowerCase();
        const cards = document.querySelectorAll('.col'); 

        cards.forEach((cardColuna) => {
            const tituloElemento = cardColuna.querySelector('.card-title');
            
            if (tituloElemento) {
                const nomeProduto = tituloElemento.innerText.toLowerCase();

                // --- MELHORIA 2: DISPLAY CORRIGIDO ---
                // Usamos '' (vazio) em vez de 'block' para que o navegador use o 
                // comportamento padrão do elemento (flex, grid, etc) definido no CSS/Bootstrap.
                if (nomeProduto.includes(termoBusca)) {
                    cardColuna.style.display = ''; 
                } else {
                    cardColuna.style.display = 'none';
                }
            }
        });
    });
}