import { VerifyForm, CheckImage, LoadDetailsToUpdate, returnToAdmin } from "./functions.js";
import { GetCities } from "./cities.js";
returnToAdmin();

const user = JSON.parse(sessionStorage.getItem(`loggedUser`));
const userToEdit = JSON.parse(sessionStorage.getItem("userToEdit")); 


if (userToEdit){
    LoadDetailsToUpdate(userToEdit);

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    document.querySelector(`#Date`).max = `${yyyy - 1}-${mm}-${dd}`;
    document.querySelector(`#Date`).min = `${yyyy - 119}-${mm}-${dd}`;

}
else{
    LoadDetailsToUpdate(user);
}
CheckImage();
GetCities();
