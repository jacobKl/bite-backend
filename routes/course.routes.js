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

    results['steps'] = tab

    res.send(results)
})

router.get("/", async (req, res) => {
    const courses = await database.indexCourses()

    for(let i in courses) {
        courses[i]['steps'] = await database.getCourseSteps(courses[i]['id'])
    }

    res.send(courses)
})

router.get("/:id", async (req, res) => {
    const course = await database.getCourse(req.params.id)

    course[0]['steps'] = await database.getCourseSteps(course[0]['id'])

    res.send(course[0])
})

module.exports = router;