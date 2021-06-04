'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cidade extends Model {

    static get table() {
        return 'cidades'
    }

    static set primaryKey() {
        return 'id'
    }
}

module.exports = Cidade
