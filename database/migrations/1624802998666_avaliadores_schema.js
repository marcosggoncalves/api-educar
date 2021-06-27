'use strict'


/** @type {import('@adonisjs/lucid/src/Schema')} */


const Schema = use('Schema')

class AvaliadoresSchema extends Schema {
  up () {
    this.create('avaliadors', (table) => {
      table.increments()
      table.string('nome')
      table.string('email')
      table.string('password')
      table.integer('trabalho_id')
      .unsigned()
      .references('id')
      .inTable('trabalhos')
      .onUpdate('CASCADE')
      table.integer('autor_id')
      .unsigned()
      .references('id')
      .inTable('autors')
      .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('avaliadors')
  }
}

module.exports = AvaliadoresSchema
