import { toast } from "./toastify.js";

function retornarHome(){
    let cadastroButton = document.querySelector(".register__button-desktop")
    let cadastroButtonUpper = document.querySelector("#signup__button")
    let cadastroButtonMenu = document.querySelector(".signup__button-lower")
    cadastroButton.addEventListener(("click"), (e) =>{
        e.preventDefault()
        window.location.assign("./register.html")
    })
    cadastroButtonUpper.addEventListener(("click"), (e) =>{
        e.preventDefault()
        window.location.assign("./register.html")
    })
    cadastroButtonMenu.addEventListener(("click"), (e) =>{
        e.preventDefault()
        window.location.assign("./register.html")
    })
}
retornarHome()

function retornarHomePeloHeader(){
    let homeButton = document.querySelector(".home__button")
    let homeButton2 = document.querySelector(".home__button-desktop")
   
    homeButton.addEventListener(("click"),(e)=>{
        e.preventDefault()
        window.location.assign("/index.html")
    }) 
    homeButton2.addEventListener(("click"),(e)=>{
        e.preventDefault()
        window.location.assign("/index.html")
    }) 
}
retornarHomePeloHeader()



function fazerLogin(){
    let loginButton = document.querySelector("#login__button")
    let email = document.querySelector("#email__input")
    let senha = document.querySelector("#senha__input")

    
    loginButton.addEventListener(("click"), async (e) => {
        e.preventDefault()
    let data = {
        "email": email.value,
        "password": senha.value
    }
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      };

      const responseJSON =  await fetch('http://localhost:6278/auth/login', options)
    try{
     const response =  await responseJSON.json()
     console.log(response) 
        if(!responseJSON.ok){
            toast(`Login não foi realizado por motivo de ${response.error}`, "#CE4646")
        }
        else{
            localStorage.setItem("token", response.token)
            toast("Login realizado ", "#4BA036" )
            window.location.assign("./dashboard.html")
        }
    }
    catch(error) {
        console.log(error)}

    })
}

fazerLogin()

function mostrarMenuMobile(){

    let menu = document.querySelector(".mobile__menu-icon")
    let menuDiv = document.querySelector(".menu__div")
    let menuDiv2 = document.querySelector(".menu__mobile")
   

    menu.addEventListener(("click"), () => {
        menuDiv.classList.toggle("hide")
        menuDiv2.classList.toggle("hide")
        console.log("teste")
        
    })
}

mostrarMenuMobile()
