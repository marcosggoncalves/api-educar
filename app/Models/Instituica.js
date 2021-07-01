'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Instituica extends Model {
    static get table(){
        return 'instituicao';
    }
}

module.exports = Instituica
