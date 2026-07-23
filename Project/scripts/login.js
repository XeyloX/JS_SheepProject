import { retunrToAdmin } from "./functions.js";
const user = JSON.parse(sessionStorage.getItem(`loggedUser`));

function VerifyLogin(){
    if (user) {
        window.location.href = "profile.html";
    }
    const users = JSON.parse(localStorage.getItem(`users`)) || [];

    let loginUsername = document.querySelector(`#Username_login`).value;
    let loginPassword = document.querySelector(`#Password_login`).value;



    if (loginUsername == "admin" && loginPassword == "admin1234admin"){
        sessionStorage.setItem("loggedAdmin", JSON.stringify({"username": "admin"}));
        window.location.href = "admin.html";
    }

    else{
        
        const foundUser = users.find(user => 
            user.username.toLowerCase() === loginUsername.toLowerCase());

        const passwordCorrect = users.find(user => 
            user.username.toLowerCase() === loginUsername.toLowerCase() &&
            user.password === loginPassword);
        if (passwordCorrect){
            sessionStorage.setItem("loggedUser", JSON.stringify(foundUser));
            window.location.href = "profile.html"
        }
    
        if (!foundUser){
            document.querySelector(`#Username_alert`).innerHTML = "  משתמש לא נמצא  ";
        }
        else if (foundUser){
            document.querySelector(`#Username_alert`).innerHTML = "";
        }

        if (!passwordCorrect){
            document.querySelector(`#Password_alert`).innerHTML = "  סיסמה לא נכונה  ";
        }

        window.addEventListener('load', function() {
            if (sessionStorage.loggedUser){
                window.location.href = "profile.html"
            }
        })
    }

    
}

document.querySelector("#Login_form").addEventListener('submit', function(event) {
        event.preventDefault();
        VerifyLogin();
});


retunrToAdmin();