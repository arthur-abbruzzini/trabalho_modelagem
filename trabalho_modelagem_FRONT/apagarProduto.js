const res = document.getElementById('res');
const btnApagar = document.getElementById('btnApagar');

btnApagar.addEventListener('click', () => {
  const id = document.getElementById('id').value;

  fetch(`http://localhost:3000/produto/${id}`, {
    method: 'DELETE'
  })
    .then(resp => {
      if (resp.ok) {
        res.textContent = 'Produto apagado com sucesso!';
      } else {
        res.textContent = 'Produto não encontrado ou erro ao apagar.';
      }
    })
    .catch(() => {
      res.textContent = 'Erro ao se conectar com o servidor.';
    });
});
