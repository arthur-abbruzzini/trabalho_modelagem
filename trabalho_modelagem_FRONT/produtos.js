let lote = document.getElementById("lote");

lote.addEventListener("click", () => {
  fetch('https://dummyjson.com/products') 
    .then(resp => resp.json())
    .then(dados => {
      console.log(dados.products);

      dados.products.forEach(prod => {
        const valores = {
          titulo: prod.title,
          descricao: prod.description,
          categoria: prod.category,
          preco: prod.price,
          desconto: prod.discountPercentage || 0, 
          estoque: prod.stock,
          marca: prod.brand,
          imagem: prod.thumbnail
        };

        fetch(`http://localhost:3000/produto`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(valores)
        })
        .then(result => {
          console.log('Produto cadastrado:', result);
        })
        .catch((err) => {
          console.error('Erro ao cadastrar o produto:', err);
        });
      });
    })
    .catch((err) => {
      console.error('Erro ao buscar os produtos:', err);
    });
});
