// Seleciona todos os botões do acordeão
const accordionButtons = document.querySelectorAll('.accordion__button');

// Função para alternar a visibilidade do conteúdo e os ícones
accordionButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Seleciona o conteúdo e o ícone relacionado ao botão clicado
    const content = this.nextElementSibling;
    const icon = this.querySelector('.material-symbols-rounded');
    
    // Fecha todos os outros conteúdos
    accordionButtons.forEach(otherButton => {
      if (otherButton !== button) {
        const otherContent = otherButton.nextElementSibling;
        const otherIcon = otherButton.querySelector('.material-symbols-rounded');
        
        // Fecha o conteúdo e reseta o ícone e border-radius
        otherContent.style.display = 'none';
        otherIcon.textContent = 'add';
        otherIcon.style.color = ''; // Reseta a cor do ícone
        otherButton.classList.remove('open');
      }
    });

    // Alterna a visibilidade do conteúdo e os ícones do botão clicado
    if (content.style.display === 'block') {
      content.style.display = 'none';  // Fecha o conteúdo
      icon.textContent = 'add';  // Substitui o ícone 'remove' por 'add'
      icon.style.color = ''; // Reseta a cor do ícone
      this.classList.remove('open');  // Remove a classe 'open', revertendo o border-radius
    } else {
      content.style.display = 'block';  // Abre o conteúdo
      icon.textContent = 'remove';  // Substitui o ícone 'add' por 'remove'
      icon.style.color = '#344051';  // Muda a cor do ícone para preto
      this.classList.add('open');  // Adiciona a classe 'open', alterando o border-radius
    }
  });
});
