import Ship from "./models/ship.js"

function CreateBoard(boardSize, ships){
    document.querySelector("#remainingShips").style.visibility = "visible";
    const board = document.getElementById("board");
    let size = boardSize;
    const arr = [];
    
    board.style.gridTemplateColumns = `repeat(${size},50px)`;
    board.style.gridTemplateRows = `repeat(${size},50px)`;
    
    let x = 0;
    let y = 0;
    for(let i = 0; i < size * size; i++){
    
        const cell = document.createElement("div");
        const img = document.createElement("img");
        cell.append(img);
        cell.className = "cell";
        cell.id = `${x},${y}`;
        cell.style.backgroundColor = "grey";
        if (i % size === size-1)
        {
            y = 0;
            x++;
        }
        else{
            y++;
        }
        
        board.appendChild(cell);
        cell.addEventListener("click", function(){
        
            if (cell.style.backgroundColor === "grey"){
                if (BlowUp(arr, ships, cell.id)){
                    cell.style.backgroundColor = "orange";
                }
                else{
                    cell.style.backgroundColor = "lightblue";
                }
            }
        
        });
    }
    
    
    for (let i = 0; i < size; i++) {
        arr[i] = [];
        for (let j = 0; j < size; j++) {
            arr[i][j] = 0;
        }
    }

    let allPlaced = false;
    while (!allPlaced){
        ships.forEach(ship => {
            let placed = false;
            let tries = 0;
            while (!placed) {
                if (tries === 1000){
                    window.location.href = "game.html"
                    break;
                }
                tries++;
                let randX = Math.floor(Math.random() * size);
                let randY = Math.floor(Math.random() * size);
                let isRotated = Math.floor(Math.random() * 2);
        
                let shipCells = [];
        
                for (let i = 0; i < ship.size; i++) {
                    if (isRotated) {
                        shipCells.push(`${randX + i},${randY}`);
                    }
                    else {
                        shipCells.push(`${randX},${randY + i}`);
                    }
                }
        
                let canPlace = true;
        
                shipCells.forEach(coord => {
                    let [x, y] = coord.split(",").map(Number);
        
                    if (x < 0 || x >= size || y < 0 || y >= size) {
                        canPlace = false;
                    }
                });
        
                if (canPlace) {
                    shipCells.forEach(coord => {
                        let [x, y] = coord.split(",").map(Number);
                        let toCheck = CheckAround(size, x, y);
        
                        toCheck.forEach(checkCoord => {
                            let [checkX, checkY] = checkCoord
                                .split(",")
                                .map(Number);
        
                            if (arr[checkX][checkY] !== 0) {
                                canPlace = false;
                            }
                        });
                    });
                }
        
                if (canPlace) {
                    shipCells.forEach(coord => {
                        let [x, y] = coord.split(",").map(Number);
                        arr[x][y] = ship.id;
                    });
        
                    ship.startXY = `${randX},${randY}`;
                    ship.isRotated = Boolean(isRotated);
                    placed = true;
                }
            }
        
        });
        allPlaced = true;
    }
}

function CheckAround(size, x, y) {
    let toCheck = [];

    for (let addX = -1; addX <= 1; addX++) {
        for (let addY = -1; addY <= 1; addY++) {
            let checkX = x + addX;
            let checkY = y + addY;

            if (
                checkX >= 0 &&
                checkX < size &&
                checkY >= 0 &&
                checkY < size
            ) {
                toCheck.push(`${checkX},${checkY}`);
            }
        }
    }

    return toCheck;
}

function BlowUp(arr, ships, xy){
    let [x, y] = xy.split(",").map(Number);
    if (arr[x][y] > 0){
        let shipId = arr[x][y];
        const foundShip = ships.find(ship => ship.id === shipId);
        foundShip.health--;

        let cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            if (cell.id === xy){
                let image = cell.querySelector('img');
                if (foundShip.health <= 0){
                    DisplayShip(arr, foundShip);
                    const explode = new Audio('/Project/audio/explosion.mp3');
                    explode.play();

                    let shipToCut = (foundShip.size === 2) ? "remainingTwo" : (foundShip.size === 3) ? "remainingThree" : (foundShip.size === 4) ? "remainingFour" : "remainingFive";
                    document.querySelector(`#${shipToCut}`).innerHTML--;
                    let totalLeft = 0;
                    document.querySelectorAll(".shipsLeft").forEach(count => { totalLeft += Number(count.innerHTML)});
                    if (totalLeft == 0){
                        document.querySelector("#endGame").style.visibility = "visible";
                    }
                }
                else{
                    image.src = "/Project/images/explosion.png";
                    image.className = "explosion";
                    const hit = new Audio('/Project/audio/hit.mp3');
                    hit.volume = 0.3;
                    hit.play();
                }
            }
        });

        return true;
    }
    else{
        return false;
    }
}

