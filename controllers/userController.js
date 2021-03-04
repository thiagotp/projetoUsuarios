class UserController {

    constructor(formId, tableId) {
        this.form = document.getElementById(formId)
        this.table = document.getElementById(tableId)
        this.eventSubmit()
    }


    eventSubmit() {

        let btnSubmit = this.form.querySelector('[type=submit]')

        this.form.addEventListener("submit", (e) => {
            e.preventDefault()
            let values = this.getFormValues();
            if (!values) {

                btnSubmit.disabled = false;

            } else {

                btnSubmit.disabled = true;

            }
            this.getPhoto().then((content) => {

                values.photo = content;
                this.addListLine(values);
                this.form.reset();
                btnSubmit.disabled = false;

            }, (e) => {

                console.error(e);

            })
        })

    }//Fechando a função que irá adicionar o evento de envio do formulário

    getPhoto() {

        return new Promise((resolve, reject) => {

            let fileReader = new FileReader();
            let elements = [...this.form.elements].filter(item => {
                if (item.name === 'photo') {
                    return item;
                }
            })

            let file = elements[0].files[0];
            fileReader.onload = () => {

                resolve(fileReader.result)

            }

            fileReader.onerror = (e) => {
                reject(e);
            }
            if (file) {
                fileReader.readAsDataURL(file)
            } else {
                resolve('dist/img/unisex.jpg')
            }

        })

    }//Fechando função que interpreta a photo do formulário

    //Nessa função usamos o Spread para que uma coleção seja entendida como um array
    getFormValues() {

        let user = {};
        let isValid = true;

        [...this.form.elements].forEach((field, index) => {
            if (['name', 'email', 'password', 'birth'].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add('has-error')
                isValid = false

            } else {

                field.parentElement.classList.remove('has-error')

            }

            if (field.name === "gender" && field.checked) {
                user[field.name] = field.value
            } else if (field.name === "admin") {
                user[field.name] = field.checked
            } else {
                user[field.name] = field.value
            }
        })

        if (isValid) {
            return new User(
                user.name,
                user.gender,
                user.birth,
                user.country,
                user.email,
                user.password,
                user.photo,
                user.admin,
                user.register
            )
        } else {
            return false
        }

    }//Fechando a função que irá pegar os valores dos campos do formulário e rotarna um JSON com eles

    addListLine(dataUser) {

        let tr = document.createElement('tr')
        //transformando um objeto em string
        tr.dataset.user = JSON.stringify(dataUser)

        tr.innerHTML = `
        <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${(dataUser.admin) ? 'Sim' : "Não"}</td>
        <td>${Utils.dateFormat(dataUser.register)}</td>
        <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    `

        this.table.appendChild(tr)

        this.updateCountUsers()

    }

    updateCountUsers(){

        let users = 0;
        let admins = 0;
        let userCount = document.querySelector('#number-users');
        let adminCount = document.querySelector('#number-admin');
        [...this.table.children].forEach(tr=>{
            //transformando uma string em objeto JSON
            let user = JSON.parse(tr.dataset.user)
            if(user._admin){
                admins ++
            } else {
                users ++
            }
            
        })
        console.log(users)
        console.log(admins)
        userCount.innerHTML = users
        adminCount.innerHTML = admins

    }

}