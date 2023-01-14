
const express = require("express")
const User = require("../classes/User")
const app = express()
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
    const { password, nick, name, surname, isTrainer, email } = req.body;
    const userExist = await database.userExist(nick, email);
    console.log(userExist)
    if (userExist) {
        res.end("user exists");
    } else {
        const user = new User(0, email, password, name, surname, "", isTrainer, 0, nick);
        database.registerUser(user);
        res.end("ok")
    }
})

router.get("/login", (req, res) => {
    res.sendFile(path.resolve("static/login.html"))
})

router.post("/login", async (req, res) => {
    const { password, username } = req.body;
    let user = await database.loginUser(username, password);
    req.session.user = user;
    console.log(req.session.user);
    res.end("ok")
})

router.get('/user', (req, res) => {
    if (req.session.user == undefined) {
        res.redirect("/user/login")
    }
    console.log(req.session.user);
    res.end(JSON.stringify(req.session.user))
})

module.exports = router;