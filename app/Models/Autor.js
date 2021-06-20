'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Autor extends Model {

    static get table() {
        return 'autores'
    }

    static get primaryKey() {
        return 'id'
    }
    cidade(){
        return this.belongsTo('App/Models/Cidade')
    }
}


module.exports = Autor
