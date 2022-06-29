const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');

const failAction = (request, header, erro) => {
    throw erro;
};


class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db;
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                },
            },
            handler: async (req, header) => {
                try {
                    const { skip, limit, nome } = req.query

                    const query = {
                        nome: {
                            $regex: `.*${nome}*.`
                        }
                    }

                    return this.db.read(nome ? query : {}, skip, limit)
                } catch (error) {
                    console.log(error);
                    return 'erro no server'
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {

                validate: {
                    failAction,
                    payload: {
                        nome: Joi.string().max(100).required(),
                        poder: Joi.string().max(100).required()
                    }
                },

            },
            handler: async (request) => {
                try {
                    const {nome, poder} = request.payload;
                    const results = await this.db.create({nome, poder});
                    return {
                        message: 'Heroi cadastrado com sucesso',
                        _id: results._id
                    }
                } catch (error) {
                    console.log('DEU RUIM');
                    return 'BO!';
                }
            }
        }
    }

}

module.exports = HeroRoutes;