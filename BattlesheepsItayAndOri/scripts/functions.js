import User from "./models/user.js"

const regUsername = /^[A-Za-z0-9_.!@#%&=$^*()-]{1,60}$/;
const regPassword = /^(?=.*[A-Z])(?=.*[\d])(?=.*[_.!@#%&=$^*()-])[A-Za-z0-9_.!@#%&=$^*()-]{7,12}$/;
const regName = /^[א-תA-Za-z]{1,60}$/;
const regEmail = /^[A-Za-z_.!#%&=$^*()-]+@[A-Za-z_.!#%&=$^*()-]+\.com$/;
const regStreet = /^[א-ת]{2,20}$/;
const regHousenum = /^(?=.*[1-9])[0-9]{1,5}$/;


let profilePicture = "";
export function CheckImage(){
    let inputPicture = document.querySelector(`#Profile_pic`);
    inputPicture.value = "";
    const pictureAlert = document.querySelector(`#Picture_alert`);
    inputPicture.addEventListener('change', function () {
        pictureAlert.textContent = "";
        profilePicture = "";

        if (inputPicture.files.length === 0){
            pictureAlert.textContent = "❌";
            return;
        }
        const file = inputPicture.files[0];
        const reader = new FileReader();

        reader.onload = function () {
            profilePicture = reader.result;
            let img = document.querySelector(`#pic_preview`);
            img.src = profilePicture;
            img.style.visibility = "visible";
        };
        reader.onerror = function () {
            pictureAlert.textContent = "שגיאה בקריאת התמונה";
            profilePicture = "";
        };
        reader.readAsDataURL(file);
    });
}

export function VerifyForm(page){
    const users = JSON.parse(localStorage.getItem(`users`)) || [];
    const loggedUser = JSON.parse(sessionStorage.getItem('userToEdit')) || JSON.parse(sessionStorage.getItem('loggedUser')) || [];

    let inputUsername = document.querySelector(`#Username_in`).value;
    let inputPassword = document.querySelector(`#Password_in`).value;
    let inputConfirm = document.querySelector(`#Confirm_in`).value;
    let inputPicture = document.querySelector(`#Profile_pic`);
    let inputFirst = document.querySelector(`#First_in`).value;
    let inputLast = document.querySelector(`#Last_in`).value;
    let inputEmail = document.querySelector(`#Email_in`).value;
    let inputDate = document.querySelector(`#Date`).value;
    let inputCity = document.querySelector(`#cityList`).value;
    let inputStreet = document.querySelector(`#Street_in`).value;
    let inputHousenum = document.querySelector(`#Housenum_in`).value;
    let cities = [];
    document.querySelectorAll(`#cities option`).forEach(option => cities.push(option.label));
    const error = "❌"
    
    const usernameValid = regUsername.test(inputUsername);
    document.querySelector(`#Username_alert`).textContent = (!usernameValid) ? error + "  אותיות לועזיות בלבד, מספרים ותווים מיוחדים, עד 60 תווים.  " : "";
    
    let usernameTaken = false;
    if (users.some(user => user.username.toLowerCase() === inputUsername.toLowerCase() || inputUsername.toLowerCase() === "admin")){
        if (loggedUser.length === 0){
            document.querySelector(`#Username_alert`).textContent = error + "  שם המשתמש כבר קיים.  ";
            usernameTaken = true;
        }
        else{
            if (inputUsername.toLowerCase() !== loggedUser.username.toLowerCase()){
                document.querySelector(`#Username_alert`).textContent = error + "  שם המשתמש כבר קיים.  ";
                usernameTaken = true;
            }

        }
    }

    
    const passwordValid = regPassword.test(inputPassword);
    document.querySelector(`#Password_alert`).textContent = (!passwordValid) ? error + "  7 עד 12 תווים, לפחות תו אחד מיוחד אות גדולה ומספר.  " : "";
    
    const passwordMatching = (inputConfirm == inputPassword && inputPassword != "");
    document.querySelector(`#Confirm_alert`).textContent = (!passwordMatching) ? error + "  סיסמה לא תואמת.  ": "";
    
    const firstValid = regName.test(inputFirst);
    document.querySelector(`#First_alert`).textContent = (!firstValid) ? error + "  טקסט בלבד.  ": "";
    
    const lastValid = regName.test(inputLast);
    document.querySelector(`#Last_alert`).textContent = (!lastValid) ? error + "  טקסט בלבד.  " : "";
    
    const emailValid = regEmail.test(inputEmail);
    document.querySelector(`#Email_alert`).textContent = (!emailValid) ? error + "  כתובת המייל לא תקינה אותיות לועזיות ותווים מיוחדים בלבד.  " : "";
    
    let emailTaken = false;
    if (users.some(user => user.email.toLowerCase() === inputEmail.toLowerCase())){
        if (loggedUser.length === 0){
            document.querySelector(`#Email_alert`).textContent = error + "  כתובת המייל כבר קיימת.  ";
            emailTaken = true;
        }
        else{
            if (inputEmail.toLowerCase() !== loggedUser.email.toLowerCase()){
                document.querySelector(`#Email_alert`).textContent = error + "  כתובת המייל כבר קיימת.  ";
                emailTaken = true;
            }
        }
    }
    
    const cityValid = cities.includes(inputCity.trim());
    document.querySelector(`#City_alert`).textContent = (!cityValid) ? error + "  עיר לא תקינה. ניתן לבחור רק מהרשימה.  ": "";
    
    const streetValid = regStreet.test(inputStreet);
    document.querySelector(`#Street_alert`).textContent = (!streetValid) ? error + "  אותיות בעברית בלבד.  " : "";
    
    const housenumValid = regHousenum.test(inputHousenum);
    document.querySelector(`#Housenum_alert`).textContent = (!housenumValid) ? error + "  מספר חיובי בלבד.  " : "";
    
    const dateValid = (inputDate != "");
    document.querySelector(`#Date_alert`).textContent = (!dateValid) ? error + "  לא ניתן להשאיר ריק.  " : "";
    
    const pictureAdded = (inputPicture.files.length === 1 || page == "update");
    document.querySelector(`#Picture_alert`).textContent = (!pictureAdded) ? error + "  תמונה חסרה רק קובצי jpg או jpeg.  " : "";
    
    
    if (usernameValid && !usernameTaken && passwordValid && passwordMatching && pictureAdded && firstValid && lastValid && emailValid && !emailTaken && dateValid && cityValid && streetValid && housenumValid)
    {
        const userToEdit = JSON.parse(sessionStorage.getItem("userToEdit")); 
        if (page == "registration"){
            CreateUser(inputUsername, inputPassword, profilePicture, inputFirst, inputLast, inputEmail, inputDate, inputCity, inputStreet, inputHousenum);
        }
        else if (page == "update" && userToEdit){
            AdminUpdateDetails(inputUsername, inputPassword, profilePicture, inputFirst, inputLast, inputEmail, inputDate, inputCity, inputStreet, inputHousenum);
        } 
        else if (page == "update"){
            UpdateDetails(inputUsername, inputPassword, profilePicture, inputFirst, inputLast, inputEmail, inputDate, inputCity, inputStreet, inputHousenum);
        }
    }

}

export function LoadDetailsToUpdate(user){
    if (!user) {
        window.location.href = "index.html";
    }
    else{
        document.querySelector(`#Username_in`).value = user.username;
        document.querySelector(`#Password_in`).value = user.password;
        document.querySelector(`#Confirm_in`).value = user.password;
        document.querySelector(`#pic_preview`).src = user.picture;
        document.querySelector(`#First_in`).value = user.first;
        document.querySelector(`#Last_in`).value = user.last;
        document.querySelector(`#Email_in`).value = user.email;
        document.querySelector(`#Date`).value = user.date;
        document.querySelector(`#cityList`).value = user.city;
        document.querySelector(`#Street_in`).value = user.street;
        document.querySelector(`#Housenum_in`).value = user.housenum;
    
        document.querySelector("#Register_form").addEventListener('submit', function(event) {
                event.preventDefault();
                VerifyForm("update");             
        });
    
        document.querySelector("#Choose_picture").addEventListener("click", function () {
                document.querySelector("#Profile_pic").click();
        });
    }

}

function CreateUser(inputUsername, inputPassword, profilePicture, inputFirst, inputLast, inputEmail, inputDate, inputCity, inputStreet, inputHousenum){
    const users = JSON.parse(localStorage.getItem(`users`)) || [];
    const user = new User(inputUsername, inputPassword, profilePicture, inputFirst, inputLast, inputEmail, inputDate, inputCity, inputStreet, inputHousenum);

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "index.html";
}

function AdminUpdateDetails(inputUsername, inputPassword, profilePicture, inputFirst, inputLast, inputEmail, inputDate, inputCity, inputStreet, inputHousenum){
    let usersList = JSON.parse(localStorage.getItem('users')) || [];
    const userToEdit = JSON.parse(sessionStorage.getItem('userToEdit')); 
    const index = usersList.findIndex(user => user.username === userToEdit.username);

    const updatedUser = {
        ...userToEdit,
        username: inputUsername,
        password: inputPassword,
        picture: (profilePicture !== "") ? profilePicture : userToEdit.picture,
        first: inputFirst,
        last: inputLast,
        email: inputEmail,
        date: inputDate,
        city: inputCity,
        street: inputStreet,
        housenum: inputHousenum
    };

    usersList[index] = updatedUser;

    const userString = JSON.stringify(updatedUser);
    localStorage.setItem('users', JSON.stringify(usersList));
    sessionStorage.removeItem('userToEdit');

    window.location.href = "admin.html";
}

function UpdateDetails(inputUsername, inputPassword, profilePicture, inputFirst, inputLast, inputEmail, inputDate, inputCity, inputStreet, inputHousenum){
    const data = JSON.parse(sessionStorage.getItem(`loggedUser`)) || {};
    let usersList = JSON.parse(localStorage.getItem('users')) || [];

    const index = usersList.findIndex(user => user.username === data.username);

    const existingUser = new User(
        data.username,
        data.password,
        data.picture,
        data.first,
        data.last,
        data.email,
        data.date,
        data.city,
        data.street,
        data.housenum
    );

    const updatedUser = existingUser.UpdateDetails(inputUsername, inputPassword, (profilePicture !== "") ? profilePicture : existingUser.picture, inputFirst, inputLast, inputEmail, inputDate, inputCity, inputStreet, inputHousenum);
    console.log(updatedUser);


    usersList[index] = updatedUser;

    const userString = JSON.stringify(updatedUser);
    sessionStorage.setItem('loggedUser', userString);
    localStorage.setItem('users', JSON.stringify(usersList));

    window.location.href = "profile.html";
}

export function returnToAdmin(){

    let link = document.getElementById('return_page');
    const admin = JSON.parse(sessionStorage.getItem('loggedAdmin'));
    if(admin){
        link.style.visibility = "visible";
    }
}

