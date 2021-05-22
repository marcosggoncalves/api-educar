'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioSchema extends Schema {
  up () {
    this.create('usuarios', (table) => {
      table.increments('id')
      table.string('nome', 50)
      table.string('senha', 50)
      table.string('email', 50)
      table.string('tipo_usuario', 50)
      table.timestamps()
    })
  }

  down () {
    this.drop('usuarios')
  }
}

module.exports = UsuarioSchema
