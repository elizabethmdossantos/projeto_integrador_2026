
document.addEventListener('DOMContentLoaded', () => {

    const acceptButton = document.getElementById('accept-btn');
    const rejectButton = document.getElementById('reject-btn');
    const alertContainer = document.getElementById('alert-container');
    const actionButtonCard = document.getElementById('action-buttons');
    const orderId = document.getElementById('order-id').innerText;

    const createAlert = (message, type) => {
        alertContainer.innerHTML = ''; 
        
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');
        alertContainer.append(wrapper);
    };

    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            createAlert(`<strong>Sucesso!</strong> O ${orderId} foi aceito e o cliente será notificado.`, 'success');
            

            actionButtonCard.innerHTML = '<div class="card-body text-center text-success"><h5 class="mb-0"><i class="bi bi-check-circle-fill"></i> Pedido Aceito</h5></div>';


            window.scrollTo(0, 0);
        });
    }


    if (rejectButton) {
        rejectButton.addEventListener('click', () => {
    
            const reason = prompt("Qual o motivo para rejeitar este pedido? (Opcional)");

            createAlert(`<strong>Atenção!</strong> O ${orderId} foi rejeitado.`, 'warning');

            actionButtonCard.innerHTML = '<div class="card-body text-center text-danger"><h5 class="mb-0"><i class="bi bi-x-circle-fill"></i> Pedido Rejeitado</h5></div>';

        
            window.scrollTo(0, 0);
        });
    }

});