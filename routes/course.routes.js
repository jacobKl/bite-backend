
const express = require("express")
//const Course = require("../classes/Course")
const app = express()
const Database = require("../Database/UserDatabase")
const path = require('path')

const database = new Database()

const router = express.Router()

router.post("/attachment", async (req, res) => {

})

module.exports = router;