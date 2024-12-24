document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('faq-form'); // Captura o formulário pelo ID
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o comportamento padrão de recarregamento da página

        // Pega os valores dos campos de email e mensagem
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Formata o corpo do email
        const emailBody = `Client's email: ${email}\n\nMessage: ${message}`;

        // Configura a chamada fetch para enviar os dados para o servidor
        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, // Este é o destinatário, pode ser o suporte ou qualquer email que deve receber a mensagem
                subject: "Support Request", // Assunto do email
                message: emailBody // Corpo do email formatado
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Email sent successfully!');
        })
        .catch(error => {
            console.error('Error sending email:', error);
            alert('Failed to send email.');
        });
    });
});
