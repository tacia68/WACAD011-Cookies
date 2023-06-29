const signupForm = document.getElementById("signup-form")

if (signupForm){

    signupForm.onsubmit = () =>{
        const senha = document.getElementById("senha").value
        const confirSenha = document.getElementById("confirm-senha").value
    
        if (senha !== confirSenha){
            document.getElementById("confirm-senha-erro").innerHTML = "As senhas precisam ser iguais"
           
            return false;
        }
    }


}
