const Database = require("./Database");
const Visual = require("../classes/Visual")
const sql = require('yesql').pg;

module.exports = class UserDatabase extends Database {
    constructor() {
        super()
    }
    /**
     *
     * @param visual
     */
    createVisual(visual) {
        this.client.query(sql(`INSERT INTO visuals(name, type, data) 
        VALUES(:name, :surname, :password,:nick,:email,:role,'',0)`)(
            {
                name: visual.name,
                type: visual.type,
                data: visual.data
            }
        ))
    }
}