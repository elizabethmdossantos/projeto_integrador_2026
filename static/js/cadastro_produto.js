(function () {
'use strict'
const form = document.querySelector('.needs-validation')

form.addEventListener('submit', event => {
    // Bloqueia o comportamento padrão (não deixa a página recarregar/mudar)
    event.preventDefault()

    if (!form.checkValidity()) {
        event.stopPropagation()
        form.classList.add('was-validated')
    } else {
        // 1. Coleta os dados do formulário
        const novoProduto = {
            id: Date.now(), // ID único
            nome: document.getElementById('nomeProduto').value,
            categoria: document.getElementById('categoria').value,
            ingredientes: document.getElementById('descricaoItens').value || "Sem descrição",
            valor: parseFloat(document.getElementById('valor').value),
            estoque: parseInt(document.getElementById('estoque').value)
        }

        // 2. Recupera o que já existe no localStorage
        const produtosSalvos = JSON.parse(localStorage.getItem('meusProdutos')) || [];

        // 3. Adiciona o novo produto à lista
        produtosSalvos.push(novoProduto);

        // 4. Salva a lista atualizada
        localStorage.setItem('meusProdutos', JSON.stringify(produtosSalvos));

        // 5. Agora que salvou, redireciona manualmente
        window.location.href = 'painel_produtos.html';
    }
}, false)
})()