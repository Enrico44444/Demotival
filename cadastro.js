document.getElementById("formCadastro").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const mensagem = document.getElementById("mensagem");

  if (!email || !senha) {
    mensagem.style.color = "red";
    mensagem.textContent = "Preencha todos os campos.";
    return;
  }

  // Referência para o nó "usuarios" no banco
  const usuariosRef = firebase.database().ref("usuarios");

  // Cria um novo ID automático
  const novoUsuario = usuariosRef.push();

  novoUsuario.set({
    email: email,
    senha: senha
  })
  .then(() => {
    mensagem.style.color = "green";
    mensagem.textContent = "Conta criada com sucesso!";
    document.getElementById("formCadastro").reset();
  })
  .catch((error) => {
    mensagem.style.color = "red";
    mensagem.textContent = "Erro ao criar conta: " + error.message;
  });
});
