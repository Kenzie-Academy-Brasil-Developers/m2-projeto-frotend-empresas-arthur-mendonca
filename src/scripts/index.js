import {toast} from "./toastify.js"
let toasty = document.querySelector(".toast")
let baseURL = "http://localhost:6278"


// 

let ul = document.querySelector(".companies__ul-wrapper")


export async function pegarEmpresas(){

    const response = await fetch ("http://localhost:6278/companies",{
        "method": "GET",
        "headers": {
          "Authorization": "Bearer null"
        }
      })
        .then(response => response.json())
        .catch(err => console.error(err));
    
    return response
}

async function mostrarEmpresas(){

    const empresas = await pegarEmpresas()
    // console.log(empresas)

    empresas.map(element =>
        ul.insertAdjacentHTML
    ("beforeend",` 
        <li class="companies__inside-container p-4 ...">
        <h3>${element.name}</h3>
        <p>${element.opening_hours}</p>
        <h6 class="p-1.5 ... rounded-full ... sector__name" >${element.sectors.description}</h6>
        </li>
    `))
    let name = document.querySelectorAll(".sector__name")
    return empresas
    
};

mostrarEmpresas()


function mostrarMenuMobile(){

    let menu = document.querySelector(".mobile__menu-icon")
    let menuDiv = document.querySelector(".menu__div")
   

    menu.addEventListener(("click"), () => {
        menuDiv.classList.toggle("hide")
        console.log("teste")
        
    })
}

mostrarMenuMobile()


async function filtrarEmpresas(){

    let select = document.querySelector("#companies__select")
    let todosSetores = await mostrarTodosSetores()
    
            todosSetores.forEach((e) => {
                let option = document.createElement("option")
                option.classList.add("select__options")
                option.value = e.description
                option.innerText = e.description
                select.append(option)
            })
            
            select.addEventListener(("change") , async (event) =>{
                console.log(event.currentTarget.value)
                
                ul.innerHTML = ""
                if(event.currentTarget.value == "todos"){
                    mostrarEmpresas()
                }   else{   let result =  await mostrarEmpresaPorSetor(event.currentTarget.value)
                            result.forEach((e) => {
                                ul.insertAdjacentHTML(`beforeend`, `
                                    <li class="companies__inside-container p-4 ...">
                                    <h3>${e.name}</h3>
                                    <p>${e.opening_hours}</p>
                                    <h6 class="p-1.5 ... rounded-full ... sector__name" >${e.sectors.description}</h6>
                                    </li>
                                `)
                            })
                    }
                })

}
    
filtrarEmpresas()



function redirecionarLogin(){

    let loginButton = document.querySelector("#botao__login-mobile")
    let loginButton2 = document.querySelector("#login__button-123")
    
    loginButton.addEventListener(("click"), () => {
        window.location.assign("/src/pages/login.html")
    })
    loginButton2.addEventListener(("click"), () => {
        window.location.assign("/src/pages/login.html")
    })
}
redirecionarLogin()

function redirecionarCadastro(){

    let cadastroButton = document.querySelector(".signup__button-both")
    let cadastroButton2 = document.querySelector("#botao__cadastro-mobile")

    cadastroButton.addEventListener(("click"), () =>{
        window.location.assign("/src/pages/register.html")
    })
    cadastroButton2.addEventListener(("click"), () =>{
        window.location.assign("/src/pages/register.html")
    })
}
redirecionarCadastro()

async function mostrarTodosSetores(){

    const options = {
        method: 'GET',
        headers: {
          Authorization: ""
        }
      };
      
      try{
        const responseJSON = await fetch('http://localhost:6278/sectors', options)
        const response = await responseJSON.json()
        return response
      }
      catch{(error) => console.log(error)}  

}


async function mostrarEmpresaPorSetor(setor){
    
    const options = {method: 'GET', headers: {Authorization: 'Bearer '}};

    try{
        const responseJSON = await fetch(`http://localhost:6278/companies/${setor}`, options)
        const response = responseJSON.json()
        // console.log(responseJSON)
    // console.log(response)
    return response
    }catch{
        (error) => console.log(error)}
}


// toasty.addEventListener("click", (e) => {
    //     e.preventDefault()
    //     toast("Achô", "#4200FF")
    // })


















