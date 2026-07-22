export default class Ship{
    id;
    size;
    health;
    image;
    startXY;

    constructor(id, size, image, startXY){
        this.id = id;
        this.size = size;
        this.health = size;
        this.image = image;
        this.startXY = startXY;
    }
}