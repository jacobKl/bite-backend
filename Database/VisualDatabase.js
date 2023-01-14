const Database = require("./Database");
const Visual = require("../classes/Visual")
const {QueryTypes} = require("sequelize");
const sql = require('yesql').pg;

module.exports = class VisualDatabase extends Database {
    constructor() {
        super()
    }

    /**
     *
     * @param visual
     */
    createVisual(visual) {
        return new Promise(async (resolve, reject) => {
            const [results, metadata] = await this.sequelize.query(`INSERT INTO visuals(name, type, path)
                                                              VALUES (:name, :type, :path) RETURNING *`,
                {
                    replacements: {
                        name: visual.name,
                        type: visual.type,
                        path: visual.path
                    },
                    type: QueryTypes.SELECT
                }
            )

            resolve(results)
        })
    }
}