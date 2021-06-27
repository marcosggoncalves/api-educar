'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Trabalho extends Model {

    autor() {
        return this.belongsTo('App/Models/Autor')
    }
    
    avaliadores() {
        return this.hasMany('App/Models/Avaliador')
    }
}

module.exports = Trabalho
