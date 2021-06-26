'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Autor extends Model {

   trabalho() {
       return this.belongsTo('App/Models/Trabalho')
   }
}


module.exports = Autor
