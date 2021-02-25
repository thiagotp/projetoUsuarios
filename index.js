//Trazendo todos os campos do formulário que contem um atributo "name"
var fields = document.querySelectorAll("#form-user-create [name]")
var user = {}

//função que servirá para adicionar uma linha de exibição na lista de usuários
//o innerHTML serve para adicionar um texto html e esse texto será tratado como comando
function addLine(dataUser) {
    document.getElementById('table-users').innerHTML = `
        <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin}</td>
        <td>${dataUser.birth}</td>
        <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    `
    console.log(dataUser)
}

//Com o preventDefault eu cancelo a ação padrão do "submit" impedindo que ele atualize a página
document.getElementById('form-user-create').addEventListener("submit", (event) => {
    event.preventDefault();

    //Percorrendo os campos encontrados
    fields.forEach((field, index) => {

        if (field.name === "gender" && field.checked) {
            user[field.name] = field.value
        }
        if (field.name !== "gender") {
            user[field.name] = field.value
        }

    })
    //criando meu objeto do usuário
    var objectUser = new User(
        user.name,
        user.gender,
        user.birth,
        user.country,
        user.email,
        user.password,
        user.photo,
        user.admin
        )
    addLine(objectUser)
})
