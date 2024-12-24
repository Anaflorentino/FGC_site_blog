function showErrorToast(message) {
    Toastify({
        text: message,
        duration: 3000, // Duração em milissegundos
        close: true,
        gravity: "top", // "top" ou "bottom"
        position: "right", // "left", "center" ou "right"
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // Cor vermelha para erros
        stopOnFocus: true // Previne o desaparecimento automático quando o toast é focado
    }).showToast();
}
