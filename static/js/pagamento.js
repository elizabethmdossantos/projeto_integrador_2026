document.addEventListener('DOMContentLoaded', () => {
    const paymentOptions = document.querySelectorAll('#payment-options .list-group-item');
    const allPaymentDetails = document.querySelectorAll('.payment-details');
    const confirmButton = document.getElementById('confirmar-pedido-btn');

    // Lógica de Seleção de Pagamento
    paymentOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();

            // 1. Limpa seleções anteriores
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            allPaymentDetails.forEach(detail => detail.style.display = 'none');

            // 2. Ativa a opção atual
            option.classList.add('active');
            
            // 3. Exibe o detalhe correspondente
            const paymentType = option.getAttribute('data-payment');
            const targetDetail = document.getElementById(`payment-details-${paymentType}`);
            
            if (targetDetail) {
                targetDetail.style.display = 'block';
            }
        });
    });

    // Lógica de Confirmação
    if (confirmButton) {
        confirmButton.addEventListener('click', () => {
            const activePayment = document.querySelector('#payment-options .list-group-item.active');
            
            if (!activePayment) {
                alert('Por favor, selecione uma forma de pagamento antes de continuar.');
                return;
            }

            const paymentType = activePayment.getAttribute('data-payment');
            alert(`Pedido confirmado! Forma de pagamento: ${paymentType.toUpperCase()}`);
            
            // Aqui você pode adicionar o redirecionamento ou envio do formulário
            // window.location.href = "sucesso.html";
        });
    }
});