const Database = require("./Database");
const Visual = require("../classes/Visual")
const sql = require('yesql').pg;

module.exports = class UserDatabase extends Database {
    constructor() {
        super()
    }
    /**
     *
     * @param {User} user
     */
    registerUser(user) {
        this.client.query(sql(`INSERT INTO users(name,surname,password,nick,email,role,avatar,money) 
        VALUES(:name, :surname, :password,:nick,:email,:role,'',0)`)(
            {
                name: user.name,
                surname: user.surname,
                password: user.password,
                nick: user.nick,
                email: user.email,
                role: user.role
            }
        ))
    }
}