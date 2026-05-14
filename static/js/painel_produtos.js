// 1. Carrega os produtos (Prioriza o que está no localStorage, se não houver, usa os iniciais)
let produtos = JSON.parse(localStorage.getItem('meusProdutos'));

if (!produtos) {
    produtos = [
        { id: 1, nome: "Cheeseburger Clássico", categoria: "Sanduiches", valor: 22.90, estoque: 50, ingredientes: "Carne, queijo prato, pão de brioche, alface e tomate." },
        { id: 2, nome: "Calabresa com Mussarela", categoria: "Pizzas", valor: 45.00, estoque: 20, ingredientes: "Molho, mussarela, calabresa fatiada e orégano." }
    ];
    localStorage.setItem('meusProdutos', JSON.stringify(produtos));
}

const categoryMap = {
    "Sanduiches": "Sanduiches", 
    "Pizzas": "Pizzas", 
    "Salgados": "Salgados",
    "Sucos": "Bebidas", 
    "Refrigerantes": "Bebidas", 
    "Doces": "Doces", 
    "Adicionais": "Adicionais"
};

function createProductCard(produto) {
    const isLowStock = produto.estoque <= 15;
    const estoqueClass = isLowStock ? 'text-danger fw-bold' : 'text-success';
    
    return `
        <div class="col-md-6 col-lg-4 mb-4" id="card-${produto.id}">
            <div class="card-produto p-4 shadow-sm border rounded h-100 d-flex flex-column bg-white">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h5 class="fw-bold mb-0 text-dark">${produto.nome}</h5>
                    <span class="badge bg-danger rounded-pill">${produto.categoria}</span>
                </div>
                <p class="text-secondary small mb-4 flex-grow-1">${produto.ingredientes}</p>
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="fw-bold fs-5 text-danger">R$ ${produto.valor.toFixed(2).replace('.', ',')}</span>
                    <span class="${estoqueClass} small">
                        <i class="bi bi-box-seam me-1"></i> Est: ${produto.estoque}
                    </span>
                </div>
                <div class="mt-auto pt-2 d-flex justify-content-end gap-2 border-top">
                    <button onclick="editarProduto(${produto.id})" class="btn btn-sm btn-outline-secondary"><i class="bi bi-pencil"></i></button>
                    <button onclick="excluirProduto(${produto.id})" class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                </div>
            </div>
        </div>`;
}

function renderProducts() {
    // Limpar todos os containers
    const containers = ['all', 'Sanduiches', 'Pizzas', 'Salgados', 'Bebidas', 'Doces', 'Adicionais'];
    containers.forEach(id => {
        const el = document.getElementById(`product-list-${id}`);
        if(el) el.innerHTML = '';
    });

    console.log("Produtos carregados do storage:", produtos);

    produtos.forEach(produto => {
        const cardHtml = createProductCard(produto);
        document.getElementById('product-list-all').innerHTML += cardHtml;
        
        const displayCategory = categoryMap[produto.categoria];
        if (displayCategory) {
            const target = document.getElementById(`product-list-${displayCategory}`);
            if (target) target.innerHTML += cardHtml;
        }
    });
}

// FUNÇÃO EXCLUIR
function excluirProduto(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        produtos = produtos.filter(p => p.id !== id);
        localStorage.setItem('meusProdutos', JSON.stringify(produtos));
        renderProducts();
    }
}

// FUNÇÃO EDITAR
function editarProduto(id) {
    // Redireciona para o cadastro enviando o ID como parâmetro na URL
    window.location.href = `cadastro_produto.html?edit=${id}`;
}

window.onload = renderProducts;