import Ship from "./models/ship.js"

const board = document.getElementById("board");
let size = 12;

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
    if (i % size === 11)
    {
        y = 0;
        x++;
    }
    else{
        y++;
    }
    
    board.appendChild(cell);
    cell.addEventListener("click", function(){
    
        if (BlowUp(cell.id)){
            cell.style.backgroundColor = "orange";
        }
        else{
            cell.style.backgroundColor = "lightblue";
        }
    
    });
}

let ship = new Ship(1, 3, "", "1,1");
let ships = [ship];
const arr = [];

for (let i = 0; i < size; i++) {
    arr[i] = [];
    for (let j = 0; j < size; j++) {
        arr[i][j] = 0;
    }
}

arr[1][1] = 1;
arr[1][2] = 1;
arr[1][3] = 1;


function BlowUp(xy){
    let mid = xy.indexOf(",");
    let x = parseInt(xy.substring(0,mid));
    let y = parseInt(xy.substring(mid+1));
    if (arr[x][y] > 0){
        let shipId = arr[x][y];
        const foundShip = ships.find(ship => ship.id === shipId);
        foundShip.health--;

        let cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            if (cell.id === xy){
                if (foundShip.health <= 0){
                    let startCell = document.getElementById(foundShip.startXY);
                    let image = startCell.querySelector('img');
                    image.src = "/Project/images/ship3.png";
                    image.className = "ship";
                    image.id = "rotated";
                    
                }
                else{
                    let image = cell.querySelector('img');
                    image.src = "/Project/images/explosion.png";
                }
            }
        });

        return true;
    }
    else{
        return false;
    }
}