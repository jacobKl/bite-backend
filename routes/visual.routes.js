const express = require("express")
const Visual = require("../classes/Visual")
const app = express()
const Database = require("../Database/UserDatabase")
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')

const database = new Database()

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded())

router.post("/save", async (req, res) => {
    const form = formidable({})
    form.uploadDir = __dirname + "/../visuals/"
    form.parse(req, function (err, fields, files) {
        const name = files.file.originalFilename
        const type = files.file.mimeType
        const data = files.file.newFilename + files.file.originalFilename.substr(files.file.originalFilename.lastIndexOf(".") + 1)

        fs.rename(files.file.filepath, form.uploadDir + data, (err) => {})
    });
})

module.exports = router;