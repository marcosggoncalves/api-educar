'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AutoresSchema extends Schema {
  up () {
    this.create('autores', (table) => {
      table.increments('id').primary()
      table.integer('trabalho_id')
      .unsigned()
      .references('id')
      .inTable('trabalhos')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      table.string('nome', 50)
      table.string('email')
      table.integer('cidade_id')
      .unsigned()
      .references('id')
      .inTable('cidades')
      .onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('autores')
  }
}

module.exports = AutoresSchema
