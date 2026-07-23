import { VerifyForm, CheckImage, LoadDetailsToUpdate, retunrToAdmin } from "./functions.js";
import { GetCities } from "./cities.js";
retunrToAdmin();

const user = JSON.parse(sessionStorage.getItem(`loggedUser`));
const userToEdit = JSON.parse(sessionStorage.getItem("userToEdit")); 


if (userToEdit){
    LoadDetailsToUpdate(userToEdit);
}
else{
    LoadDetailsToUpdate(user);
}
CheckImage();
GetCities();
