let res = document.getElementById('res');
let cadProduto = document.getElementById('cadProduto');

cadProduto.addEventListener('click', (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const categoria = document.getElementById('categoria').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const desconto = parseFloat(document.getElementById('desconto').value);
    const estoque = parseInt(document.getElementById('estoque').value);
    const marca = document.getElementById('marca').value;
    const imagem = document.getElementById('imagem').value;

    const dadosProduto = {
        titulo,
        descricao,
        categoria,
        preco,
        desconto,
        estoque,
        marca,
        imagem
    };

    res.innerHTML = '';

    fetch('http://localhost:3000/produto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosProduto)
    })
    .then(resp => resp.json())
    .then(dados => {
        res.innerHTML = `Produto <strong>${dados.titulo}</strong> cadastrado com sucesso!`;
    })
    .catch(err => {
        console.error('Erro ao cadastrar o produto!', err);
        res.innerHTML = 'Erro ao cadastrar o produto.';
    });
});
