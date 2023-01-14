const express = require("express")
const User = require("../classes/User")
const app = express()
const Validator = require("../classes/Validator")
const Database = require("../Database/UserDatabase")
const path = require('path')

const database = new Database()

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded())

router.get("/registery", (req, res) => {
    res.sendFile(path.resolve("static/register.html"))
})

router.post("/registery", async (req, res) => {
    //Walidacja wszystkich pól
    //hashowanie haseł
    const {
        password,
        nick,
        name,
        surname,
        isTrainer,
        email
    } = req.body;
    const isEmail = Validator.validateEmail(email)

    if (!ValidatorcheckIfNotEmpty(password, nick, name, surname, email)) {
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
        database.registerUser(user);
        res.end(JSON.stringify({ status: "success" }))
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
    res.end(JSON.stringify(user))
})

router.get('/user', (req, res) => {
    if (req.session.user == undefined) {
        res.redirect("/user/login")
    }
    console.log(req.session.user);
    res.end(JSON.stringify(req.session.user))
})

router.get("/logout", (req, res) => {
    req.session.destroy()
    res.end(JSON.stringify({ message: "Wylogowano" }))
})

router.get("/edit", (req, res) => {
    res.sendFile(path.resolve("static/edit.html"))
})

router.post("/edit", (req, res) => {
    const { name, surname, avatar } = req.body
    if (!req.session.user) {
        res.send(JSON.stringify({ status: "error", error: "Użytkownik nie jest zalogowany" }))
        return
    }
    database.editUser(name, surname, "", req.session.user.id)
    res.end(JSON.stringify({
        name: name,
        surname: surname,
        avatar: avatar
    }))
})


module.exports = router;