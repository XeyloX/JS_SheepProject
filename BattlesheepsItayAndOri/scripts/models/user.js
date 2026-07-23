export default class User {

    username;
    password;
    picture;
    first;
    last;
    email;
    date;
    city;
    street;
    housenum;

    constructor(username, password, picture, first, last, email, date, city, street, housenum){
        this.username = username;
        this.password = password;
        this.picture = picture;
        this.first = first;
        this.last = last;
        this.email = email;
        this.date = date;
        this.city = city;
        this.street = street;
        this.housenum = housenum;
    }


    static GetFullName(user){
        return `${user.first} ${user.last}`;
    }
    static GetBirthdate(user){
        const year = user.date.substring(0,4);
        const day = user.date.substring(8);
        const m = parseInt(user.date.substring(6,8));
        const month = (m == 1) ? "ינואר" : (m == 2) ? "פברואר" : (m == 3) ? "מרץ" : (m == 4) ? "אפריל" : (m == 5) ? "מאי" : (m == 6) ? "יוני" : (m == 7) ? "יולי" : (m == 8) ? "אוגוסט" : (m == 9) ? "ספטמבר" : (m == 10) ? "אוקטובר" : (m == 11) ? "נובמבר" : "דצמבר"; 

        return `${day} ${month} ${year}`;
    }

    UpdateDetails(username, password, picture, first, last, email, date, city, street, housenum){
        this.username = username;
        this.password = password;
        this.picture = picture;
        this.first = first;
        this.last = last;
        this.email = email;
        this.date = date;
        this.city = city;
        this.street = street;
        this.housenum = housenum;

        return this;
    }
}