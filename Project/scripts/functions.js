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
            pictureAlert.textContent = error;
            return;
        }
        const file = inputPicture.files[0];
        const reader = new FileReader();

        reader.onload = function () {
            profilePicture = reader.result;
            document.querySelector(`#pic_preview`).src = profilePicture;
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

function CreateUser(inputUsername, inputPassword, profilePicture, inputFirst, inputLast, inputEmail, inputDate, inputCity, inputStreet, inputHousenum){
    const users = JSON.parse(localStorage.getItem(`users`)) || [];
    const user = new User(inputUsername, inputPassword, profilePicture, inputFirst, inputLast, inputEmail, inputDate, inputCity, inputStreet, inputHousenum);

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "index.html";
}

export function VerifyLogin(){
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
    }
}

export function LoadProfile(){
    const user = JSON.parse(sessionStorage.getItem(`loggedUser`));

    document.querySelector(`#fullname`).innerHTML = User.GetFullName(user);
    document.querySelector(`#email`).innerHTML = user.email;
    document.querySelector(`#address`).innerHTML = `${user.street} ${user.housenum}, ${user.city}`;
    document.querySelector(`#birthday`).innerHTML = User.GetBirthdate(user);
    document.querySelector(`#profile_pic`).src = user.picture;
}

export function ProfileButtons(id){
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

export function LoadDetailsToUpdate(user){
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
}

export function UpdateDetails(inputUsername, inputPassword, profilePicture, inputFirst, inputLast, inputEmail, inputDate, inputCity, inputStreet, inputHousenum){
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


export function AdminUpdateDetails(inputUsername, inputPassword, profilePicture, inputFirst, inputLast, inputEmail, inputDate, inputCity, inputStreet, inputHousenum){
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

export function DeleteUser(){
    let usersList = JSON.parse(localStorage.getItem('users')) || [];
    const userToDelete = JSON.parse(sessionStorage.getItem('userToDelete')); 
    const index = usersList.findIndex(user => user.username === userToDelete.username);
    usersList.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(usersList));
    window.location.href = "admin.html";
}



export function CreateTable(){
    let usersList = JSON.parse(localStorage.getItem('users'))||[];
    let userTable = document.createElement("table");
    
    
    let titleRow = document.createElement("tr");
    titleRow.className = "box";

    let picTitle = document.createElement("td");
    picTitle.innerHTML = "תמונה"; 
    picTitle.id = "picture";
    let usernameTitle = document.createElement("td");
    usernameTitle.innerHTML = "שם משתמש"; 
    let fullnameTitle = document.createElement("td");
    fullnameTitle.innerHTML = "שם מלא"; 
    let dateTitle = document.createElement("td");
    dateTitle.innerHTML = "תאריך לידה"; 
    let addressTitle  = document.createElement("td");
    addressTitle.innerHTML = "כתובת";
    let emailTitle = document.createElement("td");
    emailTitle.innerHTML = "אימייל"; 
    emailTitle.id = "email";
    let delTitle = document.createElement("td");
    delTitle.innerHTML = "מחיקה"; 
    let editTitle = document.createElement("td");
    editTitle.innerHTML = "עריכה"; 

    titleRow.append(picTitle, usernameTitle, fullnameTitle, dateTitle, addressTitle, emailTitle, delTitle, editTitle);
    userTable.append(titleRow);
     


    usersList.forEach((user) => {
        let userRow = document.createElement("tr");
        userRow.className = "box";
        let picTd = document.createElement("td");
        let picture = document.createElement("img");
        picTd.append(picture);
        picTd.id = "picture";
        let username = document.createElement("td");
        let fullname = document.createElement("td");
        let date = document.createElement("td");
        let address = document.createElement("td");
        let email = document.createElement("td");
        email.id = "email";
        let deleteTd = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteTd.append(deleteButton);
        let editTd = document.createElement("td");
        let editButton = document.createElement("button");
        editTd.append(editButton);


        picture.src = user.picture;
        username.innerHTML = user.username;
        fullname.innerHTML = User.GetFullName(user);
        date.innerHTML = User.GetBirthdate(user);
        address.innerHTML = `${user.city}<br>${user.street}<br>${user.housenum}`;
        email.innerHTML = user.email;

        Object.assign(deleteButton.dataset, user);
        deleteButton.id = "delete";
        deleteButton.innerHTML = "מחק"
        Object.assign(editButton.dataset, user);
        editButton.id = "edit";
        editButton.innerHTML = "ערוך"

        userRow.append(picTd, username, fullname, date, address, email, deleteTd, editTd);       
        userTable.append(userRow);
    } );
    let cont = document.createElement("div");
    cont.className = "container";
    cont.append(userTable);
    document.body.append(cont);
}

