'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Avaliador extends Model {

    trabalhos() {
        return this.belongsTo('App/Models/Trabalho')
    }
    
}

module.exports = Avaliador
