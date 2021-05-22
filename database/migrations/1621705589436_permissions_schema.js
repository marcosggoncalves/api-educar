'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissionsSchema extends Schema {
  up () {
    this.create('permissions', (table) => {
      table.increments('id')
      table.string('nome', 50)
      table.string('rota_api', 50)
      table.string('rota_web', 50)
      table.string('is_menu', 50)
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('permissions')
  }
}

module.exports = PermissionsSchema
