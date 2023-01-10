import { toast } from "./toastify.js"

function mostrarMenuMobile(){

    let menu = document.querySelector(".mobile__menu ")
    let loginButton = document.querySelector("#login__button")
    let signupButton = document.querySelector("#home__button")

    menu.addEventListener(("click"), () => {
        loginButton.classList.toggle("hide")
        signupButton.classList.toggle("hide")
        console.log("teste")
        
    })
}

mostrarMenuMobile()

function retornarHomePeloForm(){
let returnButton = document.querySelector(".return__button")

    returnButton.addEventListener(("click"), (e) =>{
    e.preventDefault()
    window.location.assign("/m2-projeto-frotend-empresas-arthur-mendonca/index.html")
    })
}
retornarHomePeloForm()

function retornarHomePeloHeader(){
    let homeButton = document.querySelector("#home__button")
    
    homeButton.addEventListener(("click"), (e) =>{
        e.preventDefault()
        window.location.assign("/m2-projeto-frotend-empresas-arthur-mendonca/index.html")
        })
    }
retornarHomePeloHeader()

async function cadastrarUsuario(user, email, password, level){
    
    let data = {
        "username": user,
        "password": password,
        "email": email,
        "professional_level": level,
        "kindofwork": ""
        }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        }

        try{
            console.log(options)
            const responseJSON = await fetch ("http://localhost:6278/auth/register", options)
            .then((res) => (res))
            const response = await responseJSON.json()
            console.log(response)

            if(!responseJSON.ok){
                toast("Cadastro não foi realizado", "#CE4646")
            }else{
                toast("Cadastro realizado com sucesso", "#4BA036" )
            }
        }
        catch{((error) => console.log(error))}
}

async function clicarParaCadastrarUsuario(){
    let registerButton = document.querySelector("#register__button")
    let name = document.querySelector("#name__input")
    let email = document.querySelector("#email__input")
    let senha = document.querySelector("#password__input")
    let nivelProfissional = document.querySelector("#nivelProfissional")
    
    registerButton.addEventListener(("click"), async (event) =>{
        event.preventDefault()
        await cadastrarUsuario(name.value, email.value, senha.value, nivelProfissional.value)
    })
}
clicarParaCadastrarUsuario()

function loginPeloHeaderButton(){
    let homeButton = document.querySelector("#login__button")
    homeButton.addEventListener(("click"),()=>{
        window.location.assign("/m2-projeto-frotend-empresas-arthur-mendonca/src/pages/login.html")
    }) 
}
loginPeloHeaderButton()



