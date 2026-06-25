let produtos = [];

let quantidadeExibida = 12;

const listaProdutos = document.querySelector(".produtos");

const pesquisa = document.querySelector("#pesquisa");

const areaFiltros = document.querySelector(".filtros");

const botaoCarregarMais = document.querySelector("#carregarMais");

botaoCarregarMais.addEventListener("click", () => {
  quantidadeExibida += 12;

  mostrarProdutos(produtos);
});

function mostrarProdutos(lista) {
  listaProdutos.innerHTML = "";

  const produtosExibidos = lista.slice(0, quantidadeExibida);

  for (const produto of produtosExibidos) {
    listaProdutos.innerHTML += `
            <div class="produto">

                <img src="${produto.variacoes[0].imagem}" alt="${produto.nome}">

                <h2>${produto.nome}</h2>

                <p>${produto.categoria}</p>

                <p>R$ ${produto.preco}</p>

                <a href="produto.html?id=${produto.id}">
                    <button>Ver Produto</button>
                </a>

                <a
                    href="https://wa.me/5581981225524?text=${encodeURIComponent(`Olá, tenho interesse na ${produto.nome}`)}"
                    target="_blank"
                >
                    <button>Tenho Interesse</button>
                </a>

            </div>
        `;
  }

  if (quantidadeExibida >= lista.length) {
    botaoCarregarMais.style.display = "none";
  } else {
    botaoCarregarMais.style.display = "inline-block";
  }
}

pesquisa.addEventListener("input", () => {
  const textoDigitado = pesquisa.value.toLowerCase();

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(textoDigitado),
  );

  quantidadeExibida = 12;

  mostrarProdutos(produtosFiltrados);
});

function filtrarCategoria(categoria) {
  const produtosFiltrados = produtos.filter(
    (produto) => produto.categoria === categoria,
  );

  quantidadeExibida = 12;

  mostrarProdutos(produtosFiltrados);
}

function criarFiltros() {
  const categorias = produtos.map((produto) => produto.categoria);

  const categoriasUnicas = [...new Set(categorias)];

  areaFiltros.innerHTML = `
    <button id="todos">
        Todos
    </button>
`;

  for (const categoria of categoriasUnicas) {
    areaFiltros.innerHTML += `
        <button data-categoria="${categoria}">
            ${categoria}
        </button>
    `;

    const botoes = document.querySelectorAll(".filtros button");

    for (const botao of botoes) {
      botao.addEventListener("click", () => {
        for (const outroBotao of botoes) {
          outroBotao.classList.remove("filtro-ativo");
        }
        botao.classList.add("filtro-ativo");
        const categoria = botao.textContent.trim();

        if (categoria === "Todos") {
          mostrarProdutos(produtos);
        } else {
          filtrarCategoria(categoria);
        }

        console.log(categoria);
      });
    }

    console.log(botoes);
  }

  console.log(categoriasUnicas);
}

fetch("data/produtos.json")
  .then((resposta) => resposta.json())
  .then((dados) => {
    produtos = dados;

    mostrarProdutos(produtos);

    criarFiltros();
  });
