'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cordenacaos
 */
const Cordenacao = use('App/Models/Cordenacao')
class CordenacaoController {
  
  async index ({ request, response }) {
      const data = await Cordenacao.all()

      response.status(200).json({
        message: 'seus dados',
        data: data
      })
  }


 
  async store ({ request, response }) {
    const { nome, password, email, avaliador_id, trabalho_id } = request.post()

    const data = await Cordenacao.create({ nome, password, email, avaliador_id, trabalho_id })

    return data
  }

  async show ({ request, response}) {
      response.status(200).json({
        message: 'Seus registros',
        data: request.post().job
    })
  }


  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = CordenacaoController
