const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const boom = require('boom');

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
                    return boom.internal()
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
                    const { nome, poder } = request.payload;
                    const results = await this.db.create({ nome, poder });
                    return {
                        message: 'Heroi cadastrado com sucesso',
                        _id: results._id
                    }
                } catch (error) {
                    return boom.internal()
                }
            }
        }
    }

    delete() {
        return {
            path: 'herois/{id}',
            method: 'DELETE',
            config: {
                failAction,
                validate: {
                    params: {
                        id: Joi.string().required
                    },
                },
            },
            handler: async (request) => {
                try {
                    const { id } = request.params;
                    const resultado = await this.db.delete(id);
                    if (resultado.n !== 1) {
                        return boom.preconditionFailed('nao achou no banco')
                    }
                    return {
                        message: 'Heroi removido com sucesso'
                    }
                } catch (error) {
                    return boom.internal()
                }
            }
        }
    }

}

module.exports = HeroRoutes;