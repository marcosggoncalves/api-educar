'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CordenacaoSchema extends Schema {
  up () {
    this.create('cordenacao', (table) => {
      table.increments()
      table.string('nome')
      table.string('email')
      table.string('password')
      table.integer('avaliador_id')
      .unsigned()
      .references('id')
      .inTable('trabalhos')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('cordenacaos')
  }
}

module.exports = CordenacaoSchema
