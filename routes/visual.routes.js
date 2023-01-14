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
    form.uploadDir = __dirname + "/../visuals/"
    form.parse(req, async function (err, fields, files) {
        const name = files.file.originalFilename
        const type = files.file.mimetype
        const path = files.file.newFilename + files.file.originalFilename.substr(files.file.originalFilename.lastIndexOf("."))

        const visual = new Visual(name, type, path)
        const results = await database.createVisual(visual)

        fs.rename(files.file.filepath, form.uploadDir + path, (err) => {})

        res.send(results)
    });
})

module.exports = router;