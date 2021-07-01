'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Trabalho extends Model {
    static get table(){
        return 'trabalho';
    }
}

module.exports = Trabalho
