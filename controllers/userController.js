class UserController {

    constructor(formId, tableId) {
        this.form = document.getElementById(formId)
        this.table = document.getElementById(tableId)
        this.eventSubmit()
        this.eventEdit()
    }


    eventEdit() {

        let btnCancel = document.querySelector('#box-user-update .btn-cancel')

        btnCancel.addEventListener('click', (event) => {
            document.querySelector('#form-user-update').reset()
            this.ShowFormCreate()
        })

    }

    ShowFormUpdate() {

        document.querySelector('#box-user-create').style.display = 'none'
        document.querySelector('#box-user-update').style.display = 'block'

    }

    ShowFormCreate() {

        document.querySelector('#box-user-create').style.display = 'block'
        document.querySelector('#box-user-update').style.display = 'none'

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
            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add('has-error')
                isValid = false

            } else {

                field.parentElement.classList.remove('has-error')

            }

            if (field.name === "gender") {

                if (field.checked) user[field.name] = field.value

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
            <button type="button" class="btn btn-primary btn-xs btn-edit btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-delete btn-flat">Excluir</button>
        </td>
    `

        tr.querySelector('.btn-edit').addEventListener('click', (event) => {

            let lineJson = JSON.parse(tr.dataset.user)
            let formUpdate = document.querySelector('#form-user-update')

            for (let name in lineJson) {

                let field = formUpdate.querySelector("[name=" + name.replace("_", "") + "]");

                if (field) {
                    switch (field.type) {

                        case 'file':
                            continue;
                            break;

                        case 'radio':
                            field = formUpdate.querySelector("[name=" + name.replace("_", "") + "][value=" + lineJson[name] + "]")
                            field.checked = true;
                            break;

                        case 'checkbox':
                            field.checked = lineJson[name]
                            break;

                        default:
                            field.value = lineJson[name]

                    }

                }

            }
            this.ShowFormUpdate()

        })

        tr.querySelector('.btn-delete').addEventListener('click', (event) => {



        })

        this.table.appendChild(tr)

        this.updateCountUsers()

    }

    updateCountUsers() {

        let users = 0;
        let admins = 0;
        let userCount = document.querySelector('#number-users');
        let adminCount = document.querySelector('#number-admin');
        [...this.table.children].forEach(tr => {
            //transformando uma string em objeto JSON
            let user = JSON.parse(tr.dataset.user)
            if (user._admin) {
                admins++
            } else {
                users++
            }

        })

        userCount.innerHTML = users
        adminCount.innerHTML = admins

    }

}