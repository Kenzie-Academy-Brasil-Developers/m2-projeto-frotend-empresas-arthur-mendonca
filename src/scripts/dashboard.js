import { toast } from "./toastify.js";
import { pegarEmpresas } from "./request.js";


const mostrarTodasEmpresas = await pegarEmpresas()
// console.log(mostrarTodasEmpresas)

let ulUsuarios = document.querySelector(".usuarios__ul")
let ulDepartamentos = document.querySelector(".departamentos__ul")
let modal = document.querySelector(".modal__delete")

async function logout (){
    let botaoLogout = document.querySelector(".logout")
    botaoLogout.addEventListener("click",  () =>{
    localStorage.clear("token")
    window.location.assign("/index.html")
  })
} 
logout()


async function verificarTipoUsuario(){
    // Verificar se o usuário é Admin
    const data = localStorage.getItem("token")
    const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data}`,
        }
      };
      
      try{
      const responseJSON = await fetch('http://localhost:6278/auth/validate_user', options)
      const response =  await responseJSON.json()
    //   console.log(responseJSON)
    //   console.log(response.is_admin)

    if(!response.is_admin){
        window.location.assign("./user.html")
      } else{
        toast("Bem vindo de volta, sr. Admin", "#4BA036" )
        }
    }
    catch{(error) => console.log(error)}   
}

verificarTipoUsuario()

async function pegarTodosUsuarios(){
  const token = localStorage.getItem("token")

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try{
    const responseJSON = await fetch('http://localhost:6278/users', options)
    const response = await responseJSON.json()
    // console.log(responseJSON)
    const splicedAdminUser = response.splice(0,1)
    // console.log(response)
      response.forEach((e) => {
        // CRIAR TODOS OS CARDS DE USUÁRIOS 
        let li = document.createElement("li")
        let header = document.createElement("header")
        let h3 = document.createElement("h3")
        let upperDiv = document.createElement("div")
        let professionalLevel = document.createElement("p")
        let kindOfWork = document.createElement("p")
        let lowerDiv = document.createElement("div")
        let icon1 = document.createElement("img")
        let icon2 = document.createElement("img")

        ulUsuarios.appendChild(li)
        li.append(header,upperDiv, lowerDiv)
        header.append(h3)
        upperDiv.append(professionalLevel, kindOfWork)
        lowerDiv.append(icon1, icon2)

        li.classList.add("users__section")
        header.classList.add("users__header")
        h3.classList.add("font-bold")
        upperDiv.classList.add("users__upper-div")
        lowerDiv.classList.add("users__lower-div")
        icon1.classList.add("icon")
        icon1.id = e.uuid
        icon2.classList.add("icon", "lixeira")
        icon2.dataset.id = e.uuid
        icon2.id = e.uuid
        h3.innerText = e.username 
        professionalLevel.innerText = e.professional_level
        icon1.src = "/src/assets/pen.png"
        icon2.src = "/src/assets/trash-can.png"

          // console.log(icon2.getAttribute("data-id"))
          // EVENTO DE CLIQUE PARA DELETAR USUÁRIOS
          icon2.addEventListener(("click"), async () => {
            if(response.filter((element) => element.uuid == icon2.getAttribute("data-id")) ){
              let alertMessage = document.querySelector(".delete__alert")
              let deleteButton = document.querySelector(".delete__button")
              let cancelButton = document.querySelector(".cancel__delete")
            
              modal.showModal()
              alertMessage.innerHTML = "Realmente deseja remover o usuário"
              alertMessage.insertAdjacentHTML("beforeend", ` ${e.username}?`)
              deleteButton.innerHTML = "Confirmar"
              cancelButton.innerHTML= "Cancelar"
            
                deleteButton.addEventListener(("click"), () =>{
                  deletarUsuario(e.uuid)
                  toast(`Usuário ${e.username} deletado` , "#4BA036" )
                  modal.close()
                  window.location.reload()
                })
                cancelButton.addEventListener(("click"),() => {
                  modal.close()
                })

            }
        })
        // editarInfoDoUsuario(kind_of_work, professional_level, uuid)
                // FUNÇÃO PARA EDITAR DADOS DO USUÁRIO
                let editarUserModal = document.querySelector(".editar__usuario-modal")
                let cancelButtonEditarUser = document.querySelector(".editarUser__cancelButton")
                let selectModalidade = document.querySelector("#kindOfWork__select")
                let selectNivelPro = document.querySelector("#professionalLevel__select")
                let editarUserButton = document.querySelector(".editarUser__button")
                icon1.addEventListener(("click"), (event) => {
                  let id = event.currentTarget.id
                  event.preventDefault()
                  editarUserModal.showModal()
                    
                    cancelButtonEditarUser.addEventListener(("click"), () => {editarUserModal.close()})
                    
                    editarUserButton.addEventListener(("click"), async () =>{
                      editarInfoDoUsuario(selectModalidade.value, selectNivelPro.value, id)
                      })               
                })


    })    
    return  response
  }
  catch{(error) => console.log(error)}
}

await pegarTodosUsuarios()


async function deletarUsuario(uuid){
  // FUNÇÃO PARA DELETAR USUÁRIOS
  // const usuarios = await pegarTodosUsuarios()
  const token = localStorage.getItem("token")
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  try{
  const responseJSON = await fetch(`http://localhost:6278/admin/delete_user/${uuid}`, options)
  const response = responseJSON.json()
  // console.log(responseJSON)
  }
  catch{(error=> console.log(error))}
}


