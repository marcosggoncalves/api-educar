'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AutorTrabalhoSchema extends Schema {
  up () {
    this.create('autor_trabalhos', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('autor_trabalhos')
  }
}

module.exports = AutorTrabalhoSchema
