const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (request, response) => {
    response.send("Hi there");
});

app.listen(PORT, () => {
    console.log("Listen on the port 3000...");
});