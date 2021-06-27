'use strict'

const Cordenacao = use('App/Models/Cordenacao')
const { validate } = use('Validator')
class CordenacaoController {
  
  async index ({ request, response }) {
      const data = await Cordenacao.all()

      response.status(200).json({
        message: 'seus dados',
        data: data
      })
  }


 
  async store ({ request, response, session  }) {
    const { nome, password, email, status, avaliador_id, trabalho_id } = request.post()
    const rules = {
      email: 'required|email|unique:cordenacaos,email',
      status: 'nullable',
      password: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      session
      .withErrors(validation.messages())
      .flashExcept(['password'])
    }

    const data = await Cordenacao.create({ 
       nome,
       password,
        email, 
        status, 
        avaliador_id, 
        trabalho_id 
      })

      response.status(201).json({
        message: 'Salvo com sucesso!!',
        data: data
      })

  }

  async show ({ request, response }) {
    const job = await Cordenacao.findOrFail(id)

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
