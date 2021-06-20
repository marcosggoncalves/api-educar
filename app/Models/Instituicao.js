'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Cidade = use('App/Models/Cidade')

class Instituicao extends Model {

    static get table() {
        return 'instituicao'
    }

     static get primaryKey () {
         return 'id'
     }

     cidade () {
         return this.hasOne(Cidade)
     }
     
}

module.exports = Instituicao
