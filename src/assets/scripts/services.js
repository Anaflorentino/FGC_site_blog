document.addEventListener('DOMContentLoaded', () => {
    const serviceButtons = document.querySelectorAll('.services__nav button');
    const serviceArticles = document.querySelectorAll('.services__cleaning li');

    // Conteúdo dinâmico para cada tipo de limpeza
    const servicesContent = {
        "deep-cleaning": [
            "Counter tops",
            "Sinks (clean & polish)",
            "Mirrors",
            "Clean/sanitize",
            "Toilets",
            "Vacuum and mopping the floor",
            "Tubs",
            "Showers",
            "Outside of cabinets and drawers",
            "Windows sills",
            "Baseboards",
            "Microwave",
            "Outside of appliances",
            "Fridge/oven (outside)",
            "Dusting",
            "Dishwashing",
            "Furniture",
            "Light switches",
            "Door knobs",
            "Light fixtures",
            "Hallways",
            "Staircases",
            "Table tops",
            "Electronics",
            "Making beds",
            "Clutter"
        ],
        "standard-cleaning": [
            "Counter tops",
            "Sinks (clean & polish)",
            "Mirrors",
            "Clean/sanitize",
            "Toilets",
            "Vacuum and mopping the floor",
            "Tubs",
            "Showers",
            "Microwave",
            "Outside of appliances",
            "Fridge/oven (outside)",
            "Dusting",
            "Furniture",
            "Outside of cabinets and drawers",
            "Hallways",
            "Staircases",
            "Table tops",
            "Electronics",
            "Making beds",
            "Clutter"
        ],
        "move-cleaning": [
            "Counter tops",
            "Sinks (clean & polish)",
            "Mirrors",
            "Clean/sanitize",
            "Toilets",
            "Vacuum and mopping the floor",
            "Tubs",
            "Showers",
            "Outside of cabinets and drawers",
            "Windows sills",
            "Baseboards",
            "Inside of cabinets and drawers",
            "Microwave",
            "Outside of appliances",
            "Fridge/oven (outside)",
            "Dusting",
            "Dishwashing",
            "Furniture",
            "Light switches",
            "Door knobs",
            "Light fixtures",
            "Fridge (inside)",
            "Oven (inside)",
            "Hallways",
            "Staircases",
            "Table tops",
            "Electronics",
            "Making beds",
            "Clutter"
        ],
        "carpets-cleaning": [
            "Vacuuming carpets",
            "Steam cleaning upholstery",
            "Spot cleaning stains"
        ],
        "extreme-cleaning": [
            "Counter tops",
            "Sinks (clean & polish)",
            "Mirrors",
            "Clean/sanitize",
            "Toilets",
            "Vacuum and mopping the floor",
            "Tubs",
            "Showers",
            "Outside of cabinets and drawers",
            "Windows sills",
            "Baseboards",
            "Inside of cabinets and drawers",
            "Microwave",
            "Outside of appliances",
            "Fridge/oven (outside)",
            "Dusting",
            "Dishwashing",
            "Furniture",
            "Light switches",
            "Door knobs",
            "Light fixtures",
            "Fridge (inside)",
            "Oven (inside)",
            "Hallways",
            "Staircases",
            "Table tops",
            "Electronics",
            "Making beds",
            "Clutter"
        ],
        "eco-friendly": [
            "Chemical-free floor and surface cleaners",
            "Non-toxic disinfectants",
            "Water-saving cleaning techniques"
        ],
        "hire-hour": [
            "Using green products",
            "Eco-friendly cleaning practices",
            "Low-impact techniques"
        ],
        "post-construction": [
            "Counter tops",
            "Sinks (clean & polish)",
            "Mirrors",
            "Clean/sanitize",
            "Toilets",
            "Vacuum and mopping the floor",
            "Tubs",
            "Showers",
            "Outside of cabinets and drawers",
            "Windows sills",
            "Baseboards",
            "Inside of cabinets and drawers",
            "Microwave",
            "Outside of appliances",
            "Fridge/oven (outside)",
            "Dusting",
            "Dishwashing",
            "Furniture",
            "Light switches",
            "Door knobs",
            "Light fixtures",
            "Fridge (inside)",
            "Oven (inside)",
            "Hallways",
            "Staircases",
            "Table tops",
            "Electronics",
            "Making beds",
            "Clutter"
        ],
        "commercial": [
            "Counter tops",
            "Sinks (clean & polish)",
            "Mirrors",
            "Clean/sanitize",
            "Toilets",
            "Vacuum and mopping the floor",
            "Tubs",
            "Showers",
            "Microwave",
            "Outside of appliances",
            "Fridge/oven (outside)",
            "Dusting",
            "Furniture",
            "Outside of cabinets and drawers",
            "Hallways",
            "Staircases",
            "Table tops",
            "Electronics",
            "Making beds",
            "Clutter"
        ],
        "air-bnb": [
            "Counter tops",
            "Sinks (clean & polish)",
            "Mirrors",
            "Clean/sanitize",
            "Toilets",
            "Vacuum and mopping the floor",
            "Tubs",
            "Showers",
            "Microwave",
            "Outside of appliances",
            "Fridge/oven (outside)",
            "Dusting",
            "Furniture",
            "Outside of cabinets and drawers",
            "Hallways",
            "Staircases",
            "Table tops",
            "Electronics",
            "Making beds",
            "Clutter"
        ]
    };
// Função para preencher o conteúdo dinâmico
function fillServiceContent(service) {
    const activeService = document.querySelector(`.services__cleaning li[data-service="${service}"]`);
    const serviceIncludedList = activeService.querySelector('.services__included ul');
    const viewMoreButton = activeService.querySelector('button');

    if (serviceIncludedList) {
        const items = servicesContent[service];

        // Concatenar os itens usando ' • ' como separador
        const itemsText = items.join(' • ');

        // Exibir apenas os 10 primeiros itens (usando ' • ' para concatenar)
        const visibleItemsText = items.slice(0, 10).join(' • ');

        // Inserir os itens concatenados formatados
        serviceIncludedList.innerHTML = `<li>${visibleItemsText}</li>`;

        // Se houver mais de 2 itens, mostrar o botão "View more"
        if (items.length > 2) {
            viewMoreButton.style.display = 'block'; // Exibe o botão "View more"

            // Remover o evento de clique anterior (caso já exista) para evitar múltiplos ouvintes
            viewMoreButton.removeEventListener('click', toggleView);

            // Adicionar evento de clique para mostrar todos os itens ou esconder
            viewMoreButton.addEventListener('click', toggleView);
        } else {
            viewMoreButton.style.display = 'none'; // Caso não haja mais de 2 itens, o botão fica escondido
        }
    }
}

// Função que alterna entre "View more" e "View less"
function toggleView(event) {
    const button = event.target;
    const activeService = button.closest('li');
    const serviceIncludedList = activeService.querySelector('.services__included ul');
    const items = servicesContent[activeService.dataset.service];

    const itemsText = items.join(' • ');
    const visibleItemsText = items.slice(0, 10).join(' • ');

    if (button.textContent === 'View more') {
        // Exibe todos os itens concatenados com ' • '
        serviceIncludedList.innerHTML = `<li>${itemsText}</li>`;
        button.textContent = 'View less'; // Muda o texto para 'View less'
    } else {
        // Volta para os dois primeiros itens concatenados com ' • '
        serviceIncludedList.innerHTML = `<li>${visibleItemsText}</li>`;
        button.textContent = 'View more'; // Muda o texto para 'View more'
    }
}


// Função para mostrar o serviço correspondente e esconder os outros
function showService(service) {
    serviceArticles.forEach(article => {
        if (article.dataset.service === service) {
            article.removeAttribute('hidden');
        } else {
            article.setAttribute('hidden', true);
        }
    });

    // Preencher o conteúdo dinâmico do serviço atual
    fillServiceContent(service);

    // Alterar a classe de hover para a tab ativa
    updateActiveTab(service);
}

// Função para alterar a classe da tab ativa
function updateActiveTab(service) {
    // Remover a classe 'active' de todas as tabs
    serviceButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Adicionar a classe 'active' à tab correspondente
    const activeButton = document.querySelector(`.services__nav button[data-service="${service}"]`);
    activeButton.classList.add('active');
}

// Adicionar evento de clique nos botões de navegação
serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const service = button.dataset.service;
        showService(service);
    });
});

// Inicializar mostrando o primeiro serviço visível (Deep Cleaning)
showService("deep-cleaning");
});