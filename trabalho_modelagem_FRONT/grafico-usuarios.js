document.getElementById('graf').addEventListener('click', async () => {
  const idInicio = document.getElementById('idInicio').value;
  const idFim = document.getElementById('idFim').value;

  try {
    const resposta = await fetch(`http://localhost:3000/usuario/grafico/idade/intervalo?idInicio=${idInicio}&idFim=${idFim}`);

    if (!resposta.ok) {
      throw new Error(`Erro na resposta do servidor: ${resposta.status}`);
    }

    const usuarios = await resposta.json();

    if (!Array.isArray(usuarios) || usuarios.length === 0) {
      alert('Nenhum usuário encontrado no intervalo informado.');
      return;
    }

    const labels = usuarios.map(u => u.nomeCompleto);
    const dadosIdade = usuarios.map(u => u.idade);

    const ctx = document.getElementById('myChart').getContext('2d');

    // Destroi o gráfico anterior (se houver)
    if (window.myChartInstance) {
      window.myChartInstance.destroy();
    }

    // Cria novo gráfico
    window.myChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Idade dos Usuários',
          data: dadosIdade,
          backgroundColor: 'rgba(0, 255, 13, 0.5)',
          borderColor: 'rgb(0, 0, 0)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });

  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    alert('Erro ao buscar dados do servidor. Verifique se o back-end está rodando e a URL está correta.');
  }
});
