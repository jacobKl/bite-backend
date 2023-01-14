const express = require("express")
const User = require("../classes/User")
const app = express()
const Validator = require("../classes/Validator")
const Database = require("../Database/UserDatabase")
const path = require('path')
const formidable = require('formidable')
const fs = require('fs');
var DatabaseProvider = require("../DatabaseProvider")()
const verifyUser = require('../Database/TokenMiddleware')

const database = new Database(DatabaseProvider)

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded())

router.get("/registery", (req, res) => {
    res.sendFile(path.resolve("static/register.html"))
})

router.post("/registery", async (req, res) => {
    const {
        password,
        nick,
        name,
        surname,
        isTrainer,
        email
    } = req.body;
    const isEmail = Validator.validateEmail(email)

    if (!Validator.checkIfNotEmpty(password, nick, name, surname, email)) {
        res.end(JSON.stringify({ status: "error", error: "Któreś z pól jest puste" }))
        return
    }

    if (!isEmail) {
        res.end(JSON.stringify({ status: "error", error: "Email nie jest poprawny" }))
        return
    }

    const userExist = await database.userExist(nick, email);
    if (userExist) {
        res.end(JSON.stringify({ status: "error", error: "Użytkownik już istnieje" }));
    } else {
        const user = new User(0, email, password, name, surname, "", isTrainer, 0, nick);
        let parsedUser = await database.registerUser(user);
        res.end(JSON.stringify(parsedUser))
    }
})

router.get("/login", (req, res) => {
    res.sendFile(path.resolve("static/login.html"))
})

router.post("/login", async (req, res) => {
    const {
        password,
        username
    } = req.body;

    if (!Validator.checkIfNotEmpty(password, username)) {
        res.end(JSON.stringify({ status: "error", error: "Któreś z pól jest puste" }))
        return
    }

    let user = await database.loginUser(username, password)

    if (!user) {
        res.end(JSON.stringify({ status: "error", error: "Nie poprawne hasło lub nazwa użytkownika" }))
        return
    }

    req.session.user = user;
    console.log(req.session.user)
    res.end(JSON.stringify(user))
})

router.post("/edit", verifyUser, (req, res) => {
    const form = formidable({})
    form.uploadDir = __dirname + "/../static/"
    form.parse(req, async function (err, fields, files) {

        const { name, surname } = fields

        if (!req.session.user) {
            res.send(JSON.stringify({ status: "error", error: "Użytkownik nie jest zalogowany" }))
            return
        }

        fs.rename(files.avatar.filepath, form.uploadDir + files.avatar.originalFilename, (err) => { })
        database.editUser(name, surname, files.avatar.originalFilename, req.session.user.id)

        res.end(JSON.stringify({
            name: name,
            surname: surname,
            avatar: files.avatar.originalFilename
        }))

    });
})

module.exports = router;