let res = document.getElementById('res');
let btnAtualizar = document.getElementById('btnAtualizar');

btnAtualizar.addEventListener('click', (e) => {
  e.preventDefault();

  const id = Number(document.getElementById('id').value);
  const nome = document.getElementById('nome').value;
  const sobrenome = document.getElementById('sobrenome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const endereco = document.getElementById('endereco').value;
  const cidade = document.getElementById('cidade').value;
  const estado = document.getElementById('estado').value;
  const nascimento = document.getElementById('nascimento').value;

  const dadosCliente = {
    nome,
    sobrenome,
    email,
    telefone,
    endereco,
    cidade,
    estado,
    nascimento
  };

  res.innerHTML = '';

  fetch(`http://localhost:3000/usuario/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosCliente)
  })
    .then(resp => resp.json())
    .then(cliente => {
      res.innerHTML += `<strong>Cliente atualizado com sucesso:</strong><br>`;
    })
    .catch(err => {
      console.error('Erro ao atualizar cliente:', err);
      res.innerHTML = 'Erro ao atualizar cliente.';
    });
});