async function mostrarTodosDepartamentos(){

  const token = localStorage.getItem("token");
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
    try{
        const responseJSON = await fetch('http://localhost:6278/departments', options)
        const response = await responseJSON.json();
        // console.log(response);

        ulDepartamentos.innerHTML = "" 
        
        response.map((e) => {
          // console.log(e)
          let li = document.createElement("li");
          let depName = document.createElement("h3");
          let depDesc = document.createElement("p");
          let compName = document.createElement("p");
          let upperDiv = document.createElement("div");
          let lowerDiv = document.createElement("div");
          let img1 = document.createElement("img");
          let img2 = document.createElement("img");
          let img3 = document.createElement("img");

          depName.innerText = e.name
          depDesc.innerText = e.description
          compName.innerText = e.companies.name
          img1.src = "/src/assets/olho.png";
          img2.src = "/src/assets/pen.png";
          img3.src = "/src/assets/trash-can.png"

          li.classList.add("department__li")
          depName.classList.add("department__h3")
          depDesc.classList.add("dep__description")
          compName.classList.add("company__name")
          upperDiv.classList.add("upper__dep-div")
          lowerDiv.classList.add("lower__dep-div")
          img3.classList.add("lixeira__departamento")
          img1.classList.add("botao__olho")
          img3.id = e.uuid
          img2.id = e.uuid
          img1.id = e.uuid

          ulDepartamentos.appendChild(li)
          li.append(upperDiv, lowerDiv)
          upperDiv.append(depName, depDesc, compName)
          lowerDiv.append(img1, img2, img3)

            img3.addEventListener(("click"), async (event) => {
                // DELETAR DEPARTAMENTOS
                if(e.uuid == event.currentTarget.id){
                  let deleteDepModal = document.querySelector(".delete__dep-modal");
                  let deleteDepButton = document.querySelector(".delete__dep-button");
                  let deleteDepText = document.getElementById("delete__dep-text");
                  let cancelButton = document.querySelector(".delete__dep-cancel")

                  deleteDepModal.showModal(); 
                  deleteDepButton.innerText = "Confirmar"
                  deleteDepText.innerHTML = `Certeza de que deseja deletar o departamento ${e.name}?`
                  cancelButton.innerText = "Cancelar"
                      
                    deleteDepButton.addEventListener(("click") ,() =>{
                      deletarDepartamento(e.uuid)
                      toast(`Departamento ${e.name} de ${e.companies.name}deletado`, "#4BA036" )
                      deleteDepModal.close()
                      window.location.reload()
                    });
                    cancelButton.addEventListener(("click"), () => { deleteDepModal.close()});
                } 
            })    
                // EDITAR DEPARTAMENTOS
                  let modalEditarDep = document.querySelector(".editar__departamento-modal")
                  let editarNome = document.querySelector(".editar__nome-input")
                  let editarDescricao = document.querySelector(".editar__descricao-input")
                  let editarButton = document.querySelector(".editar__departamento-button")
                  let cancelButtonEditar = document.querySelector(".cancelar__departamento-button")

                    img2.addEventListener(("click"), (event) => {
                      event.preventDefault()
                      modalEditarDep.showModal()
                      let id = event.currentTarget.id
                       
                        editarButton.addEventListener(("click"), async() =>{
                          editarDadosDepartamento(editarDescricao.value, editarNome.value, id )
                          modalEditarDep.close()
                        })
                          cancelButtonEditar.addEventListener(("click"), () =>{
                            modalEditarDep.close()
                          })
                    })                    
        })
          chamarModalDepartamentos()
          return response
      }
    catch{(error) => console.log(error)}
}

