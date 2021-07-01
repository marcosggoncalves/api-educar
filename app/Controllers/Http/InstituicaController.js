'use strict'

const { validateAll } = use('Validator');
const Database = use('Database');
const util = require('../../Utils/Util.js');
const instituicaoModel = use('App/Models/Instituica');

class InstituicaController {
  async index({request, response}){
    const page = request.input('page', 1); // Iniciar paginação na página 1

    return response.status(200).send({
        status: true,
        instituicoes: await instituicaoModel.query().orderBy("nome","asc").paginate(page, 25)
    });
  }

  async selectInputInstituicao({request, response}){
    return response.status(200).send({
        status: true,
        instituicoes: await instituicaoModel.all()
    });
  }

  async save({ request, response, auth }) {
    try {
      const message = {
        'nome.required': 'Esse campo é obrigatorio',
        'cidade_id.required': 'Esse campo é obrigatorio'
      };

      const validation = await validateAll(request.all(), {
        nome: 'required',
        cidade_id: 'required',
      }, message);

      if (validation.fails()) {
        return response.status(417).send(
          {
            status: false,
            message: 'Não foi possivel salvar!',
            validation: new util().errorsFormat(validation.messages())
          }
        );
      }

      const data = request.only([
        "nome",
        "cidade_id"
      ]);

      const instituicao = await instituicaoModel.create(data);

      response.status(200).send(
        {
          status: true,
          message: 'Institução adicionada!',
          instituicao: instituicao
        }
      );
    } catch (error) {
      return response.status(500).send(
        {
          status: false,
          message: 'Não foi possivel adicionar instituição!'
        }
      );
    }
  }

  async edit({ params, request, response, auth }) {
    try {
      const message = {
        'nome.required': 'Esse campo é obrigatorio',
        'cidade_id.required': 'Esse campo é obrigatorio'
      };

      const validation = await validateAll(request.all(), {
        nome: 'required',
        cidade_id: 'required',
      }, message);

      if (validation.fails()) {
        return response.status(417).send(
          {
            status: false,
            message: 'Não foi possivel salvar!',
            validation: new util().errorsFormat(validation.messages())
          }
        );
      }

      const data = request.only([
        "nome",
        "cidade_id"
      ]);

      const instituicao = await instituicaoModel.query().where('id', params.id).update(data).returning('*');

      response.status(200).send(
        {
          status: true,
          message: 'Alteração realizada!',
          instituicao: instituicao
        }
      );
    } catch (error) {
      return response.status(500).send(
        {
          status: false,
          message: 'Não foi alterar!'
        }
      );
    }
  }

  async delete({ params, request, response, auth }) {
    try {
      await Database.table('instituicao').where('id', params.id).delete().returning('*');
    
      response.status(200).send(
        {
          status: true,
          message: 'Instituicao foi excluida!'
        }
      );
    } catch (error) {
      return response.status(200).send(
        {
          status: false,
          message: 'Não foi possivel excluir!'
        }
      );
    }
  }
}

module.exports = InstituicaController
