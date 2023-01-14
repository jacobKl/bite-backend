const Database = require("./Database");
const User = require("../classes/User")
const sql = require('yesql').pg;
const { Sequelize, QueryTypes } = require('sequelize');
const { Query } = require("pg");
const bcrypt = require("bcrypt");

module.exports = class UserDatabase extends Database {
    constructor() {
        super()
    }
    /**
     * 
     * @param {User} user 
     */
    registerUser(user) {
        bcrypt.hash(user.password,10,(err,hash)=>{
            this.client.query(sql(`INSERT INTO users(name,surname,password,nick,email,role,avatar,money) 
            VALUES(:name, :surname, :password,:nick,:email,:role,'',0)`)(
                {
                    name: user.name,
                    surname: user.surname,
                    password: hash,
                    nick: user.nick,
                    email: user.email,
                    role: user.role
                }
            ))
        })
        
    }

    getUser(username, password) {
        return new Promise((resolve, reject) => {
            
            this.client.query(sql("SELECT * FROM users where nick=:username")(
                {
                    username: username,
                }
            ), (err, res) => {
                bcrypt.compare(password,res.rows[0].password,(err,result)=>{
                    if(result && res.rows.length > 0) resolve(res.rows[0])
                    else resolve(false)
                })
            })
        })
    }

    async userExist(username, email) {
        const [results, metadata] = await this.sequelize.query("SELECT count(*) as existing FROM users WHERE nick=:nick OR email=:email",
            {
                replacements: { nick: username, email: email },
                type: QueryTypes.SELECT
            })
        if (parseInt(results.existing) > 0) {
            return true;
        } else {
            return false;
        }
    }

    async loginUser(username, password) {
        const [results, metadata] = await this.sequelize.query("SELECT * FROM users WHERE nick=:nick AND password=:pass LIMIT 1",
            {
                replacements: { nick: username, pass: password },
                type: QueryTypes.SELECT
            })
        if (results) {
            new User(...Object.values(results));
        }
        
    }
}