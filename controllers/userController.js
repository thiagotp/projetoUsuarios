class UserController{
    
    constructor(formId){
        this.form = document.getElementById(formId)
    }

    getFormValues(){

        let user = {}

        this.form.elements.forEach((field, index)=>{
            if (field.name === "gender" && field.checked) {
                user[field.name] = field.value
            }
            if (field.name !== "gender") {
                user[field.name] = field.value
            }
        })

        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        )     
        
    }//Fechando a função de que pega os valores dos campos do formulário e rotarna um JSON com eles

}