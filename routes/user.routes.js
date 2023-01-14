
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
    //Walidacja wszystkich pól
    //hashowanie haseł
    const { password, nick, name, surname, isTrainer, email } = req.body;
    const isEmail = validateEmail(email)

    if(!checkIfNotEmpty(password, nick, name, surname, email)){
        res.end("Któreś z pól jest puste")
        return
    }

    if(!isEmail){
        res.end("Email nie jest poprawny")
        return
    }

    const userExist = await database.userExist(nick, email);
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
    
    if(!checkIfNotEmpty(password,username)){
        res.end("Któreś z pól jest puste")
        return
    }

    let user = await database.getUser(username, password)

    if(!user){
        res.end("Nie poprawne hasło lub nazwa użytkownika")
        return
    }

    const userObject = new User(user.id,user.email,user.password, user.name, user.surname, user.avatar,user.role, user.money, user.nick);

    res.send(JSON.stringify(userObject))
})

router.post("/loginuser", async (req, res) => {
    const { password, username } = req.body;
    await database.loginUser(username, password)


    res.send("gonwo")
})

function checkIfNotEmpty(...items){
    let isNotEmpty = true
    items.forEach(item =>{
        if(item.length === 0){
            isNotEmpty = false
        }
    })
    return isNotEmpty
}
function validateEmail(email){
if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true
else return false
}


module.exports = router;