function DisplayShip(arr, foundShip){
    let startCell = document.getElementById(foundShip.startXY);
    let image = startCell.querySelector('img');
    image.src = "/Project/images/ship3.png";
    image.className = "ship";
    image.style.height = `${foundShip.size*50}px`;

    let explosionAnimated = document.createElement("img");
    explosionAnimated.src = "/Project/images/explosion.png";
    explosionAnimated.className = "explosionAnimated";
    
    let startId = foundShip.startXY;
    let [startX, startY] = startId.split(",").map(Number);
    
    if (arr[startX][startY+1] === foundShip.id){
        image.id = "rotated";
        image.style.top = `-${50*(foundShip.size-1)+5}%`;
        explosionAnimated.style.left = `${50*(foundShip.size-1)}%`;
        if (foundShip.size === 5){
            image.style.width = `${50*(foundShip.size-1)}px`;
            image.style.left = `50%`;
            image.style.top = `-${50*(foundShip.size-1)+10}%`;
        }
    }
    else{
        image.id = "normal";
        image.style.left = `-${50*(foundShip.size-1)+5}%`;
        explosionAnimated.style.top = `${50*(foundShip.size-1)}%`;
        if (foundShip.size === 5){
            image.style.left = `-${50*(foundShip.size-2)+5}%`;
            image.style.width = `${50*(foundShip.size-1)}px`;
            image.style.top = 0;
        }
    }
    startCell.append(explosionAnimated);

    document.querySelectorAll(".explosion").forEach(explosion => {
        let expId = explosion.parentElement.id;
        let [expX, expY] = expId.split(",").map(Number);
        if (arr[expX][expY] === foundShip.id){
            explosion.style.display = "none";
        }
    });

}

function UpdateRemainingShips(){
    let remaining = document.querySelector(".shipsRemaining");
    let shipInput = document.querySelectorAll(".shipCount");
    shipInput.forEach(input => {
        input.addEventListener("blur", () => {
            let shipCount = 0;
            shipInput.forEach(values => {
                shipCount += parseInt(values.value);
            });
            if (shipCount === 0){
                alert("צריך לבחור לפחות ספינה אחת")
            }
            else if (6-shipCount >= 0){
                remaining.innerHTML = `ספינות שנשארו לבחירה: ${6-shipCount}`;
            }
            else{
                input.value = 0;
                alert("אי אפשר לבחור יותר מ 6 ספינות בסך הכל");
            }
        })
    });
}

function StartGame(){
    let remaining = document.querySelector(".shipsRemaining");
    let btn = document.querySelector("button");
    btn.addEventListener("click", function(event){
        event.preventDefault();
        let shipTwo = Number(document.getElementById("ship2").value) || 0;
        let shipThree = Number(document.getElementById("ship3").value) || 0;
        let shipFour = Number(document.getElementById("ship4").value) || 0;
        let shipFive = Number(document.getElementById("ship5").value) || 0;

        let totalShips = shipTwo + shipThree + shipFour + shipFive;
       


        if (totalShips > 0 && totalShips <= 6){
            document.querySelector("#gameSettings").style.display = "none";
            document.querySelector("#board").style.visibility = "visible";
            document.dir = "ltr";
            let ships = []
            let id = 0;
            

            document.querySelector("#remainingTwo").innerHTML = `${shipTwo}`;
            document.querySelector("#remainingThree").innerHTML = `${shipThree}`;
            document.querySelector("#remainingFour").innerHTML = `${shipFour}`;
            document.querySelector("#remainingFive").innerHTML = `${shipFive}`;

            for (let i = 0; i < shipTwo; i++){ id++; ships.push(new Ship(id, 2))}
            for (let i = 0; i < shipThree; i++){ id++; ships.push(new Ship(id, 3))}
            for (let i = 0; i < shipFour; i++){ id++; ships.push(new Ship(id, 4))}
            for (let i = 0; i < shipFive; i++){ id++; ships.push(new Ship(id, 5))}
            let boardSize = document.querySelector('input[name="boardSize"]:checked').value;

            CreateBoard(boardSize, ships);
        }
        else if (totalShips === 0){
            alert("צריך לבחור לפחות ספינה אחת")
        }
    })
}

let link = document.getElementById('return_page');
const admin = JSON.parse(sessionStorage.getItem('loggedAdmin'));
if(admin){
    link.innerHTML = "חזרה לעמוד ניהול";
    link.href = "admin.html";
}

UpdateRemainingShips();
StartGame();
