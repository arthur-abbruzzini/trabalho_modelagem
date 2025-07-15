let res = document.getElementById('res');
let lisCompra = document.getElementById('lisCompra');

lisCompra.addEventListener('click', () => {


  fetch('http://localhost:3000/compra') // ← rota correta para COMPRA
    .then(resp => {
      if (!resp.ok) throw new Error('Erro na resposta do servidor');
      return resp.json();
    })
    .then(dados => {
      res.innerHTML = '';
      if (!Array.isArray(dados) || dados.length === 0) {
        res.innerHTML = '<p>Nenhuma compra encontrada.</p>';
        return;
      }

      dados.forEach(compra => {
        res.innerHTML += `
          <p><strong>ID:</strong> ${compra.id}</p>
          <p><strong>Usuário ID:</strong> ${compra.usuarioId}</p>
          <p><strong>Produto ID:</strong> ${compra.produtoId}</p>
          <p><strong>Quantidade:</strong> ${compra.quantidade}</p>
          <p><strong>Preço Unitário:</strong> R$ ${compra.precoUnitario}</p>
          <p><strong>Desconto:</strong> ${compra.desconto}</p>
          <p><strong>Preço Final:</strong> R$ ${compra.precoFinal}</p>
          <p><strong>Forma de Pagamento:</strong> ${compra.formaPagamento}</p>
          <p><strong>Status da Compra:</strong> ${compra.statusCompra}</p>
          <p><strong>Data da Compra:</strong> ${new Date(compra.dataCompra).toLocaleString()}</p>
          <hr>
        `;
      });
    })
    .catch(err => {
      console.error('Erro ao listar as compras!', err);
      res.innerHTML = '<p style="color:red;">Erro ao listar as compras.</p>';
    });
});
