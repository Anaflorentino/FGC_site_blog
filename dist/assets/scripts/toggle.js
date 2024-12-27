// const toggle = document.getElementById('pet-friendly-toggle');
// const toggleText = document.getElementById('pet-friendly-text');

// // Inicializa uma variável para manter o estado do toggle
// var isToggleActive = false;

// // Função para alternar o estado do toggle
// const toggleState = () => {
//     toggle.classList.toggle('active');
//     // Atualiza a variável de estado baseada na presença da classe 'active'
//     isToggleActive = toggle.classList.contains('active');
// };

// // Evento de clique no toggle
// toggle.addEventListener('click', toggleState);

// // Evento de clique no texto "Pet friendly"
// toggleText.addEventListener('click', toggleState);

// document.getElementById('btnFreeEstimate').addEventListener('click', function() {
//     const bedrooms = document.getElementById('dropdownBedroom').value;
//     const bathrooms = document.getElementById('dropdownBathroom').value;
//     const pets = isToggleActive ? 'yes' : 'no';
//     const url = `https://flashguyscleaning.com/version-test/schedule?bathroom=${bathrooms}&bedrooms=${bedrooms}&pets=${pets}`;
  
//     window.open(url, '_blank'); // Abre a URL em uma nova aba
    
//   });