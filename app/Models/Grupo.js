'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Grupo extends Model {
    static get table(){
        return 'grupo';
    }
}

module.exports = Grupo
