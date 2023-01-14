
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
})

router.get("/login",(req,res)=>{
    res.send(`
    <form action="/user/login" method="POST">
    <input name="username"/>
    <input name="password"/>
    <button type="submit">Wyślij</button>
    </form>
    `)
    res.end()
})

router.post("/login", async (req,res)=>{
    const {password,username} = req.body;
    let user = await database.getUser(username,password)
    user = user[0]
    const userObject = new User(user.password,user.nick,user.name,user.surname,user.role,user.email);
    
    res.send(JSON.stringify(user))
})

module.exports = router;