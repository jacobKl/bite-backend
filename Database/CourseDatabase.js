const Database = require("./Database");
const User = require("../classes/User")
const sql = require('yesql').pg;
const {Sequelize, QueryTypes} = require('sequelize');
const {Query} = require("pg");

module.exports = class CoursesDatabase {
    constructor(database) {
        this.database = database.provideDatabase()
    }

    indexCourses() {
        return new Promise(async (resolve, reject) => {
            const [results, metadata] = await this.database.sequelize.query(`SELECT *
                                                                             FROM courses`)

            resolve(results)
        })
    }

    getCourse(id) {
        return new Promise(async (resolve, reject) => {
            const [results, metadata] = await this.database.sequelize.query(`SELECT *
                                                                             FROM courses
                                                                             WHERE id = ${id}`)

            resolve(results)
        })
    }

    getCourseSteps(id) {
        return new Promise(async (resolve, reject) => {
            const [results, metadata] = await this.database.sequelize.query(`SELECT *
                                                                             FROM course_parts
                                                                             WHERE course_id = ${id}`)

            resolve(results)
        })
    }

    createCourse(course) {
        return new Promise(async (resolve, reject) => {
            const [results, metadata] = await this.database.sequelize.query(`INSERT INTO courses(trainer_id, name, description, image, prize, category, difficulty)
                                                                             VALUES (:trainer_id, :name, :description,
                                                                                     :image, :prize, :category,
                                                                                     :difficulty) RETURNING *`,
                {
                    replacements: {
                        trainer_id: course.trainer_id,
                        name: course.name,
                        description: course.description,
                        image: course.image,
                        prize: course.prize,
                        category: course.category,
                        difficulty: course.difficulty
                    },
                    type: QueryTypes.SELECT
                }
            )

            resolve(results)
        })
    }

    createCoursePart(coursePart) {
        return new Promise(async (resolve, reject) => {
            const [results, metadata] = await this.database.sequelize.query(`INSERT INTO course_parts(course_id, title, informations, video, questions, attachemnts, step)
                                                                             VALUES (:course_id, :title, :informations,
                                                                                     :video, :questions, :attachments,
                                                                                     :step) RETURNING *`,
                {
                    replacements: {
                        course_id: coursePart.course_id,
                        title: coursePart.title,
                        informations: coursePart.informations,
                        video: coursePart.video,
                        questions: coursePart.questions,
                        attachments: coursePart.attachments,
                        step: coursePart.step
                    },
                    type: QueryTypes.SELECT
                }
            )

            resolve(results)
        })
    }
}