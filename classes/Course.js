class Course {
    constructor(name, description, image = '', author = '', prize = '', category = '', difficulty = '') {
        this.name = name;
        this.description = description;
        this.image = image;
        this.author = author;
        this.prize = prize;
        this.category = category;
        this.difficulty = difficulty
    }
}

module.exports = User