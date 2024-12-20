async function fetchUserInfo(userId) {
  const userInfoUrl = "https://flashguyscleaning.com/version-test/api/1.1/wf/userinfo";
  const userInfoPayload = { id: userId };

  try {
    const response = await fetch(userInfoUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfoPayload)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "success" && data.response) {
      return data.response;
    } else {
      throw new Error("Invalid user info response");
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}

async function checkAuth() {
  const authContainer = document.getElementById("authContainer");
  const dashboardButton = document.getElementById("dashboardButton"); // Referência ao botão "Dashboard"
  const userId = localStorage.getItem("user_id");

  if (userId) {
    const userInfo = await fetchUserInfo(userId);

    if (userInfo) {
      const userInitial = userInfo.nome.charAt(0).toUpperCase();
      const userPhoto = userInfo.photo || null;

      authContainer.innerHTML = `
        <div id="profileDropdown">
          <div class="profile-button" id="profileButton">
            ${userPhoto ? `<img src="${userPhoto}" alt="Profile Photo">` : userInitial}
          </div>
          <div><span><button id="profileButton"><img src="../assets/images/icons/outline/arrow-down.svg" alt="Arrow-down icon"></button></span></div>
          <div class="dropdown" id="dropdownMenu">
            <div id="user-name">${userInfo.nome}</div>
            <div id="user-email">${userInfo.email}</div>
            <div class="dropdownDivider"></div>
            <button id="profileButton"><img src="../assets/images/icons/outline/profile.svg" alt="Profile icon">Profile</button>
            <button id="cleaningsButton"><img src="../assets/images/icons/outline/cleanings.svg" alt="Calendar icon">Cleanings</button>
            <div class="dropdownDivider"></div>
            <button id="helpButton"><img src="../assets/images/icons/outline/help.svg" alt="Help icon">Help</button>
            <button id="logoutButton"><img src="../assets/images/icons/outline/logout.svg" alt="Logout icon">Logout</button>
          </div>
        </div>
      `;

      const profileButton = document.getElementById("profileDropdown");
      const dropdownMenu = document.getElementById("dropdownMenu");

      profileButton.addEventListener("click", () => {
        dropdownMenu.classList.toggle("visible");
      });

      const logoutButton = document.getElementById("logoutButton");
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("user_id");
        checkAuth();
      });

      // Exibe o botão "Dashboard" quando o usuário está logado
      dashboardButton.style.display = "inline-block"; // Mostra o botão Dashboard
    } else {
      localStorage.removeItem("user_id");
      checkAuth();
    }
  } else {
    authContainer.innerHTML = `
      <button id="loginButton" class="button button--secondary button--small">Log In</button>
      <button id="signupButton" class="button button--tertiary button--small">Sign Up</button>
    `;

    document.getElementById("loginButton").addEventListener("click", () => {
      document.getElementById("loginModal").classList.add("visible");
    });

    document.getElementById("signupButton").addEventListener("click", () => {
      document.getElementById("signupModal").classList.add("visible");
    });

    // Oculta o botão "Dashboard" quando o usuário não está logado
    dashboardButton.style.display = "none"; // Esconde o botão Dashboard
  }
}

// Login normal
document.getElementById("modalLoginButton").addEventListener("click", async () => {
  const email = document.getElementById("modalEmail").value;
  const password = document.getElementById("modalPassword").value;

  const loginUrl = "https://flashguyscleaning.com/version-test/api/1.1/wf/auth";
  const loginPayload = {
    email: email,
    senha: password
  };

  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginPayload)
    });

    const data = await response.json();
    if (data.status === "success" && data.response) {
      localStorage.setItem("user_id", data.response.user_id);
      document.getElementById("loginModal").classList.remove("visible");
      resetModalInputs("loginModal");
      checkAuth();
    } else {
      alert("Login failed.");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
});

// Signup normal
document.getElementById("signupModalButton").addEventListener("click", async () => {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const phone = document.getElementById("signupPhone").value;
  const password = document.getElementById("signupPassword").value;

  const signupUrl = "https://flashguyscleaning.com/version-test/api/1.1/wf/auth";
  const signupPayload = {
    email: email,
    senha: password,
    name: name,
    phone: phone
  };

  try {
    const response = await fetch(signupUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signupPayload)
    });

    const data = await response.json();
    if (data.status === "success" && data.response) {
      localStorage.setItem("user_id", data.response.user_id);
      document.getElementById("signupModal").classList.remove("visible");
      resetModalInputs("signupModal");
      checkAuth();
    } else {
      alert("Sign up failed.");
    }
  } catch (error) {
    console.error("Sign up error:", error);
  }
});

// Login com Google (redireciona para a página do Bubble)
document.getElementById("googleLoginButton").addEventListener("click", () => {
  window.location.href = "https://flashguyscleaning.com/version-test/google_login";
});

// Signup com Google (usa a mesma página - no Bubble você define se faz signup/login)
document.getElementById("googleSignupButton").addEventListener("click", () => {
  window.location.href = "https://flashguyscleaning.com/version-test/google_login";
});

function resetModalInputs(modalId) {
  const modal = document.getElementById(modalId);
  const inputs = modal.querySelectorAll("input");
  inputs.forEach(input => input.value = "");
}

document.getElementById("loginModal").addEventListener("click", (e) => {
  if (e.target.id === "loginModal") {
    document.getElementById("loginModal").classList.remove("visible");
    resetModalInputs("loginModal");
  }
});

document.getElementById("signupModal").addEventListener("click", (e) => {
  if (e.target.id === "signupModal") {
    document.getElementById("signupModal").classList.remove("visible");
    resetModalInputs("signupModal");
  }
});

// Se ao retornar do Bubble o user_id vier na URL, salvá-lo e atualizar
const urlParams = new URLSearchParams(window.location.search);
const returnedUserId = urlParams.get('user_id');
if (returnedUserId) {
  localStorage.setItem("user_id", returnedUserId);
  // Remove o parâmetro da URL para não poluir
  history.replaceState(null, '', window.location.pathname);
}

checkAuth();

// Seleciona o ícone do menu, a lista de links e o span do ícone
const menuIcon = document.getElementById("menu");
const navLinks = document.querySelector(".nav-list-links");
const menuIconSpan = menuIcon.querySelector("span");

// Adiciona um evento de clique no ícone do menu
menuIcon.addEventListener("click", function(event) {
  // Previne que o clique no menu icon feche o menu logo após a abertura
  event.stopPropagation();
  
  // Alterna a classe "active" para mostrar/ocultar os links
  navLinks.classList.toggle("active");

  // Altera o ícone para 'close' ou 'menu' baseado no estado do menu
  if (navLinks.classList.contains("active")) {
    menuIconSpan.textContent = "close"; // Exibe o ícone de 'X' quando o menu está aberto
  } else {
    menuIconSpan.textContent = "menu"; // Volta para o ícone de menu quando o menu está fechado
  }
});

// Adiciona um evento de clique em qualquer parte do documento
document.addEventListener("click", function(event) {
  // Verifica se o clique foi fora do menu e do ícone do menu
  if (!navLinks.contains(event.target) && !menuIcon.contains(event.target)) {
    // Se foi fora, esconde o menu
    navLinks.classList.remove("active");

    // Restaura o ícone para 'menu'
    menuIconSpan.textContent = "menu"; // Exibe novamente o ícone de menu
  }
});

