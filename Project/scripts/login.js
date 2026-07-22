import { VerifyLogin } from "./functions.js";

const user = JSON.parse(sessionStorage.getItem(`loggedUser`));


if (user) {
    window.location.href = "profile.html";
}

else{
    window.addEventListener('load', function() {
        if (sessionStorage.loggedUser){
            window.location.href = "profile.html"
        }
    })
    
    document.querySelector("#Login_form").addEventListener('submit', function(event) {
            event.preventDefault();
            VerifyLogin();
    });
}    
