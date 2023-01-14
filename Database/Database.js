const {Client} = require("pg")
const yesql = require('yesql').pg;

class Database{
    constructor(){
        this.client = null
        this.connect()
    }

    connect(){
        this.client = new Client("postgres://ulggddmr:jnIE26VYpYQCqEXa9MH7e07ZjUVUczqE@snuffleupagus.db.elephantsql.com/ulggddmr")
        this.client.connect()
    }
    
}

module.exports = Database