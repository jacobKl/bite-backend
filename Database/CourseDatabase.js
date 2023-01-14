const Database = require("./Database");
const User = require("../classes/User")
const sql = require('yesql').pg;
const { Sequelize, QueryTypes } = require('sequelize');
const { Query } = require("pg");

module.exports = class CoursesDatabase extends Database {
    constructor() {
        super()
    }

    createCourse(course) {
        return new Promise(async (resolve, reject) => {
            const [results, metadata] = await this.sequelize.query(`INSERT INTO courses(name, description, image, author, prize, category, difficulty, step)
                                                              VALUES (:name, :description, :image, :author, :prize, :category, :difficulty, :step) RETURNING *`,
                {
                    replacements: {
                        name,
                        description,
                        image,
                        author,
                        prize,
                        category, difficulty, step
                    },
                    type: QueryTypes.SELECT
                }
            )

            resolve(results)
        })
    }
}