document.getElementById('cadCompra').addEventListener('click', async () => {
  const compra = {
    usuarioId: document.getElementById('usuarioId').value,
    produtoId: document.getElementById('produtoId').value,
    quantidade: document.getElementById('quantidade').value,
    precoUnitario: document.getElementById('precoUnitario').value,
    desconto: document.getElementById('desconto').value,
    formaPagamento: document.getElementById('formaPagamento').value,
    statusCompra: document.getElementById('statusCompra').value
  };

  try {
    const res = await fetch('http://localhost:3000/compra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(compra)
    });

    const data = await res.json();
    document.getElementById('res').innerText = 'Compra cadastrada com sucesso!';
  } catch (error) {
    document.getElementById('res').innerText = 'Erro ao cadastrar compra.';
    console.error(error);
  }
});
