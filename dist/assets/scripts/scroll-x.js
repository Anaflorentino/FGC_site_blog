document.addEventListener("DOMContentLoaded", () => {
    // Seleciona o contêiner que terá o scroll horizontal
    const scrollContainer = document.querySelector(".section-scroll-x");

    // Seleciona os botões de navegação
    const nextButton = document.querySelector('button[aria-label="Scroll Next"]');
    const prevButton = document.querySelector('button[aria-label="Scroll Previous"]');

    // Define a quantidade de scroll em pixels por clique
    const scrollAmount = 340;

    // Adiciona o evento de clique ao botão "Next"
    nextButton.addEventListener("click", () => {
        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });
    });

    // Adiciona o evento de clique ao botão "Previous"
    prevButton.addEventListener("click", () => {
        scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
        });
    });
});
