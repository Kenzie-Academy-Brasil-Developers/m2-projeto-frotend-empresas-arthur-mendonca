import {toast} from "./toastify.js"

async function buscarInfoFuncionario(){
    const data = localStorage.getItem("token")
    const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data}`
        }
      };
      
      try{
        const responseJSON = await fetch('http://localhost:6278/users/profile', options)
        const response = await responseJSON.json()
        console.log(responseJSON)
        console.log(response)
        
            if(response.kind_of_work == null || response.department_uuid == null){
                response.kind_of_work = "Não definido"
                response.department_uuid = "Não definido"
            }

        let ulTopo = document.querySelector(".usuario__li")
        ulTopo.insertAdjacentHTML("beforeend", `
        <div class="upper__user-div">
          <h2>${response.username}</h2>
        </div>  
        
        <div class="lower__user-div">  
          <p>${response.email}</p>
          <p>${response.professional_level}</p>
          <p>${response.kind_of_work}</p>
          <p>${response.department_uuid}</p>
        </div>
        `)
      }
      catch{(error) => console.log(error)}
     
}

buscarInfoFuncionario()




async function mostrarColegas(){
  const ul = document.querySelector(".colegas__info-ul")
  const div = document.querySelector(".colegas__div")
  const data = localStorage.getItem("token")
  const divNoUser = document.createElement("div")
  divNoUser.classList.add("no__user-div")

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data}`
    }
  };
  
  try{
    const responseJSON = await fetch ('http://localhost:6278/users/departments/coworkers', options)
    const response = await responseJSON.json()
    // console.log(responseJSON)
    
    const company = response.find((e) => (e))
    const users = response.map((e) => (e.users))
    const userData = users[0]
    console.log(users[0])

    if(response == [] || users[0] == []){
      divNoUser.insertAdjacentHTML("beforeend" ,`
      <p>Você ainda não foi contratado</p>
      `)
    }else{
  
    div.insertAdjacentHTML('afterbegin', `
    <header class="colegas__header p-7 text-2xl font-bold">
    <h2>${company.description}</h2>
    </header>
    `)

    userData.forEach((e) => ul.insertAdjacentHTML("beforeend", `
    <li class="colegas__list py-2 px-10">
    <h4 class="font-bold text-lg">${e.username}</h4>
    <p>${e.professional_level}</p>
    </li>
    `))
    }
  }
  catch{(error) => error}

}

mostrarColegas()


async function editarInfoUsuario(){
  
  let canetaButton = document.querySelector(".caneta__azul")
  let modal = document.querySelector(".modal__tag")
  let botaoFechar = document.querySelector(".fechar__button")
  let name = document.querySelector("#editar__nome")
  let email = document.querySelector("#editar__email")
  let senha = document.querySelector("#editar__senha")
  const editButton = document.querySelector(".edit__button")
  const token = localStorage.getItem("token")

  canetaButton.addEventListener("click", () => {
    modal.showModal();
  })
  
  botaoFechar.addEventListener("click", () =>{
    modal.close()
  })
  
  editButton.addEventListener("click", async () =>{
    const data = {
      "username": name.value,
      "password": senha.value,
      "email": email.value
    }
  
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    };
    
    try{
      const responseJSON = await fetch ('http://localhost:6278/users', options)
      const response = await responseJSON.json()
      // console.log(response)
      console.log(responseJSON.ok)
      if(responseJSON.ok){
        toast("Dados atualizados com sucesso", "#4BA036" )
      }
      // else if(name.value == null || senha.value == null || email.value == null){
      //   toast("É necessário alterar pelo menos um dos parâmetros", "#CE4646")
      // } - NÃO SEI QUAL O RETORNO DO VALUE VAZIO
      else{
        toast("Erro na requisição, por favor entre em contato com o Admin", "#CE4646")
        }
    }
    catch{(error) => console.log(error)}
    modal.close()
  })

} 

editarInfoUsuario()



async function logout (){

  let botaoLogout = document.querySelector(".logout__button ")
  botaoLogout.addEventListener("click",  () =>{
    localStorage.clear("token")
    window.location.assign("/m2-projeto-frotend-empresas-arthur-mendonca/index.html")
  })
} 
logout()