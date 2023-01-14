const express = require("express");
const app = express();

const PORT = 3000;

const user = require("./routes/user.routes")

//
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/user",user)

// 

app.get("/", (request, response) => {
    response.send("Hi there");
});

app.listen(PORT, () => {
    console.log("Listen on the port 3000...");
});