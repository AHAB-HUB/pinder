
export default  class User {
    
    constructor(firstName  ="  ", lastName="  ", description=" ", email="  2 ", birthday=" ", password=" ", picture=" ", id=" ") {
        this.name = firstName + " " + lastName;
        this.description  = description;
        this.email = email;
        this.birthday = birthday;
        this.password = password;
        this.picture  = picture;
        this.id =  id;
    }
}