import User from "./models/user.js"

import { LoadDetailsToUpdate } from "./functions.js";

const admin = JSON.parse(sessionStorage.getItem(`loggedAdmin`));

function CreateTable(){
    if (!admin) {
        window.location.href = "index.html";
    }
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


    let delButtons = document.querySelectorAll("#delete");
    delButtons.forEach(btn => {
        btn.addEventListener('click', function(){
            sessionStorage.setItem("userToDelete", JSON.stringify(btn.dataset))
            DeleteUser(btn.dataset);
        })
    });

    let editButtons = document.querySelectorAll("#edit");
    editButtons.forEach(btn => {
        btn.addEventListener('click', function(){
            sessionStorage.setItem("userToEdit", JSON.stringify(btn.dataset))
            window.location.href = "update_details.html";

        })
    });

}

function DeleteUser(){
    let usersList = JSON.parse(localStorage.getItem('users')) || [];
    const userToDelete = JSON.parse(sessionStorage.getItem('userToDelete')); 
    const index = usersList.findIndex(user => user.username === userToDelete.username);
    usersList.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(usersList));
    window.location.href = "admin.html";
    sessionStorage.removeItem('userToDelete');
}

let exit = document.querySelector('#exit');
exit.addEventListener('click',() => {
    sessionStorage.removeItem('loggedAdmin');
    }
);
      
CreateTable();


