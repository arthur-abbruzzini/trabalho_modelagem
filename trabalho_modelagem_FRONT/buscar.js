document.getElementById('btnBuscaId').addEventListener('click', async () => {
  const id = document.getElementById('buscaId').value;
  const resDiv = document.getElementById('res');
  resDiv.innerHTML = 'Buscando...';

  try {
    // ✅ Correção aqui: fetchfetch → fetch, e crase correta
   const response = await fetch(`http://localhost:3000/usuario/id/${id}`);
    if (!response.ok) throw new Error('Usuário não encontrado');
    const usuario = await response.json();

    resDiv.innerHTML = `
      <h2>Usuário Encontrado</h2>
      <p><strong>Nome:</strong> ${usuario.nome} ${usuario.sobrenome}</p>
      <p><strong>Email:</strong> ${usuario.email}</p>
      <p><strong>Idade:</strong> ${usuario.idade}</p>
    `;
  } catch (error) {
    resDiv.innerHTML = `<p style="color:red">${error.message}</p>`;
  }
});

document.getElementById('btnBuscaNome').addEventListener('click', async () => {
  const nome = document.getElementById('buscaNome').value;
  const resDiv = document.getElementById('res');
  resDiv.innerHTML = 'Buscando...';

  try {
    // ✅ Correção na URL: "api/usuario" → apenas "usuario" se for a mesma base
    const response = await fetch(`http://localhost:3000/usuario/nome/${nome}`);
    if (!response.ok) throw new Error('Usuários não encontrados');
    const usuarios = await response.json();

    if (usuarios.length === 0) {
      resDiv.innerHTML = `<p>Nenhum usuário encontrado.</p>`;
      return;
    }

    let html = '<h2>Usuários Encontrados</h2><ul>';
    usuarios.forEach(u => {
      html += `<li>${u.nome} ${u.sobrenome} - ${u.email}</li>`;
    });
    html += '</ul>';
    resDiv.innerHTML = html;
  } catch (error) {
    resDiv.innerHTML = `<p style="color:red">${error.message}</p>`;
  }
});
