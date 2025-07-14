let res = document.getElementById('res');
let btnApagar = document.getElementById('btnApagar');

btnApagar.addEventListener('click', () => {
  let id = Number(document.getElementById('id').value);
  res.innerHTML = '';

  fetch(`http://localhost:3000/usuario/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(resp => {
      if (resp.status === 200) {
        res.innerHTML = 'Dados apagados com sucesso!';
      } else if (resp.status === 404) {
        res.innerHTML = 'Cliente não encontrado!';
      } else {
        res.innerHTML = 'Erro ao apagar os dados.';
      }
    })
    .catch((err) => {
      console.error('Erro ao apagar os dados', err);
      res.innerHTML = 'Erro ao se comunicar com o servidor.';
    });
});
