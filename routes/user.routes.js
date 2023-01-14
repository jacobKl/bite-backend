
const express = require("express")
const User = require("../classes/User")
const app = express()
const Database = require("../Database/UserDatabase")

const database = new Database()

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded())

router.get("/registery", (req, res) => {
    res.send(`
    <form action="/user/registery" method="POST">
    <input name="nick"/>
    <input name="password"/>
    <input name="name"/>
    <input name="surname"/>
    <input name="email"/>
    <input name="isTrainer" type="checkbox"/>
    <button type="submit">Wyślij</button>
    </form>
    `)
    res.end()
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
    res.send(`
    <form action="/user/login" method="POST">
    <input name="username"/>
    <input name="password"/>
    <button type="submit">Wyślij</button>
    </form>
    `)
    res.end()
})

router.post("/login", async (req, res) => {
    const { password, username } = req.body;
    let user = await database.getUser(username, password)
    user = user[0]
    const userObject = new User(user.password, user.nick, user.name, user.surname, user.role, user.email);

    res.send(JSON.stringify(user))
})

router.post("/loginuser", async (req, res) => {
    const { password, username } = req.body;
    await database.loginUser(username, password)


    res.send("gonwo")
})

module.exports = router;