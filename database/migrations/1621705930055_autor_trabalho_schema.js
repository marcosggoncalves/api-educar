'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AutorTrabalhoSchema extends Schema {
  up () {
    this.create('autor_trabalhos', (table) => {
      table.increments('id').primary()
      table.integer('trabalho_id').unsigned().references('id').inTable('trabalhos')
      table.integer('autor_id').unsigned().references('id').inTable('autores')
      table.timestamps()
    })
  }

  down () {
    this.drop('autor_trabalhos')
  }
}

module.exports = AutorTrabalhoSchema
