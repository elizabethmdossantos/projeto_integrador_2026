
document.addEventListener('DOMContentLoaded', () => {

    const paymentOptions = document.querySelectorAll('#payment-options .list-group-item');
    const allPaymentDetails = document.querySelectorAll('.payment-details');
    const confirmButton = document.getElementById('confirmar-pedido-btn');

    paymentOptions.forEach(option => {
        option.addEventListener('click', (event) => {
           
            event.preventDefault(); 

            paymentOptions.forEach(opt => {
                opt.classList.remove('active');
            });

         
            option.classList.add('active');

          
            const paymentType = option.getAttribute('data-payment');

          
            allPaymentDetails.forEach(detail => {
                detail.style.display = 'none';
            });

        
            const targetDetail = document.getElementById('payment-details-' + paymentType);
            if (targetDetail) {
                targetDetail.style.display = 'block';
            }
        });
    });

   
    if (confirmButton) {
        confirmButton.addEventListener('click', () => {
          
            const activePayment = document.querySelector('#payment-options .list-group-item.active');
            
            if (!activePayment) {
                alert('Por favor, selecione uma forma de pagamento.');
            } else {
                const paymentType = activePayment.getAttribute('data-payment');
                alert('Pedido confirmado! Pagamento será via ' + paymentType + '.');
                
            }
        });
    }

});