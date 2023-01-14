const express = require("express")
const Visual = require("../classes/Visual")
const app = express()
const Database = require("../Database/VisualDatabase")
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
var DatabaseProvider = require("../DatabaseProvider")()


const database = new Database(DatabaseProvider)

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded())

router.post("/save", (req, res) => {
    const form = formidable({})
    form.uploadDir = __dirname + "/../static/"
    form.parse(req, async function (err, fields, files) {

        fs.rename(files.file.filepath, form.uploadDir + files.file.originalFilename, (err) => {})

        res.send({
            name: files.file.originalFilename
        })
    });
})

module.exports = router;