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
    console.log(response)
    const company = response.find((e) => (e))
    const users = response.map((e) => (console.log(e.users)))
    
    div.insertAdjacentHTML('beforeend', `
    <header>
    <h2>${company.description}</h2>
    </header>
    `)
    
    ul.insertAdjacentHTML('beforeend', `
    <li>
    <h4>${company.description}</h4>
    </li>
    `)
  }
  
  catch{(error) => error}

}

mostrarColegas()