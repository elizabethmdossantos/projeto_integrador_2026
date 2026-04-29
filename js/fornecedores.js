document.addEventListener('DOMContentLoaded', () => {

    const filterSelect = document.getElementById('supplier-filter');
    const supplierCards = document.querySelectorAll('.supplier-card');


    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            
            const selectedValue = filterSelect.value;


            supplierCards.forEach(card => {
    
                const cardCategory = card.querySelector('[data-category]').getAttribute('data-category');


                if (selectedValue === 'todos' || cardCategory === selectedValue) {
    
                    card.style.display = 'block'; 
                } else {
        
                    card.style.display = 'none';
                }
            });
        });
    }

});