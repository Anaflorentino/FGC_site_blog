// Controlar a rolagem horizontal dos testimonials

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('testimonials-container');
    const leftButton = document.getElementById('scroll-left');
    const rightButton = document.getElementById('scroll-right');

    const scrollAmount = 500; // Distância de rolagem para cada clique

    // Função para rolar para a esquerda
    leftButton.addEventListener('click', () => {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // Função para rolar para a direita
    rightButton.addEventListener('click', () => {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
});
