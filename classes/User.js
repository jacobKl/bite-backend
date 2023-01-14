class User{
    constructor(password,nick,name,surname,isTrainer,email){
        this.id = 0
        this.password = password;
        this.nick = nick;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.money = 0;
        this.avatar = ""
        this.role = isTrainer === "on" ? "Trainer" : "User"
    }
}

module.exports = User