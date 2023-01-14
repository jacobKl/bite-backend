const Database = require("./Database");
const User = require("../classes/User")
const sql = require('yesql').pg;
const { Sequelize, QueryTypes } = require('sequelize');
const { Query } = require("pg");

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

    getUser(username, password) {
        return new Promise((resolve, reject) => {
            this.client.query(sql("SELECT * FROM users where nick=:username and password=:password")(
                {
                    username: username,
                    password: password
                }
            ), (err, res) => {
                resolve(res.rows)
            })
        })
    }

    async userExist(username, email) {
        const [results, metadata] = await this.sequelize.query("SELECT count(*) as existing FROM users WHERE nick=:nick AND email=:email",
            {
                replacements: { nick: username, email: email },
                type: QueryTypes.SELECT
            })
        console.log(parseInt(results.existing));
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
        console.log(results);
        if (results) {
            new User(...Object.values(results));
        }
        // if (metadata == 1) {
        //     console.log(results);
        // } else {
        //     console.log("error");
        // }
    }
}