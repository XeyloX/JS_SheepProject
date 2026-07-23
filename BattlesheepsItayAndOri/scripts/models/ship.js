export default class Ship{
    id;
    size;
    health;
    image;
    startXY;

    constructor(id, size){
        this.id = id;
        this.size = size;
        this.health = size;
        this.image = "";
        this.startXY = "";
    }
}