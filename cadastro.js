document.getElementById("formCadastro").addEventListener("submit", function (e) {
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

  // Validação de senha (mínimo 6 caracteres)
  if (senha.length < 6) {
    showMessage("A senha deve ter pelo menos 6 caracteres.", "error");
    return;
  }

  // Desabilitar botão e mostrar loading
  submitBtn.disabled = true;
  submitBtn.textContent = "Criando conta...";

  // Referência para o nó "usuarios" no banco
  const usuariosRef = firebase.database().ref("usuarios");

  // Verificar se o email já existe
  usuariosRef.orderByChild("email").equalTo(email).once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        showMessage("Este email já está em uso. Tente fazer login.", "error");
        resetButton();
        return;
      }

      // Cria um novo ID automático
      const novoUsuario = usuariosRef.push();

      return novoUsuario.set({
        email: email,
        senha: senha,
        dataCriacao: new Date().toISOString(),
        ativo: true
      });
    })
    .then(() => {
      showMessage("🎉 Conta criada com sucesso! Bem-vindo ao Demotival!", "success");
      document.getElementById("formCadastro").reset();
      
      // Opcional: redirecionar após alguns segundos
      setTimeout(() => {
        // window.location.href = "login.html";
      }, 2000);
    })
    .catch((error) => {
      console.error("Erro ao criar conta:", error);
      showMessage("Erro ao criar conta. Tente novamente.", "error");
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
    submitBtn.textContent = "Cadastrar";
  }
});