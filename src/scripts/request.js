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