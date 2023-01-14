class Course {
    constructor(trainer_id, name, description, image = '', prize = '', category = '', difficulty = '') {
        this.trainer_id = trainer_id
        this.name = name;
        this.description = description;
        this.image = image;
        this.prize = prize;
        this.category = category;
        this.difficulty = difficulty
    }
}

module.exports = Course