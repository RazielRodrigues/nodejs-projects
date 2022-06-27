const BaseRoute = require('./base/baseRoute');

class HeroRoutes extends BaseRoute{
    constructor(db) {
        super()
        this.db = db;
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (req, header) => {
                try {
                    const { skip, limit, nome } = req.query
                    let query = {}

                    if (nome) query.nome = nome;
                    if (isNaN(skip) && skip) throw Error("Tipo incorreto")
                    if (isNaN(limit) && limit) throw Error("Tipo incorreto")

                    return this.db.read(query, parseInt(skip), parseInt(limit))
                } catch (error) {
                    console.log(error);
                    return 'erro no server'
                }
            }
        }
    }
}

module.exports = HeroRoutes;