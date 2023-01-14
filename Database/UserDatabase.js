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
            this.sequelize.query(`INSERT INTO users(name,surname,password,nick,email,role,avatar,money) 
            VALUES(:name, :surname, :password,:nick,:email,:role,'',0)`,
                {
                    replacements: {
                        name: user.name,
                        surname: user.surname,
                        password: hash,
                        nick: user.nick,
                        email: user.email,
                        role: user.role
                    },
                    type: QueryTypes.INSERT
                }  
            )
        })
        
    }

    getUser(username, password) {
        return new Promise(async (resolve, reject) => {
            
            const [results, metadata] = await this.sequelize.query("SELECT * FROM users where nick=:username",
            {
                replacements: {
                    username: username,
                },
                type: QueryTypes.SELECT
            }           
            )
            bcrypt.compare(password,results.password,(err,result)=>{
                if(results) resolve(results)
                else resolve(false)
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
            return new User(...Object.values(results));
        }
        
    }

    async editUser(name,surname,avatar,id){
        this.sequelize.query("UPDATE users SET name=:name, surname=:surname WHERE id=:id",
            {
                replacements:{
                    name:name,
                    surname:surname,
                    id:id
                },
                type:QueryTypes.UPDATE
            }
        )
    }
}