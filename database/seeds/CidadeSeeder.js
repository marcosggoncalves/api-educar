'use strict'

/*
|--------------------------------------------------------------------------
| CidadeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
class CidadeSeeder {
  async run () {

    const cidades = await Database.table('cidades')

    console.log(cidades)
  }
}

module.exports = CidadeSeeder
