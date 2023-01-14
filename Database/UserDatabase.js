const Database = require("./Database");
const User = require("../classes/User")
const UserToSend = require("../classes/UserToSend")
const sql = require('yesql').pg;
const { Sequelize, QueryTypes } = require('sequelize');
const { Query } = require("pg");
const bcrypt = require("bcrypt");

module.exports = class UserDatabase {
    constructor(database) {
        this.database = database.provideDatabase()
    }
    /**
     * 
     * @param {User} user 
     */
    registerUser(user) {
        bcrypt.hash(user.password, 10, (err, hash) => {
            this.database.sequelize.query(`INSERT INTO users(name,surname,password,nick,email,role,avatar,money) 
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

    loginUser(username, password) {
        return new Promise(async (resolve, reject) => {
            const [results, metadata] = await this.database.sequelize.query("SELECT * FROM users where nick=:username",
                {
                    replacements: {
                        username: username,
                    },
                    type: QueryTypes.SELECT
                }
            )
            bcrypt.compare(password, results.password, (err, result) => {
                const { password: _, ...parsedResults } = results
                if (result) resolve(new UserToSend(...Object.values(parsedResults)))
                else resolve(false)
            })
        })
    }

    async userExist(username, email) {
        const [results, metadata] = await this.database.sequelize.query("SELECT count(*) as existing FROM users WHERE nick=:nick OR email=:email",
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

    async editUser(name, surname, avatar, id) {
        this.database.sequelize.query("UPDATE users SET name=:name, surname=:surname, avatar=:avatar WHERE id=:id",
            {
                replacements: {
                    name: name,
                    avatar:avatar,
                    surname: surname,
                    id: id
                },
                type: QueryTypes.UPDATE
            }
        )
    }
}