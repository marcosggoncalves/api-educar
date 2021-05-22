'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TrabalhosSchema extends Schema {
  up () {
    this.create('trabalhos', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('trabalhos')
  }
}

module.exports = TrabalhosSchema
