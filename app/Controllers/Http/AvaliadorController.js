'use strict'

const Avaliador = use('App/Models/Avaliador')
class AvaliadorController {
 
  async index ({ response }) {
      const avaliador = await Avaliador.all()

      response.status(200).json({
        message: 'Seus Registros',
        data: avaliador
      })
  }


 
  async store ({ request, response }) {
    const { nome, email, password, trabalho_id } = request.post()

    const profe = await Avaliador.create({ nome, email, password, trabalho_id })

    response.status(201).json({
      message: 'Cadastro feito com sucesso!',
      data: profe
    })
  }

  async show ({  request, response, view }) {
      response.status(200).json({
        message: 'Here is your task.',
        data: request.post().profe
    })
  }
  

  async update ({ params: {id}, request, response }) {
    const { nome, email, password, trabalho_id, profe } = request.post()

    profe.nome = nome
    profe.email = email
    profe.password = password
    profe.trabalho_id = trabalho_id

    await profe.save()

    response.status(200).json({
      message: 'atualizado com sucesso!!',
      data: profe
    })
  }

  /**
   * Delete a avaliador with id.
   * DELETE avaliadors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AvaliadorController
