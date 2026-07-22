import { LoadProfile, ProfileButtons } from "./functions.js";

const user = JSON.parse(sessionStorage.getItem(`loggedUser`));

if (!user) {
    window.location.href = "index.html";
}

else{
    LoadProfile();
    let button = document.querySelectorAll('button');
    button.forEach(button => {
        button.addEventListener('click', () => {
            ProfileButtons(button.id);
        });
    });
}
