document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menu'); // Botão do menu-hamburger
    const navLinks = document.getElementById('navLinks'); // Links da navegação

    // Evento para alternar a visibilidade dos links
    menuButton.addEventListener('click', function () {
        navLinks.classList.toggle('active'); // Adiciona/Remove a classe 'active'
    });

    // Modais (restante do código)
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');

    const loginBtn = document.getElementById('login-btn');
    const signBtn = document.getElementById('sign-btn');

    if (!loginModal || !signupModal || !loginBtn || !signBtn) {
        return;
    }

    loginBtn.addEventListener('click', function () {
        signupModal.classList.remove('visible');
        loginModal.classList.add('visible');
    });

    signBtn.addEventListener('click', function () {
        loginModal.classList.remove('visible');
        signupModal.classList.add('visible');
    });
});
