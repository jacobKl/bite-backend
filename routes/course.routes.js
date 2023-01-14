const express = require("express")
const Course = require("../classes/Course")
const app = express()
const Database = require("../Database/CourseDatabase")
const path = require('path')
const verifyUser = require("../Database/TokenMiddleware")
var DatabaseProvider = require("../DatabaseProvider")()


const database = new Database(DatabaseProvider)

const router = express.Router()

router.post("/create", verifyUser, async (req, res) => {
    const { trainer_id, name, description, image, prize, category, difficulty } = req.body
    const course = new Course(trainer_id, name, description, image, prize, category, difficulty)

    const steps = req.body.steps
    console.log(steps)
    const results = await database.createCourse(course)

    res.send(results)
})

module.exports = router;