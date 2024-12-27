function scrollToTop(event) {
    event.preventDefault();  // Evita que o link recarregue a página
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}