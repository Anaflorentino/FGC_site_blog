const carrosselConteudo = document.querySelector('.carrossel-conteudo');
const bolinhas = document.querySelectorAll('.bolinha');
let slideIndex = 0;

function updateCarrossel() {
    carrosselConteudo.style.transform = `translateX(-${(slideIndex * 100)}%)`;
    
    bolinhas.forEach((bolinha, index) => {
        bolinha.classList.remove('active');
        if (index === slideIndex) {
            bolinha.classList.add('active');
        }
    });
}

bolinhas.forEach((bolinha, index) => {
    bolinha.addEventListener('click', () => {
        slideIndex = index;
        updateCarrossel();
    });
});

// Remover o comportamento automático
updateCarrossel();
