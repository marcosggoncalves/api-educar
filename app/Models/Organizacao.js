'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Organizacao extends Model {

    static get table() {
        return 'organizations'
    }

    static set primaryKey() {
        return 'id'
    }
}

module.exports = Organizacao
