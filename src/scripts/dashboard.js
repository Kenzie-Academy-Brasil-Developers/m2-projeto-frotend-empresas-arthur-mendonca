import { toast } from "./toastify.js";

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
        window.location.assign("/m2-projeto-frotend-empresas-arthur-mendonca/src/pages/user.html")
    }else{
        toast("Bem vindo de volta, sr. Admin", "#4BA036" )
    }

    }
    catch{(error) => console.log(error)}   
}

verificarTipoUsuario()











// window.addEventListener("load", (event) => {
//     console.log("page is fully loaded");
//   });
  