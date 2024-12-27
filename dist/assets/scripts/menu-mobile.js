document.getElementById("navbarToggle").addEventListener("click", function () {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("open");
  });
  

  window.addEventListener('scroll', () => {
    console.log('Scroll position:', window.scrollY); // Exibe a posição da rolagem no console
  
    if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
      console.log('Navbar: Adicionado "scrolled"');
    } else {
      navbar.classList.remove('scrolled');
      console.log('Navbar: Removido "scrolled"');
    }
  });