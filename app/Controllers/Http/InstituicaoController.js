'use strict'

const Book = use('App/Models/Instituicao')


class InstituicaoController {

    async index({ response }) {
      const data = await Book.query()
      .with('cidades')
      .fetch()

    return response.json(data)
    }

    async store({ request }) {
      const data = request.only(['nome', 'cidade_id'])

      const school = await Book.create(data)

      return school
    }

}

module.exports = InstituicaoController
