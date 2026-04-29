document.addEventListener('DOMContentLoaded', () => {

    const verMaisBtn = document.getElementById('ver-mais-btn');
    const searchInput = document.getElementById('cardapio-search');

    if (verMaisBtn) {
        verMaisBtn.addEventListener('click', (event) => {
            event.preventDefault();
            alert('Botão "Ver mais" foi clicado!');
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (searchInput.value) {
                    alert('Você buscou por: ' + searchInput.value);
                } else {
                    alert('Por favor, digite algo para buscar.');
                }
            }
        });
    }

});