let produtos = [];

const form = document.getElementById("formProduto");
const tabela = document.getElementById("tabelaProdutos");
const indiceEdicao = document.getElementById("indiceEdicao");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;

    if (indiceEdicao.value === "") {
        produtos.push({ nome, preco });
    } else {
        produtos[indiceEdicao.value] = { nome, preco };
        indiceEdicao.value = "";
    }

    form.reset();
    atualizarTabela();
});

function atualizarTabela() {
    tabela.innerHTML = "";

    produtos.forEach((produto, index) => {
        tabela.innerHTML += `
            <tr>
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco}</td>
                <td>
                    <button onclick="editarProduto(${index})">Editar</button>
                    <button onclick="apagarProduto(${index})">Apagar</button>
                </td>
            </tr>
        `;
    });
}

function editarProduto(index) {
    document.getElementById("nome").value = produtos[index].nome;
    document.getElementById("preco").value = produtos[index].preco;
    indiceEdicao.value = index;
}

function apagarProduto(index) {
    const confirmacao = confirm("Tem certeza que deseja apagar este item?");

    if (confirmacao) {
        produtos.splice(index, 1);
        atualizarTabela();
    }
}
