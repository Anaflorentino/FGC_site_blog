const carrosselConteudo = document.querySelector('.carrossel-conteudo');
const bolinhasContainer = document.querySelector('.navegacao');
const setas = document.querySelectorAll('.seta');
let slideIndex = 0;

const totalItems = document.querySelectorAll('.item').length;

function updateCarrossel() {
    // Calcula o deslocamento correto
    carrosselConteudo.style.transform = `translateX(-${(slideIndex * 100)}%)`;

    // Atualiza as bolinhas
    const bolinhas = document.querySelectorAll('.bolinha');
    bolinhas.forEach((bolinha, index) => {
        bolinha.classList.remove('active');
        if (index === slideIndex) {
            bolinha.classList.add('active');
        }
    });
}

// Função para ajustar o número de bolinhas baseado no número de itens visíveis
function ajustarBolinhas() {
    let itemsPerSlide;
    if (window.innerWidth <= 480) {
        itemsPerSlide = 1;  // Mobile (1 imagem por vez)
    } else if (window.innerWidth <= 768) {
        itemsPerSlide = 2;  // Tablet (2 imagens por vez)
    } else {
        itemsPerSlide = 3;  // Desktop (3 imagens por vez)
    }

    const totalSlides = Math.ceil(totalItems / itemsPerSlide);
    const bolinhasToCreate = window.innerWidth <= 480 && totalSlides > 1 ? totalSlides - 1 : totalSlides;

    bolinhasContainer.innerHTML = '';

    for (let i = 0; i < bolinhasToCreate; i++) {
        const bolinha = document.createElement('span');
        bolinha.classList.add('bolinha');
        bolinha.setAttribute('data-slide', i);
        bolinha.setAttribute('aria-label', `Slide ${i + 1}`);
        bolinha.addEventListener('click', () => {
            slideIndex = i;
            updateCarrossel();
        });
        bolinhasContainer.appendChild(bolinha);
    }

    updateCarrossel();
}

// Função para mover o carrossel para o próximo slide
function moveToNextSlide() {
    if (slideIndex < totalItems / 3 - 1) {
        slideIndex++;
    } else {
        slideIndex = 0;
    }
    updateCarrossel();
}

// Função para mover o carrossel para o slide anterior
function moveToPreviousSlide() {
    if (slideIndex > 0) {
        slideIndex--; // Permite voltar para o slide anterior apenas se não estiver na primeira imagem
    }
    updateCarrossel();
}

// Inicializa as bolinhas e a navegação
ajustarBolinhas();

// Reajusta as bolinhas quando a janela for redimensionada
window.addEventListener('resize', ajustarBolinhas);

// Adiciona funcionalidade para as setas
setas.forEach(seta => {
    seta.addEventListener('click', (e) => {
        if (e.target.closest('.esquerda') && slideIndex > 0) {
            moveToPreviousSlide();  // A seta esquerda só move o carrossel se não estiver na primeira imagem
        } else if (e.target.closest('.direita')) {
            moveToNextSlide();  // A seta direita sempre move o carrossel
        }
    });
});
