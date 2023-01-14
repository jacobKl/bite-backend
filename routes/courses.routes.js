const express = require("express")
const Database = require("../Database/UserDatabase")

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded())

router.post('/', (req, res) => {
    const { name, description, prize, steps } = req.body;
    const course = new Course(name, description, image, author, prize, category, difficulty);
});

module.exports = router;