import User from "./models/user.js"

const user = JSON.parse(sessionStorage.getItem(`loggedUser`));



function LoadProfile(){
    if (!user) {
        window.location.href = "index.html";
    }
    else{
        document.querySelector(`#fullname`).innerHTML = User.GetFullName(user);
        document.querySelector(`#email`).innerHTML = user.email;
        document.querySelector(`#address`).innerHTML = `${user.street} ${user.housenum}, ${user.city}`;
        document.querySelector(`#birthday`).innerHTML = User.GetBirthdate(user);
        document.querySelector(`#profile_pic`).src = user.picture;
    
        let button = document.querySelectorAll('button');
        button.forEach(button => {
            button.addEventListener('click', () => {
                ProfileButtons(button.id);
            });
        });
    }
}

function ProfileButtons(id){
    console.log(id);
    if (id == "Logout"){
        sessionStorage.removeItem('loggedUser');
        window.location.href = "index.html";
    }
    else if (id == "Game"){
        window.location.href = "game.html";
    }
    else if (id == "Update_details"){
        window.location.href = "update_details.html"
    }
}

LoadProfile();
