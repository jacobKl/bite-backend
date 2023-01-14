const Database = require("./Database");
const User = require("../classes/User")

module.exports = class UserDatabase extends Database{
    constructor(){
        super()
    }
    /**
     * 
     * @param {User} user 
     */
    registerUser(user){
        this.client.query(`INSERT INTO users(name,surname,password,nick,email,role,avatar,money) 
        VALUES('${user.name}','${user.surname}','${user.password}','${user.nick}','${user.email}','${user.role}','',0)`)
    }
}