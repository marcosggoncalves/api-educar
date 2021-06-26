'use strict'


/** @type {import('@adonisjs/lucid/src/Schema')} */


const Schema = use('Schema')

class AvaliadorSchema extends Schema {
  up () {
    this.create('avaliadores', (table) => {
      table.increments()
      table.string('nome')
      table.string('email')
      table.string('password')
      table.integer('trabalho_id')
      .unsigned()
      .references('id')
      .inTable('trabalhos')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('avaliadores')
  }
}

module.exports = AvaliadorSchema
