import {toast} from "./toastify.js"
let toasty = document.querySelector(".toast")
let baseURL = "http://localhost:6278"


toasty.addEventListener("click", (e) => {
    e.preventDefault()
    toast("Achô", "#4200FF")
})

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
    console.log(empresas)

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

    let menu = document.querySelector(".mobile__menu ")
    let loginButton = document.querySelector("#login__button")
    let signupButton = document.querySelector("#signup__button")

    menu.addEventListener(("click"), () => {
        loginButton.classList.toggle("hide")
        signupButton.classList.toggle("hide")
        console.log("teste")
        
    })
}

mostrarMenuMobile()


async function filtrarEmpresas(){

    const empresas = await pegarEmpresas()
    let name = document.querySelectorAll(".sector__name")

    name.forEach((element) => {
    element.addEventListener(("click"), async () =>{ 
        ul.innerHTML = ""
        const empresaData = await fetch (`${baseURL}/companies`)
        .then((res) => res.json())

         const filterResult = empresaData.filter((e) =>  (e.sectors.description == element.innerHTML)) 
         console.log(filterResult)
    
            filterResult.map((e) => {
                    
                    ul.insertAdjacentHTML(`beforeend`, `
                    <li class="companies__inside-container p-4 ...">
                    <h3>${e.name}</h3>
                    <p>${e.opening_hours}</p>
                    <h6 class="p-1.5 ... rounded-full ... sector__name" >${e.sectors.description}</h6>
                    </li>
                    `)
            })
           
        })
    })
}
    
filtrarEmpresas()



function redirecionarLogin(){

    let loginButton = document.querySelector("#login__button")

    loginButton.addEventListener(("click"), () =>{
        window.location.assign("./src/pages/login.html")
    })
}
redirecionarLogin()

function redirecionarCadastro(){

    let cadastroButton = document.querySelector("#signup__button")

    cadastroButton.addEventListener(("click"), () =>{
        window.location.assign("./src/pages/register.html")
    })
}
redirecionarCadastro()



















// const people1 = { 
//     name: "samuel", 
//     age: 23, 
//     address: {
//         city: "Rio de Janeiro",
//         state: "RJ"
//     }
// }

// const bujao = people1.name
// console.log(bujao)

// function descriptionPeople({ name, age, address: {city, state }}) {
//     return `Meu nome é ${name}, tenho ${age} anos, 
//     resido na cidade do ${city} no estado do ${state}`;
//   }

//   console.log(descriptionPeople(people1))
