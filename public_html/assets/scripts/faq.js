document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('faq-form'); // Captura o formulário pelo ID
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o comportamento padrão de recarregamento da página

        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const emailBody = `Client's email: ${email}\n\nMessage: ${message}`;

        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, // Destinatário do email
                subject: "Support Request",
                message: emailBody
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Reset dos campos do formulário
            form.reset();
            
            // Mostra uma mensagem de sucesso abaixo do botão de envio
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Message sent successfully!';
            successMessage.className = 'success-message'; // Classe para estilizar a mensagem, se necessário
            form.appendChild(successMessage);
            
            // Remove a mensagem de sucesso após 3 segundos
            setTimeout(() => {
                form.removeChild(successMessage);
            }, 5000);

        })
        .catch(error => {
            console.error('Error sending email:', error);
            alert('Failed to send email.');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('subscribe-email');
    const messageDiv = document.getElementById('subscribe-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = emailInput.value.trim();

        if (!email) { // Checa se o email está vazio
            emailInput.focus();
            messageDiv.textContent = 'Please enter an email address.';
            messageDiv.style.color = '#dc3545'; // Vermelho para erro
            return;
        }

        fetch('https://flashguyscleaning.com/version-test/api/1.1/wf/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            messageDiv.textContent = 'Subscribed successfully!';
            messageDiv.style.color = '#28a745'; // Verde para sucesso
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = 'Failed to subscribe. Please try again later.';
            messageDiv.style.color = '#dc3545'; // Vermelho para erro
        });
    });
});
