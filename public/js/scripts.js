const button = document.getElementById('button')

button.addEventListener('click', (event) => {
  event.preventDefault()

  //alert('botao acionado')

  const email = document.getElementById('email')
  const senha = document.getElementById('senha')

  if (usuario.value == '') {
    usuario.classList.add("errorInput")
  } else {
    usuario.classList.remove("errorInput")
  }

  if (senha.value == '') {
    senha.classList.add("errorInput")
  } else {
    senha.classList.remove("errorInput")
  }

  if (usuario.value.indexOf("@") == -1 || usuario.value.indexOf(".") == -1 || (usuario.value.indexOf(".") - usuario.value.indexOf("@") == 1)) {
    usuario.classList.add("errorInput")
  } else {
    usuario.classList.remove("errorInput")
  }

  if (!isNaN(usuario.value) == true && usuario.value.length == 11) {
    usuario.classList.remove("errorInput")
  }

  if (senha.value.length <= 5) {
    senha.classList.add("errorInput")
  } else {
    senha.classList.remove("errorInput")
  }

})

let btn = document.querySelector('.fa-eye')

btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha')

  if (inputSenha.getAttribute('type') == 'senha') {
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'senha')

  }
})

function entrar() {

  let usuario = document.querySelector("#usuario")
  let userLabel = document.querySelector("#userLabel")

  let senha = document.querySelector("#senha")
  let senhaLabel = document.querySelector("#senhaLabel")

  let msgError = document.querySelector("#msgError")
  let listUser = []

  let userValid = {
    nome: "",
    user: "",
    senha: ""
  }

  listaUser = JSON.parse(localStorage.getItem("listaUser"))

  listaUser.forEach((item) => {
    if (usuario.value == item.userCad && senha.value == item.senhaCad) {

      userValid = {
        nome: item.nomeCad,
        user: item.userCad,
        senha: item.senhaCad
      }

    }
  })

  //gera um time de 2 seg para poder ser redirecionado para a página linkada abaixo.

  if (usuario.value == userValid.user && senha.value == userValid.senha) {
    setTimeout(() => {
      window.location.href = "https://elegant-knuth-94245c.netlify.app/professor%20allocation/"
    }, 2000)
    let token = Ma.random().toString(16)

  } else {

    userLabel.setAttribute("style", "color: red")
    usuario.setAttribute("style", "border-color: red")
    senhaLabel.setAttribute("style", "color: red")
    senha.setAttribute("style", "border-color: red")

    msgError.setAttribute("style", "display: block")
    msgError.innerHTML = "Usuario ou senha incorretos"
    usuario.focus()

  }

}