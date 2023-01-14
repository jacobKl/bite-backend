
const express = require("express")
const User = require("../classes/User")
const app = express()
const Database = require("../Database/UserDatabase")

const database = new Database()

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded())

router.get("/registery",(req,res)=>{
    res.send(`
    <form action="/user/registery" method="POST">
    <input name="username"/>
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

router.post("/registery",(req,res)=>{
    const {password,username,name,surname,isTrainer,email} = req.body;
    const user = new User(password,username,name,surname,isTrainer,email)
    database.registerUser(user)
    res.end("dodano użytkownika")
})

module.exports = router;