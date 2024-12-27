// Função para gerar estrelas
export const createStars = (rating) => {
    const totalStars = 5; // Definimos 5 estrelas como o total máximo
    let starsHTML = "";

    // Adiciona as estrelas cheias (preenchidas)
    for (let i = 0; i < rating; i++) {
        starsHTML += `<span class="material-symbols-rounded fill full">star</span>`;
    }

    // Adiciona as estrelas vazias com cor suave
    for (let i = rating; i < totalStars; i++) {
        starsHTML += `<span class="material-symbols-rounded fill empty">star</span>`;
    }

    return starsHTML;
};

// Função para gerar uma cor aleatória
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// Função para gerar o HTML dos cards
export const createTestimonialCard = (data) => {
    const circleColor = getRandomColor(); // Gera a cor aleatória para o círculo

    // Condições para ocultar campos vazios
    const hasComment = data.comment && data.comment.trim() !== '';
    const hasPlatform = data.platform && data.platform.trim() !== '';
    const hasPictures = data.pictures && data.pictures.length > 0;
    const hasReply = data.reply && data.reply.message && data.reply.message.trim() !== '';

    return `
        <article class="testimonials">
            <header class="testimonials__header">
                <div class="testimonials__header__initials" style="background-color: ${circleColor};">
                    <span>${data.name[0]}${data.name.split(" ")[1]?.[0] || ""}</span>
                </div>
                <div class="testimonials__header-wrapper">
                    <div class="testimonials__header__name-rate">
                        <h2>${data.name}</h2>
                        <div class="testimonials__header--rating">${createStars(data.rating)}</div>
                    </div>
                    <div class="testimonials__header__description">
                        ${hasPlatform ? `<span class="testimonials__header-details">${data.platform}</span>` : ""}
                        ${hasComment ? `<span class="testimonials__header-details">${data.date}</span>` : ""}
                    </div>
                </div>
            </header>
            ${hasComment ? `<p>${data.comment}</p>` : ""}
            ${hasPictures ? `
                <div class="testimonials__pictures">
                    ${data.pictures.map(pic => `<div class="testimonials__pictures__item"><img src="${pic}" alt="Testimonial picture"></div>`).join("")}
                </div>
            ` : ""}
            ${hasReply ? `
                <div class="testimonials__reply">
                    <div class="testimonials__reply__logo">
                        <img src="${data.reply.logo}" alt="Logo" width="32px">
                        <div>
                            <span class="material-symbols-rounded">reply</span>
                            <span>Answered</span>
                        </div>
                    </div>
                    <p>${data.reply.message}</p>
                </div>
            ` : ""}
        </article>
    `;
};

// Estilos CSS para as estrelas
const styles = `
    .material-symbols-rounded.full {
        color: gold; /* Cor das estrelas cheias */
        font-size: 18px; /* Ajuste o tamanho das estrelas */
    }
    .material-symbols-rounded.empty {
        color: lightgray; /* Cor das estrelas vazias */
        font-size: 18px; /* Ajuste o tamanho das estrelas */
    }
    .link {
        color: blue; /* Exemplo de cor para o link */
        text-decoration: none; /* Sem sublinhado */
        cursor: pointer; /* Aponta para o estilo de link */
    }
`;

document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);

// Função para ser chamada após inserir o card no DOM
export const setupCard = (data) => {
    const cardHTML = createTestimonialCard(data);
    document.body.insertAdjacentHTML('beforeend', cardHTML);
};
