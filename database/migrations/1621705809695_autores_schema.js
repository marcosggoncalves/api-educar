'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AutoresSchema extends Schema {
  up () {
    this.create('autores', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('autores')
  }
}

module.exports = AutoresSchema
