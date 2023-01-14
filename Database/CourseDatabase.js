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
            const [results, metadata] = await this.sequelize.query(`INSERT INTO courses(trainer_id, name, description, image, prize, category, difficulty)
                                                              VALUES (:trainer_id, :name, :description, :image, :prize, :category, :difficulty) RETURNING *`,
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