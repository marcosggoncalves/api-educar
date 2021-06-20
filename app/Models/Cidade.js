'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Autor = use('App/Models/Autor')
class Cidade extends Model {

    static get table() {
        return 'cidades'
    }

    static get primaryKey() {
        return 'id'
    }

    autor() {
        return this.belongsTo(Autor)
    }

}

module.exports = Cidade
