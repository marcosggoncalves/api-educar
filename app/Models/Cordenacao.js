'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cordenacao extends Model {
    
    avaliador() {
        return this.hasMany('App/Models/Avaliador')
    }

}

module.exports = Cordenacao
