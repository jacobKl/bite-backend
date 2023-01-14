const express = require("express")
const Course = require("../classes/Course")
const app = express()
const Database = require("../Database/CourseDatabase")
const path = require('path')

const database = new Database()

const router = express.Router()

router.post("/create", async (req, res) => {
    const {trainer_id, name, description, image, prize, category, difficulty} = req.body
    const course = new Course(trainer_id, name, description, image, prize, category, difficulty)

    const steps = req.body.steps
    console.log(steps)
    const results = await database.createCourse(course)

    res.send(results)
})

module.exports = router;