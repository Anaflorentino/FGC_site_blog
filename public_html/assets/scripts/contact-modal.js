document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o link de "Support" e a modal
    const supportLink = document.querySelector('a[href="#support"]');
    const supportModalOverlay = document.getElementById('supportModalOverlay');
    const closeSupportModal = document.getElementById('closeSupportModal');

    // Evento para abrir a modal de Support
    supportLink.addEventListener('click', function (e) {
        e.preventDefault(); // Impede o comportamento padrão do link
        supportModalOverlay.style.display = 'flex'; // Exibe a modal
    });

    // Evento para fechar a modal de Support
    closeSupportModal.addEventListener('click', function () {
        supportModalOverlay.style.display = 'none'; // Esconde a modal
    });

    // Evento para fechar a modal de Support ao clicar fora dela
    supportModalOverlay.addEventListener('click', function (e) {
        if (e.target === supportModalOverlay) {
            supportModalOverlay.style.display = 'none'; // Fecha a modal se clicar fora
        }
    });
});
