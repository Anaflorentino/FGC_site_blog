// Função para exibir os warnings (mensagens de erro)
function showWarning(inputElement, warningSpan) {
  warningSpan.style.display = 'inline'; // Exibe o span com a mensagem de erro
  inputElement.classList.add('input-error'); // Adiciona uma classe para estilizar o campo com erro
}

// Função para ocultar os warnings
function hideWarning(inputElement, warningSpan) {
  warningSpan.style.display = 'none'; // Oculta o span com a mensagem de erro
  inputElement.classList.remove('input-error'); // Remove a classe de erro
}

// Função para validar o modal de login
document.getElementById("modalLoginButton").addEventListener("click", (event) => {
  const email = document.getElementById("modalEmail");
  const password = document.getElementById("modalPassword");
  const emailWarning = email.nextElementSibling; // O span de erro após o input de email
  const passwordWarning = password.nextElementSibling; // O span de erro após o input de senha

  let isValid = true;

  // Validação do email
  if (!email.value) {
    showWarning(email, emailWarning);
    isValid = false;
  } else {
    hideWarning(email, emailWarning);
  }

  // Validação da senha
  if (!password.value) {
    showWarning(password, passwordWarning);
    isValid = false;
  } else {
    hideWarning(password, passwordWarning);
  }

  // Se algum campo estiver inválido, evita o envio
  if (!isValid) {
    event.preventDefault(); // Impede o envio do formulário
  } else {
    // Se os campos estiverem válidos, prosseguir com o login
    loginUser(email.value, password.value);
  }
});

// Função para validar o modal de signup
document.getElementById("signupModalButton").addEventListener("click", (event) => {
  const name = document.getElementById("signupName");
  const email = document.getElementById("signupEmail");
  const phone = document.getElementById("signupPhone");
  const password = document.getElementById("signupPassword");

  const nameWarning = name.nextElementSibling;
  const emailWarning = email.nextElementSibling;
  const phoneWarning = phone.nextElementSibling;
  const passwordWarning = password.nextElementSibling;

  let isValid = true;

  // Validação do nome (verificando se há pelo menos dois nomes)
  const nameParts = name.value.trim().split(/\s+/); // Divida o nome por espaços em branco
  if (nameParts.length < 2) {
    showWarning(name, nameWarning); // Exibe o alerta se o nome tiver menos de 2 palavras
    isValid = false;
  } else {
    hideWarning(name, nameWarning); // Caso contrário, esconde o alerta
  }

  // Validação do email
  if (!email.value) {
    showWarning(email, emailWarning);
    isValid = false;
  } else {
    hideWarning(email, emailWarning);
  }

  // Validação do telefone
  if (!phone.value || phone.value.length < 10) {
    showWarning(phone, phoneWarning);
    isValid = false;
  } else {
    hideWarning(phone, phoneWarning);
  }

  // Validação da senha
  if (!password.value) {
    showWarning(password, passwordWarning);
    isValid = false;
  } else {
    hideWarning(password, passwordWarning);
  }

  // Se algum campo estiver inválido, evita o envio
  if (!isValid) {
    event.preventDefault(); // Impede o envio do formulário
  } else {
    // Se os campos estiverem válidos, prosseguir com o signup
    signupUser(name.value, email.value, phone.value, password.value);
  }
});

// Funções fictícias de login e signup (substitua pelo seu código real)
function loginUser(email, password) {
  console.log('Logando com', email, password);
  // Aqui você pode colocar o código de login (fetch, etc.)
}

function signupUser(name, email, phone, password) {
  console.log('Cadastrando com', name, email, phone, password);
  // Aqui você pode colocar o código de cadastro (fetch, etc.)
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
      console.log("Login failed.");
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
      console.log("Sign up failed.");
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

// Resetar os inputs do modal
function resetModalInputs(modalId) {
  const modal = document.getElementById(modalId);
  const inputs = modal.querySelectorAll("input");
  inputs.forEach(input => input.value = "");
}

// Fecha o modal ao clicar fora dele
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

// Função para verificar o status do usuário logado
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

// Função para buscar as informações do usuário
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

    const data = await response.json();
    return data.response || null;
  } catch (error) {
    console.error("Erro ao buscar informações do usuário:", error);
    return null;
  }
}
