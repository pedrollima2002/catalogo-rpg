const areaRelacionados = document.querySelector("#relacionados");

const tituloRelacionados = document.querySelector("#titulo-relacionados");

const parametros = new URLSearchParams(window.location.search);

const areaProduto = document.querySelector("#produto");

const id = parametros.get("id");

console.log(id);

fetch("data/produtos.json")
  .then((resposta) => resposta.json())
  .then((produtos) => {
    const produto = produtos.find((produto) => produto.id == id);

    const imagemPrincipal = produto.variacoes[0].imagem;

    const relacionados = produtos.filter(
      (item) => item.categoria === produto.categoria && item.id != produto.id,
    );

    if (relacionados.length === 0) {
      tituloRelacionados.style.display = "none";
    }

    console.log(id);
    console.log(produto);

    areaProduto.innerHTML = `    
   <img id="foto-principal" src="${imagemPrincipal}" alt="${produto.nome}">

    <div id="miniaturas"></div>

    <h1>${produto.nome}</h1>

    <p>Categoria: ${produto.categoria}</p>

    <p class="preco">R$ ${produto.preco}</p>

    <a
        href="https://wa.me/5581981225524?text=${encodeURIComponent(`Olá! Tenho interesse na peça ${produto.nome}`)}"
        target="_blank"
    >
        <button>Tenho Interesse</button>
    </a>

    <br><br>

    <a href="index.html" class="voltar">
    ← Voltar ao catálogo
</a>

`;

    const miniaturas = document.querySelector("#miniaturas");
    const fotoPrincipal = document.querySelector("#foto-principal");
    for (const variacao of produto.variacoes) {
      miniaturas.innerHTML += `
    <img
      class="miniatura"
      src="${variacao.imagem}"
      data-cor="${variacao.cor}"
      alt="${variacao.cor}"
    >
  `;
    }

    const todasMiniaturas = document.querySelectorAll(".miniatura");
    if (todasMiniaturas.length > 0) {
      todasMiniaturas[0].classList.add("miniatura-ativa");
    }

    for (const miniatura of todasMiniaturas) {
      miniatura.addEventListener("click", () => {
        fotoPrincipal.src = miniatura.src;

        todasMiniaturas.forEach((item) => {
          item.classList.remove("miniatura-ativa");
        });

        miniatura.classList.add("miniatura-ativa");
      });
    }

    for (const item of relacionados) {
      areaRelacionados.innerHTML += `

        <div class="produto">

            <img src="${item.imagem}" alt="${item.nome}">

            <h3>${item.nome}</h3>

            <p>R$ ${item.preco}</p>

            <a href="produto.html?id=${item.id}">
                <button>Ver Produto</button>
            </a>

        </div>

    `;
    }
  });
