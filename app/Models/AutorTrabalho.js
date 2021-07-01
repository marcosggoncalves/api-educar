'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AutorTrabalho extends Model {
    static get table(){
        return 'autor_trabalho';
    }
}

module.exports = AutorTrabalho
