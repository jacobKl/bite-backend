const express = require("express")
const Course = require("../classes/Course")
const app = express()
const Database = require("../Database/CourseDatabase")
const path = require('path')
const {data} = require("express-session/session/cookie");
var DatabaseProvider = require("../DatabaseProvider")()


const database = new Database(DatabaseProvider)

const router = express.Router()

router.post("/create", async (req, res) => {
    const {trainer_id, name, description, image, prize, category, difficulty} = req.body
    const course = new Course(trainer_id, name, description, image, prize, category, difficulty)

    const steps = req.body.steps
    const results = await database.createCourse(course)

    let tab = []
    steps.forEach(step => {
        step['course_id'] = results['id']
        step['questions'] = JSON.stringify(step['questions'])

        database.createCoursePart(step)
        tab.push(step)
    })

    console.log(tab)

    res.send(results)
})

module.exports = router;