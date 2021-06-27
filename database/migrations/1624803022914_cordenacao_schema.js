'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CordenadoresSchema extends Schema {
  up () {
    this.create('cordenacaos', (table) => {
      table.increments()
      table.string('nome')
      table.string('password')
      table.string('email')
      table.string('status')
      table.integer('avaliador_id')
      .unsigned()
      .references('id')
      .inTable('avaliadors')
      .onUpdate('CASCADE')
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
    this.drop('cordenacaos')
  }
}

module.exports = CordenadoresSchema
