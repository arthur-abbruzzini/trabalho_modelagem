let lote = document.getElementById("lote")

lote.addEventListener("click", ()=>{
    
fetch('https://dummyjson.com/user')
.then(resp => resp.json())
.then(dados =>{
    console.log(dados.users)

    dados.users.forEach(dad => {
        console.log('Primeiro nome = ', dad.address.state)  
        const valores = {
            nome: dad.firstName,
            sobrenome: dad.lastName,
            idade: dad.age,
            email: dad.email,
            telefone: dad.phone,
            endereco: dad.address.address,
            cidade: dad.address.city,
            estado: dad.address.state,
            nascimento: dad.birthDate
        }
    
        fetch(`http://localhost:3000/usuario`,{
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(valores)
        })
        .then(resp => resp.body)
        .then()
        .catch((err)=>{
            console.error('Erro ao buscar os dados',err)
        })
    })


})
.catch((err)=>{
    console.error('Erro ao buscar os dados',err)
})
})