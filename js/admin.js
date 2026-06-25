const listaCores = [];

const botaoAdicionar = document.querySelector("#adicionarCor");

const lista = document.querySelector("#listaCores");

const inputCor = document.querySelector("#cor");

const inputImagem = document.querySelector("#imagem");

botaoAdicionar.addEventListener("click", () => {
  const cor = inputCor.value.trim();

  const imagem = inputImagem.files[0];

  if (cor === "" || !imagem) {
    alert("Preencha a cor e escolha uma imagem.");

    return;
  }

  listaCores.push({
    cor,

    imagem,
  });

  atualizarLista();

  inputCor.value = "";

  inputImagem.value = "";
});

function atualizarLista() {
  lista.innerHTML = "";

  listaCores.forEach((item, index) => {
    lista.innerHTML += `

            <div class="cor-item">

                <strong>${item.cor}</strong>

                <span>${item.imagem.name}</span>

            </div>

        `;
  });
}