await mostrarTodosDepartamentos()

async function criarEmpresas(){
  // CRIAR EMPRESAS PELO BOTÃO AZUL
  let departamentoModal = document.querySelector(".criar__departamento-modal")
  let botaoCriarDepartamento = document.querySelector("#criar__departamento-button")
  let nomeDepartamento = document.querySelector(".nome__novo-departamento")
  let descricaoDepartamento = document.querySelector(".descricao__novo-departamento")
  let selectTag = document.querySelector(".criar__departamento-select")
  let criarDepartamentoModal = document.querySelector(".criar__departamento-button")
  let cancelButton = document.querySelector(".criar__departamento-cancelButton")

  botaoCriarDepartamento.addEventListener(("click"),  () => {    
  departamentoModal.showModal()
          
          mostrarTodasEmpresas.forEach((e) => {

                  let option = document.createElement("option")
                  option.classList.add("criar__departamento--option") 
                  selectTag.append(option)
                  option.innerText = `${e.name}`
                  option.value = `${e.uuid}`
            })
              criarDepartamentoModal.addEventListener(("click"), () => {

                      mostrarTodasEmpresas.forEach((e) => { if(e.uuid == selectTag.value){
                        criarDepartamento(nomeDepartamento.value, descricaoDepartamento.value, e.uuid)
                        }

                      })
                departamentoModal.close()
                window.location.reload()
              })

              cancelButton.addEventListener(("click"), () =>{departamentoModal.close()})
  })
}
criarEmpresas()


async function deletarDepartamento(uuid){
  const token = localStorage.getItem("token")
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
    try{
      const responseJSON = await fetch(`http://localhost:6278/departments/${uuid}`, options)
      const response = await responseJSON.json()
      console.log(responseJSON)
      console.log(response)
    }
    catch{(error) => console.log(error)}
}



async function criarDepartamento(nome, descricao, uuid){
    // e.companies.uuid
    const token = localStorage.getItem("token")
    const data = {
      "name": nome,
      "description":descricao,
      "company_uuid": uuid
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token} `
      },
      body: JSON.stringify(data)
    };
    try{
      const responseJSON = await fetch('http://localhost:6278/departments', options)
      const response = await responseJSON.json()
      console.log(responseJSON)
      console.log(response)
      if(responseJSON.ok){
        toast(`Departamento criado com sucesso!`, "#4BA036" )
      }else{
        toast(`Departamento não pôde ser criado. Erro ${responseJSON.status}`, "#ce4646" )
      }
      return response
      
    }
    catch{(error) => console.log(error)}
    
}

async function editarDadosDepartamento(description, name, uuid){

  const token = localStorage.getItem("token")
  const data = {
    "description":description,
    "name": name
  }
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  };
  
  try{
  const responseJson = await fetch(`http://localhost:6278/departments/${uuid}`, options)
  const response = await responseJson.json()
    if(responseJson.ok){
      toast(`Departamento editado com sucesso!`, "#4BA036" )
    }else{
      toast(`Departamento não pôde ser editado. Erro ${responseJson.status}`, "#ce4646" )
    }
  }
  
  catch{(error) => console.log(error)}
}

async function editarInfoDoUsuario(kind_of_work, professional_level, uuid){

const token = localStorage.getItem("token")

const data = {
  "kind_of_work":kind_of_work,
  "professional_level": professional_level
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
    const responseJSON = await fetch(`http://localhost:6278/admin/update_user/${uuid}`, options)
    const response = await responseJSON.json()
    console.log(responseJSON)
    console.log(response)
        if(responseJSON.ok){
          toast(`Usuário editado com sucesso!`, "#4BA036" )
        }else{
          toast(`Usuário não pôde ser editado. Erro ${responseJSON.status}`, "#ce4646" )
        }
  }
  catch{(error) => console.log(error)}
}


