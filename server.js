const express = require("express");
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();

const PORT = 3001;

const user = require("./routes/user.routes")

//
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'fjsifuihsihfdsjioje' }));
app.use(cookieParser());

app.use("/user", user)
// 

app.get("/", (request, response) => {
    response.send("Hi there");
});

app.listen(PORT, () => {
    console.log("Listen on the port 3000...");
});