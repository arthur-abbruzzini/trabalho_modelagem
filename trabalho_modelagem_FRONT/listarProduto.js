let res = document.getElementById('res');
let lisFab = document.getElementById('lisFab');

lisFab.addEventListener('click', () => {


  fetch('http://localhost:3000/produto') // ← rota correta para PRODUTO
    .then(resp => {
      if (!resp.ok) throw new Error('Erro na resposta do servidor');
      return resp.json();
    })
    .then(dados => {
      res.innerHTML = '';
      if (!Array.isArray(dados) || dados.length === 0) {
        res.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
      }

      dados.forEach(prod => {
        res.innerHTML += `
          <p><strong>ID:</strong> ${prod.id}</p>
          <p><strong>Título:</strong> ${prod.titulo}</p>
          <p><strong>Descrição:</strong> ${prod.descricao}</p>
          <p><strong>Categoria:</strong> ${prod.categoria}</p>
          <p><strong>Preço:</strong> R$ ${prod.preco}</p>
          <p><strong>Desconto:</strong> ${prod.desconto}%</p>
          <p><strong>Estoque:</strong> ${prod.estoque}</p>
          <p><strong>Marca:</strong> ${prod.marca}</p>
          <p><strong>Imagem:</strong> <a href="${prod.imagem}" target="_blank">Ver imagem</a></p>
          <hr>
        `;
      });
    })
    .catch(err => {
      console.error('Erro ao listar os produtos!', err);
      res.innerHTML = '<p style="color:red;">Erro ao listar os produtos.</p>';
    });
});
