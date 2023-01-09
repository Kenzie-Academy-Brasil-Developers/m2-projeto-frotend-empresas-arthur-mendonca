import { toast } from "./toastify.js";

function retornarHomePeloForm(){
    let cadastroButton = document.querySelector(".signup__button")
    cadastroButton.addEventListener(("click"), () =>{
        window.location.assign("/src/pages/register.html")
    })
}
retornarHomePeloForm()

function retornarHomePeloHeader(){
    
}

