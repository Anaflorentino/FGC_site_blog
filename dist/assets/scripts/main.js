import { testimonialsData } from './testimonialsData.js';
import { createTestimonialCard } from './testimonialsUtils.js';

// Função para abrir a modal
const openModal = (testimonial) => {
    const modal = document.getElementById('testimonial-modal');
    const modalBody = document.getElementById('modal-body');

    // Reutiliza o HTML do card gerado pela função createTestimonialCard
    modalBody.innerHTML = createTestimonialCard(testimonial);

    // Mostra a modal
    modal.classList.remove('hidden');
};

// Função para fechar a modal ao clicar fora do conteúdo
const closeModalOnOverlayClick = (e) => {
    const modalContent = document.querySelector('.modal-content');
    if (!modalContent.contains(e.target)) {
        document.getElementById('testimonial-modal').classList.add('hidden');
    }
};

// Adiciona evento para fechar modal ao clicar fora do conteúdo
document.getElementById('testimonial-modal').addEventListener('click', closeModalOnOverlayClick);

// Renderiza os cards e adiciona evento de clique
const renderTestimonials = () => {
    const container = document.getElementById('testimonials-container');
    container.innerHTML = testimonialsData.map((testimonial, index) => {
        const card = createTestimonialCard(testimonial);
        return `<div class="clickable-card" data-index="${index}">${card}</div>`;
    }).join("");

    // Adiciona evento de clique para abrir a modal
    document.querySelectorAll('.clickable-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const index = e.currentTarget.dataset.index;
            openModal(testimonialsData[index]);
        });
    });
};

// Inicializa a renderização
renderTestimonials();
