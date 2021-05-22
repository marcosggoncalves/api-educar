'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstituicaoSchema extends Schema {
  up () {
    this.create('instituicaos', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('instituicaos')
  }
}

module.exports = InstituicaoSchema
