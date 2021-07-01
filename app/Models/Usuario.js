'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class Usuario extends Model {
    static get table(){
        return 'usuario';
    }

    static boot() {
        super.boot()

        this.addHook('beforeSave', async (userInstance) => {
            if (userInstance.dirty.senha) {
                userInstance.senha = await Hash.make(userInstance.senha)
            }
        })
    }
}

module.exports = Usuario
