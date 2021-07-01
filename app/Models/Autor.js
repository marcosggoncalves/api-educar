'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Autor extends Model {
    static get table(){
        return 'autor';
    }
}

module.exports = Autor
