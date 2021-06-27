'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cordenacao extends Model {
    
    avaliador() {
        return this.hasMany('App/Models/Avaliador')
    }
    trabalhos() {
        return this.hasMany('App/Models/Trabalho')
    }
    autores(){
        return this.hasMany('App/Models/Autor')
    }

}

module.exports = Cordenacao
