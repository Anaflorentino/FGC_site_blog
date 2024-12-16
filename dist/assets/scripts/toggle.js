 // Adiciona a funcionalidade do toggle
 const toggle = document.getElementById('pet-friendly-toggle');
 const toggleText = document.getElementById('pet-friendly-text');
 
 // Função para alternar o estado do toggle
 const toggleState = () => {
     toggle.classList.toggle('active');
 };

 // Evento de clique no toggle
 toggle.addEventListener('click', toggleState);

 // Evento de clique no texto "Pet friendly"
 toggleText.addEventListener('click', toggleState);


 