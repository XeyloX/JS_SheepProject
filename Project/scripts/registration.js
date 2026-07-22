import { VerifyForm, VerifyLogin, CheckImage } from "./functions.js";
import { GetCities } from "./cities.js";

const user = JSON.parse(sessionStorage.getItem(`loggedUser`));

if (user) {
        window.location.href = "profile.html";
}

else{
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const dd = String(today.getDate()).padStart(2, '0');
        document.querySelector(`#Date`).max = `${yyyy-1}-${mm}-${dd}`;
        document.querySelector(`#Date`).min = `${yyyy-119}-${mm}-${dd}`;

        GetCities();
        CheckImage();

        document.querySelector("#Register_form").addEventListener('submit', function(event) {
                event.preventDefault();
                VerifyForm("registration");             
        });

        document.querySelector("#Choose_picture").addEventListener("click", function () {
                document.querySelector("#Profile_pic").click();
        });
}
