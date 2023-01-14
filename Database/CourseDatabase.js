const Database = require("./Database");
const User = require("../classes/User")
const sql = require('yesql').pg;
const { Sequelize, QueryTypes } = require('sequelize');
const { Query } = require("pg");

module.exports = class CoursesDatabase {
    constructor(database) {
        this.database = database.provideDatabase()
    }

    createCourse(course) {
        return new Promise(async (resolve, reject) => {
            const [results, metadata] = await this.database.sequelize.query(`INSERT INTO courses(name, description, image, author, prize, category, difficulty, step)
                                                              VALUES (:name, :description, :image, :author, :prize, :category, :difficulty, :step) RETURNING *`,
                {
                    replacements: {
                        trainer_id: course.trainer_id,
                        name: course.name,
                        description: course.description,
                        image: course.image,
                        prize: course.prize,
                        category: course.category,
                        difficulty: course.difficulty,
                        step: course.step
                    },
                    type: QueryTypes.SELECT
                }
            )

            resolve(results)
        })
    }
}