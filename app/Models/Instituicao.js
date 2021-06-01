'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Instituicao extends Model {

    static get table() {
        return 'instituicao'
    }

     static set primaryKey (id) {
         return id
     }
}

module.exports = Instituicao
