const express = require("express")
const Database = require("../Database/UserDatabase")
const database = new Database()

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded())

router.post('/', (req,res) => {
    console.log(req.body);
});

module.exports = router;