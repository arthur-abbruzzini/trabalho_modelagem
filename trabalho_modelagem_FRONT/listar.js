let res = document.getElementById('res');
let lisFab = document.getElementById('lisFab');

lisFab.addEventListener('click', () => {
  res.innerHTML = '<p>Carregando dados...</p>';

  fetch('http://localhost:3000/usuario') // CORRIGIDO AQUI
    .then(resp => {
      if (!resp.ok) throw new Error('Erro na resposta do servidor');
      return resp.json();
    })
    .then(dados => {
      res.innerHTML = '';
      if (!Array.isArray(dados) || dados.length === 0) {
        res.innerHTML = '<p>Nenhum usuário encontrado.</p>';
        return;
      }

      dados.forEach(dad => {
        res.innerHTML += `
          <p><strong>ID:</strong> ${dad.id}</p>
          <p><strong>Nome:</strong> ${dad.nome}</p>
          <p><strong>Sobrenome:</strong> ${dad.sobrenome}</p>
          <p><strong>Email:</strong> ${dad.email}</p>
          <hr>
        `;
      });
    })
    .catch(err => {
      console.error('Erro ao listar os usuários!', err);
      res.innerHTML = '<p style="color:red;">Erro ao listar os usuários.</p>';
    });
});
