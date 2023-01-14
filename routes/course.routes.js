const express = require("express")
const Course = require("../classes/Course")
const app = express()
const Database = require("../Database/CourseDatabase")
const path = require('path')
var DatabaseProvider = require("../DatabaseProvider")()


const database = new Database(DatabaseProvider)

const router = express.Router()

router.post("/create", async (req, res) => {
    const {name, description, image, author, prize, category, difficulty, step} = req.body
    const course = new Course(name, description, image, author, prize, category, difficulty, step)

    const results = await database.createCourse(course)

    res.end(results)
})

module.exports = router;