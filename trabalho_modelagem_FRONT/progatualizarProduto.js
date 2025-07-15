let res = document.getElementById('res');
let btnAtualizar = document.getElementById('btnAtualizar');

btnAtualizar.addEventListener('click', (e) => {
  e.preventDefault();

  const id = Number(document.getElementById('id').value);
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

  fetch(`http://localhost:3000/produto/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosProduto)
  })
    .then(resp => resp.json())
    .then(produto => {
      res.innerHTML = `<strong>Produto ID ${id} atualizado com sucesso!</strong><br>`;
    })
    .catch(err => {
      console.error('Erro ao atualizar produto:', err);
      res.innerHTML = 'Erro ao atualizar produto.';
    });
});
