document.getElementById('graf').addEventListener('click', async () => {
  const idInicio = document.getElementById('idInicio').value;
  const idFim = document.getElementById('idFim').value;

  try {
    const resposta = await fetch(`http://localhost:3000/produto/intervalo?idInicio=${idInicio}&idFim=${idFim}`);

    if (!resposta.ok) {
      throw new Error(`Erro na resposta do servidor: ${resposta.status}`);
    }

    const produtos = await resposta.json();

    if (!Array.isArray(produtos) || produtos.length === 0) {
      alert('Nenhum produto encontrado no intervalo informado.');
      return;
    }

    const labels = produtos.map(p => p.titulo);
    const dadosEstoque = produtos.map(p => p.estoque);

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
          label: 'Estoque',
          data: dadosEstoque,
          backgroundColor: 'rgba(54, 235, 54, 0.5)',
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
