class UserController{
    
    constructor(formId, tableId){
        this.form = document.getElementById(formId) 
        this.table = document.getElementById(tableId) 
        this.eventSubmit()
    }


    eventSubmit(){

        this.form.addEventListener("submit", (e)=>{
            e.preventDefault() 
            let values = this.getFormValues();
            this.getPhoto().then((content)=>{
                
                values.photo = content;
                this.addListLine(values);           
            
            }, (e)=>{
                
                console.error(e);
            
            })
        })

    }//Fechando a função que irá adicionar o evento de envio do formulário

    getPhoto(){

        return new Promise((resolve, reject)=>{

            let fileReader = new FileReader();
            let elements = [...this.form.elements].filter(item=>{
                if (item.name === 'photo'){
                    return item;
                }
            })
    
            let file = elements[0].files[0];
            fileReader.onload = ()=>{
    
                resolve(fileReader.result);
    
            }
    
            fileReader.onerror = (e)=>{
                reject(e);
            }

            fileReader.readAsDataURL(file);

        })

    }//Fechando função que interpreta a photo do formulário

    //Nessa função usamos o Spread para que uma coleção seja entendida como um array
    getFormValues(){

        let user = {};

        [...this.form.elements].forEach((field, index)=>{
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
        
        
    }//Fechando a função que irá pegar os valores dos campos do formulário e rotarna um JSON com eles

    addListLine(dataUser){

        this.table.innerHTML = `
        <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin}</td>
        <td>${dataUser.birth}</td>
        <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    `

    }

}