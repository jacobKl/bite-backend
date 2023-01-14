const Database = require("./Database");
const User = require("../classes/User")
const sql = require('yesql').pg;

module.exports = class UserDatabase extends Database{
    constructor(){
        super()
    }
    /**
     * 
     * @param {User} user 
     */
    registerUser(user){
        this.client.query(sql(`INSERT INTO users(name,surname,password,nick,email,role,avatar,money) 
        VALUES(:name, :surname, :password,:nick,:email,:role,'',0)`)(
            {
                name: user.name,
                surname: user.surname,
                password:user.password,
                nick:user.nick,
                email:user.email,
                role:user.role
            }
        ))
    }

    getUser(username,password){
        return new Promise((resolve,reject) =>{
            this.client.query(sql("SELECT * FROM users where nick=:username and password=:password")(
                {
                    username: username,
                    password: password
                }
            ),(err,res)=>{
                resolve(res.rows)
            })
        })
        
    }
}