document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const mensagem = document.getElementById("mensagem");

  const usuariosRef = firebase.database().ref("usuarios");

  usuariosRef.once("value").then(function (snapshot) {
    let encontrado = false;

    snapshot.forEach(function (childSnapshot) {
      const usuario = childSnapshot.val();
      if (usuario.email === email && usuario.senha === senha) {
        encontrado = true;
      }
    });

    if (encontrado) {
      mensagem.style.color = "green";
      mensagem.textContent = "Login realizado com sucesso!";
    } else {
      mensagem.style.color = "red";
      mensagem.textContent = "Email ou senha incorretos.";
    }
  });
});
