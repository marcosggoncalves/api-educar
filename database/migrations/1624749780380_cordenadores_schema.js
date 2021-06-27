'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CordenadoresSchema extends Schema {
  up () {
    this.create('cordenadores', (table) => {
      table.increments()
      table.string('nome')
      table.string('password')
      table.string('email')
      table.integer('avaliador_id')
      .unsigned()
      .references('id')
      .inTable('avaliadores')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
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
    this.drop('cordenadores')
  }
}

module.exports = CordenadoresSchema
