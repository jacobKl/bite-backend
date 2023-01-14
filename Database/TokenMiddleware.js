var DatabaseProvider = require("../DatabaseProvider")()
const database = DatabaseProvider.provideDatabase()
const { QueryTypes } = require('sequelize')

async function verifyUser(req, res, next) {
    const [results, metadata] = await database.sequelize.query("SELECT * from users where token=:token", {
        replacements: { token: req.body.token },
        type: QueryTypes.SELECT
    })
    if (results) {
        next()
    } else {
        res.send(JSON.stringify({ status: "error", error: "Not authorized" }))
    }
}

module.exports = verifyUser