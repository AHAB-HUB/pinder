export default class Pets{
    
    constructor(name, birthday, gender, picture, description, id, type, likes, comments) {
        this.name = name;
        this.birthday =  new Date(birthday).toLocaleDateString();
        this.gender = gender;
        this.name = name;
        this.picture = picture;
        this.description = description;
        this.id  = id;
        this.type =  type;
        this.likes = likes;
        this.comments = comments;
    }
}