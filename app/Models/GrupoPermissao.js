'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class GrupoPermissao extends Model {
    static get table(){
        return 'grupo_permissao';
    }
}

module.exports = GrupoPermissao
