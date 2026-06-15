const parametros = new URLSearchParams(window.location.search);

const areaProduto = document.querySelector("#produto");

const id = parametros.get("id");

console.log(id);

fetch("produtos.json")
    .then(resposta => resposta.json())
    .then(produtos => {

        const produto = produtos.find(produto =>
            produto.id == id
        );

        console.log(id);
        console.log(produto);

        areaProduto.innerHTML = `
                <div class="produto-detalhe">
            <img src="${produto.imagem}" alt="${produto.nome}">

            <h1>${produto.nome}</h1>

            <p>Categoria: ${produto.categoria}</p>

            <p>R$ ${produto.preco}</p>
            <a
                href="https://wa.me/5581981225524?text=${encodeURIComponent(`Olá, tenho interesse na ${produto.nome}`)}"
                target="_blank"
            >
                <button>Tenho Interesse</button>
            </a>
            <a href="index.html">
    <button>Voltar ao Catálogo</button>
</a>
          </div>
          `;
       

    });
           

    