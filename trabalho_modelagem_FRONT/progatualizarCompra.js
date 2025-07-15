let res = document.getElementById('res');
let btnAtualizar = document.getElementById('btnAtualizar');

btnAtualizar.addEventListener('click', (e) => {
  e.preventDefault();

  const id = Number(document.getElementById('id').value);
  const usuarioId = Number(document.getElementById('usuarioId').value);
  const produtoId = Number(document.getElementById('produtoId').value);
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const precoUnitario = parseFloat(document.getElementById('precoUnitario').value);
  const desconto = parseFloat(document.getElementById('desconto').value);
  const formaPagamento = document.getElementById('formaPagamento').value;
  const statusCompra = document.getElementById('statusCompra').value;

  
  const precoComDesconto = precoUnitario * (1 - desconto / 100);
  const precoFinal = precoComDesconto * quantidade;

  const dadosCompra = {
    usuarioId,
    produtoId,
    quantidade,
    precoUnitario,
    desconto,
    precoFinal,
    formaPagamento,
    statusCompra
  };

  res.innerHTML = '';

  fetch(`http://localhost:3000/compra/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosCompra)
  })
    .then(resp => resp.json())
    .then(compra => {
      res.innerHTML = `<strong>Compra ID ${id} atualizada com sucesso!</strong><br>`;
    })
    .catch(err => {
      console.error('Erro ao atualizar compra:', err);
      res.innerHTML = 'Erro ao atualizar compra.';
    });
});
