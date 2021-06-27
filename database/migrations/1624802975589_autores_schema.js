'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AutoresSchema extends Schema {
  up () {
    this.create('autors', (table) => {
      table.increments('id').primary()
      table.integer('trabalho_id')
      .unsigned()
      .references('id')
      .inTable('trabalhos')
      .onUpdate('CASCADE')
      table.string('nome', 50)
      table.string('email')
      table.string('password')
      table.timestamps()
    })
  }

  down () {
    this.drop('autors')
  }
}

module.exports = AutoresSchema
