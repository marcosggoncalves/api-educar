'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstituicaoSchema extends Schema {
  up () {
    this.create('instituicao', (table) => {
      table.increments('id').primary()
      table.string('nome', 50)
      table.integer('cidade_id').unsigned()
      .references('id').inTable('cidades').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('instituicaos')
  }
}

module.exports = InstituicaoSchema
