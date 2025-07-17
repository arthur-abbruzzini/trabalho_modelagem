document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('estoque-critico');

  try {
    const response = await fetch('http://localhost:3000/produto/estoque/critico');
    if (!response.ok) throw new Error('Erro ao buscar estoque crítico');

    const produtos = await response.json();

    if (produtos.length === 0) {
      container.innerHTML = '<p>Todos os produtos têm estoque suficiente.</p>';
      return;
    }

    const tabela = document.createElement('table');
    tabela.innerHTML = `
      <thead>
        <tr>
          <th>Título</th>
          <th>Estoque</th>
          <th>Categoria</th>
        </tr>
      </thead>
      <tbody>
        ${produtos.map(prod => `
          <tr>
            <td>${prod.titulo}</td>
            <td>${prod.estoque}</td>
            <td>${prod.categoria}</td>
          </tr>
        `).join('')}
      </tbody>
    `;

    container.appendChild(tabela);
  } catch (error) {
    console.error('Erro ao carregar estoque crítico:', error);
    container.innerHTML = '<p>Erro ao carregar dados do servidor.</p>';
  }
});
