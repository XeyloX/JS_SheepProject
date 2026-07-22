import { CreateTable, DeleteUser, LoadDetailsToUpdate } from "./functions.js"

const admin = JSON.parse(sessionStorage.getItem(`loggedAdmin`));

if (!admin) {
    window.location.href = "index.html";
}
else{
    CreateTable();

    
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
