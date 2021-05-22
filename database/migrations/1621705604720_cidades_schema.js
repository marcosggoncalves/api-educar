'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CidadesSchema extends Schema {
  up () {
    this.create('cidades', (table) => {
      table.increments('id').primary()
      table.string('nome', 50)
      table.string('uf', 20)
      table.timestamps()
    })
  }

  down () {
    this.drop('cidades')
  }
}

module.exports = CidadesSchema
