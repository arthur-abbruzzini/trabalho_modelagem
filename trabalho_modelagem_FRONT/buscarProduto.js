const resProduto = document.getElementById('resProduto');
const btnBuscaProdutoId = document.getElementById('btnBuscaProdutoId');
const btnBuscaProdutoNome = document.getElementById('btnBuscaProdutoNome');

// Buscar produto por ID
btnBuscaProdutoId.addEventListener('click', async () => {
  const id = document.getElementById('buscaProdutoId').value.trim();
  resProduto.innerHTML = '';

  if (!id) {
    resProduto.innerHTML = '<p style="color:orange">Informe um ID para buscar.</p>';
    return;
  }

  resProduto.innerHTML = '<p>Buscando produto por ID...</p>';

  try {
    const resp = await fetch(`http://localhost:3000/produto/id/${encodeURIComponent(id)}`);
    if (!resp.ok) throw new Error('Produto não encontrado');
    const produto = await resp.json();

    resProduto.innerHTML = `
      <h2>Produto Encontrado</h2>
      <p><strong>Nome:</strong> ${produto.titulo}</p>
      <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
      <p><strong>Descrição:</strong> ${produto.descricao || 'Sem descrição'}</p>
    `;
  } catch (err) {
    console.error('Erro ao buscar produto por ID:', err);
    resProduto.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
});

// Buscar produto por nome
btnBuscaProdutoNome.addEventListener('click', async () => {
  const nome = document.getElementById('buscaProdutoNome').value.trim();
  resProduto.innerHTML = '';

  if (!nome) {
    resProduto.innerHTML = '<p style="color:orange">Informe um nome para buscar.</p>';
    return;
  }

  resProduto.innerHTML = '<p>Buscando produtos por nome...</p>';

  try {
    const resp = await fetch(`http://localhost:3000/produto/nome/${encodeURIComponent(nome)}`);
    if (!resp.ok) throw new Error('Erro ao buscar produtos');
    const produtos = await resp.json();

    if (!Array.isArray(produtos) || produtos.length === 0) {
      resProduto.innerHTML = '<p>Nenhum produto encontrado com esse nome.</p>';
      return;
    }

    let html = '<h2>Produtos Encontrados</h2><ul>';
    produtos.forEach(prod => {
      html += `
        <li>
          <strong>${prod.titulo}</strong> - R$ ${prod.preco.toFixed(2)}<br>
          ${prod.descricao || 'Sem descrição'}
        </li>
      `;
    });
    html += '</ul>';

    resProduto.innerHTML = html;
  } catch (err) {
    console.error('Erro ao buscar produto por nome:', err);
    resProduto.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
});
