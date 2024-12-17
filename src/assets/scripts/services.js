document.addEventListener('DOMContentLoaded', () => {
    const serviceButtons = document.querySelectorAll('.services__nav button');
    const cleaningTypes = document.querySelectorAll('.services__cleaning > li');
    const includedServicesList = document.getElementById('included-services');
    const maxVisibleItems = 3; // Limite inicial de itens visíveis
    let expanded = false; // Estado inicial do botão

    // Dados de serviços inclusos para cada tipo de limpeza
    const includedServicesData = {
        "deep-cleaning": ["Dusting all surfaces", "Vacuuming carpets and rugs", "Mopping floors", "Cleaning kitchen appliances"],
        "carpet-cleaning": ["Vacuuming carpets", "Spot treatment for stains", "Steam cleaning", "Odor removal"],
        "window-cleaning": ["Washing interior windows", "Washing exterior windows", "Removing streaks", "Polishing window sills"],
        "office-cleaning": ["Sanitizing desks", "Emptying trash bins", "Vacuuming common areas", "Restocking supplies"]
    };

    // Função para atualizar a lista de serviços inclusos
    const updateIncludedServices = (includedServices) => {
        includedServicesList.innerHTML = includedServices
            .map((service, index) => 
                `<li class="${index >= maxVisibleItems ? 'hidden' : ''}">${service}</li>`
            )
            .join('');

        // Adiciona o botão "View More/Less"
        if (includedServices.length > maxVisibleItems) {
            const viewMoreButton = document.createElement('button');
            viewMoreButton.textContent = "View More";
            viewMoreButton.className = "button button--small link";
            viewMoreButton.addEventListener('click', () => toggleViewMore(includedServices));
            includedServicesList.appendChild(viewMoreButton);
        }
    };

    // Função para exibir/ocultar itens excedentes
    const toggleViewMore = (includedServices) => {
        expanded = !expanded;
        const allItems = includedServicesList.querySelectorAll('li');
        allItems.forEach((item, index) => {
            item.classList.toggle('hidden', !expanded && index >= maxVisibleItems);
        });

        const button = includedServicesList.querySelector('.link');
        button.textContent = expanded ? "View Less" : "View More";
    };

    // Função para atualizar o conteúdo exibido
    const updateDisplayedService = (selectedService) => {
        // Atualiza os tipos de limpeza visíveis
        cleaningTypes.forEach(type => {
            type.hidden = type.dataset.service !== selectedService;
        });

        // Atualiza os serviços inclusos
        const includedServices = includedServicesData[selectedService] || [];
        updateIncludedServices(includedServices);
    };

    // Adiciona evento de clique aos botões de navegação
    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedService = button.dataset.service;
            updateDisplayedService(selectedService);
        });
    });

    // Define o serviço padrão exibido ao carregar a página
    const defaultService = serviceButtons[0].dataset.service;
    updateDisplayedService(defaultService);
});