async function mostrarDepPeloSelect(uuid){
  const token = localStorage.getItem("token")
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try{
    const responseJSON = await fetch(`http://localhost:6278/departments/${uuid}`, options);
    const response = await responseJSON.json();
    console.log(responseJSON);
    console.log(response);    
    
    ulDepartamentos.innerHTML = ""
    if(response.length == 0){
      ulDepartamentos.innerHTML = ""

    }else{

      response.forEach((e) => {
        let li = document.createElement("li");
        let depName = document.createElement("h3");
        let depDesc = document.createElement("p");
        let compName = document.createElement("p");
        let upperDiv = document.createElement("div");
        let lowerDiv = document.createElement("div");

        depName.innerText = e.name
        depDesc.innerText = e.description
        compName.innerText = e.companies.name

        li.classList.add("department__li")
        depName.classList.add("department__h3")
        depDesc.classList.add("dep__description")
        compName.classList.add("company__name")
        upperDiv.classList.add("upper__dep-div")
        lowerDiv.classList.add("lower__dep-div")

        ulDepartamentos.appendChild(li)
        li.append(upperDiv, lowerDiv)
        upperDiv.append(depName, depDesc, compName)

        })
    }
  }
  catch{(error) => console.log(error)};
  
}

async function executarMostrarDepPeloSelect(){
// MOSTRAR DEPARTAMENTOS DE UMA EMPRESA ESPECÍFICA PELO SELECT
  let selectDepartamentos = document.querySelector("#selecionar__departamento")
  mostrarTodasEmpresas.forEach((e) => {
    let option = document.createElement("option");
    selectDepartamentos.append(option)
    option.classList.add("select__empresas-option")
    option.dataset.id = e.uuid; 
    option.innerText = e.name
    
  })
        selectDepartamentos.addEventListener(("change"), (event) => {
            if(selectDepartamentos.value == "todas"){
              mostrarTodosDepartamentos()
              
            }else{
            let filter = mostrarTodasEmpresas.filter((e) => selectDepartamentos.value == e.name)
              // console.log(filter[0])
              mostrarDepPeloSelect(filter[0].uuid)
            }
        })
}
executarMostrarDepPeloSelect()

async function contratarFuncionario(userId, departamentoId){
  const token = localStorage.getItem("token")

  const data = {
    "user_uuid": userId,
    "department_uuid": departamentoId
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
  const responseJSON = await fetch('http://localhost:6278/departments/hire/', options)
  const response = await responseJSON.json()
  console.log(responseJSON)
  console.log(response)
  return response
}
catch{(error) => console.log(error)}


} 


async function mostrarUserSemEmprego(){
  
  const token = localStorage.getItem("token")
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try{ 
    const responseJSON = await fetch('http://localhost:6278/admin/out_of_work', options);
    const response = await responseJSON.json()
    console.log(responseJSON)
    console.log(response)
    return response
  }
    catch{
      (error) => console.log (error)}
  
}







const userSemEmprego = await mostrarUserSemEmprego()
const mostrarDep = await mostrarTodosDepartamentos()
const mostrarTodosUsers = await pegarTodosUsuarios()

async function chamarModalDepartamentos(){

  let botaoOlho = document.querySelectorAll(".botao__olho")
  let modal = document.querySelector(".dados__departamento-modal")
  let title = document.querySelector(".dados__departamento-upperDiv > h3")
  let depDescription = document.querySelector(".dados__departamento-middleDiv > span")
  let nomeEmpresa = document.querySelector(".dados__departamento-middleDiv > small")    
  let selectUser = document.querySelector(".select__userToHire")
  let botaoContratar = document.querySelector(".contratar__button")
  
botaoOlho.forEach((e) => {
  
  
  e.addEventListener(("click"), (event) => {
      let IDdoDepartamento = event.currentTarget.id
      event.preventDefault()
      modal.showModal()
      selectUser.innerHTML = ""

          
            let filter = mostrarDep.filter( (element) => { return element.uuid == event.currentTarget.id})
            
              filter.map((element) => {
                title.innerText = element.name
                depDescription.innerText = element.description
                nomeEmpresa.innerText = element.companies.name
                })

                  userSemEmprego.forEach((elementos) => {
                    // console.log(elementos)
                    let option = document.createElement("option")
                    option.id = elementos.uuid
                    option.classList.add("usuariosParaContratar")
                    option.value = elementos.uuid
                    selectUser.append(option)
                    option.innerText = elementos.username      
                    })
                          botaoContratar.addEventListener(("click"), async() => {
                          contratarFuncionario(selectUser.value, IDdoDepartamento)
                          })  
                  
    })

  })

}

chamarModalDepartamentos()

