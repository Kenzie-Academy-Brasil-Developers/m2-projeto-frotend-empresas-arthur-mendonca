import { toast } from "./toastify.js"

function mostrarMenuMobile(){

    let menuButton = document.querySelector(".mobile__menu-icon")
    let menuDiv = document.querySelector(".menu__mobile")
    menuButton.addEventListener(("click"), () => {
        
        menuDiv.classList.toggle("hide")
        console.log("teste")
        
    })
}

mostrarMenuMobile()

function retornarHomePeloForm(){
let returnButton = document.querySelector(".return__button")

    returnButton.addEventListener(("click"), (e) =>{
    e.preventDefault()
    window.location.assign("/index.html")
    // ok
    })
}
retornarHomePeloForm()

function retornarHomePeloHeader(){
    let homeButton = document.querySelector(".home__button")
    let homeButton2 = document.querySelector(".home__button2")
    
    homeButton.addEventListener(("click"), (e) =>{
        e.preventDefault()
        window.location.assign("/index.html")
        // ok
        })
    homeButton2.addEventListener(("click"), (e) =>{
        e.preventDefault()
        window.location.assign("/index.html")
        // ok
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
    let loginButton = document.querySelector(".login__button")
    let loginButton2 = document.querySelector(".login__button2")
    loginButton.addEventListener(("click"),()=>{
        window.location.assign("./login.html")
    }) 
    loginButton2.addEventListener(("click"),()=>{
        window.location.assign("./login.html")
    }) 
}
loginPeloHeaderButton()



