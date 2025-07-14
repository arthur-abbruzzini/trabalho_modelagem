let res = document.getElementById('res');
let cadUsuario = document.getElementById('cadUsuario');

cadUsuario.addEventListener('click', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const idade = document.getElementById('idade').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const nascimento = document.getElementById('nascimento').value;

    const dadosCliente = {
        nome,
        sobrenome,
        idade,
        email,
        telefone,
        endereco,
        cidade,
        estado,
        nascimento
    };

    res.innerHTML = '';

    fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosCliente)
    })
    .then(resp => resp.json())
    .then(dados => {
        res.innerHTML = `Cliente ${dados.nome} cadastrado com sucesso!`;
    })
    .catch(err => {
        console.error('Erro ao cadastrar o cliente!', err);
        res.innerHTML = 'Erro ao cadastrar o cliente.';
    });
});
