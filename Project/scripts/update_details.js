import { LoadDetailsToUpdate, VerifyForm, CheckImage } from "./functions.js";
import { GetCities } from "./cities.js";

const user = JSON.parse(sessionStorage.getItem(`loggedUser`));
const userToEdit = JSON.parse(sessionStorage.getItem("userToEdit")); 

if (!user && !userToEdit) {
    window.location.href = "index.html";
}

else{
    
    if (userToEdit){
        LoadDetailsToUpdate(userToEdit);
    }
    else{
        LoadDetailsToUpdate(user);
    }
    CheckImage();
    GetCities();
    
    document.querySelector("#Register_form").addEventListener('submit', function(event) {
            event.preventDefault();
            VerifyForm("update");             
    });
    
    document.querySelector("#Choose_picture").addEventListener("click", function () {
            document.querySelector("#Profile_pic").click();
    });
}