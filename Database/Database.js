const { Client } = require("pg")
const { Sequelize } = require("sequelize");

class Database {
    constructor() {
        this.client = null
        this.connect()
        this.sequelize = null
        this.connect2()
    }

    connect() {
        this.client = new Client("postgres://ulggddmr:jnIE26VYpYQCqEXa9MH7e07ZjUVUczqE@snuffleupagus.db.elephantsql.com/ulggddmr")
        this.client.connect()
    }

    async connect2() {
        this.sequelize = new Sequelize("postgres://ulggddmr:jnIE26VYpYQCqEXa9MH7e07ZjUVUczqE@snuffleupagus.db.elephantsql.com/ulggddmr")
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

module.exports = Database