document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const mensagem = document.getElementById("mensagem");
  const submitBtn = document.querySelector(".submit-btn");

  // Limpar mensagens anteriores
  mensagem.className = "message";
  mensagem.textContent = "";

  if (!email || !senha) {
    showMessage("Preencha todos os campos.", "error");
    return;
  }

  // Validação básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage("Por favor, insira um email válido.", "error");
    return;
  }

  // Desabilitar botão e mostrar loading
  submitBtn.disabled = true;
  submitBtn.textContent = "Entrando...";

  // Referência para o nó "usuarios" no banco
  const usuariosRef = firebase.database().ref("usuarios");

  // Buscar usuário pelo email
  usuariosRef.orderByChild("email").equalTo(email).once("value")
    .then((snapshot) => {
      if (!snapshot.exists()) {
        showMessage("Email não encontrado. Verifique seus dados ou crie uma conta.", "error");
        resetButton();
        return;
      }

      // Verificar se existe usuário com email e senha correspondentes
      let usuarioEncontrado = false;
      snapshot.forEach((userSnapshot) => {
        const userData = userSnapshot.val();
        if (userData.email === email && userData.senha === senha) {
          usuarioEncontrado = true;
          
          // Login bem-sucedido
          showMessage("🎉 Login realizado com sucesso! Bem-vindo de volta!", "success");
          document.getElementById("formLogin").reset();
          
          // Opcional: salvar dados do usuário (sem a senha)
          const userSession = {
            id: userSnapshot.key,
            email: userData.email,
            dataCriacao: userData.dataCriacao
          };
          
          // Opcional: armazenar no sessionStorage
          // sessionStorage.setItem('user', JSON.stringify(userSession));
          
          // Opcional: redirecionar após alguns segundos
          setTimeout(() => {
            // window.location.href = "dashboard.html"; // ou página inicial
          }, 2000);
        }
      });

      if (!usuarioEncontrado) {
        showMessage("Senha incorreta. Tente novamente.", "error");
      }
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error);
      showMessage("Erro ao fazer login. Tente novamente.", "error");
    })
    .finally(() => {
      resetButton();
    });

  function showMessage(text, type) {
    mensagem.textContent = text;
    mensagem.className = `message ${type} show`;
  }

  function resetButton() {
    submitBtn.disabled = false;
    submitBtn.textContent = "Entrar";
  }
});