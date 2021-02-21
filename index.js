var user = {}

//Trazendo todos os campos do formulário que contem um atributo "name"
var fields = document.querySelectorAll("#form-user-create [name]")
//Percorrendo os campos encontrados
fields.forEach((field, index)=>{

    if(field.name === "gender" && field.checked){
        user[field.name] = field.value
    }else{
        user[field.name] = field.value
    }

})

console.log(user)