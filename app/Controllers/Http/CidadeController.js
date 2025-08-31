'use strict'

const { validateAll } = use('Validator');
const Database = use('Database');
const Util = require('../../Utils/Util.js');
const cidadeModel = use('App/Models/Cidade');

class CidadeController {
  constructor(){
    this.util = new Util();
  }

  async index({ request, response }) {
    const page = request.input('page', 1); // Iniciar paginação na página 1

    return response.status(200).send({
      status: true,
      cidades: await cidadeModel.query().orderBy("nome", "asc").paginate(page, 25)
    });
  }

  async selectInputCidades({ request, response }) {
    return response.status(200).send({
      status: true,
      cidades: await cidadeModel.all()
    });
  }

  async save({ request, response, auth }) {
    try {
      const message = {
        'nome.required': 'Esse campo é obrigatorio',
        'uf.required': 'Esse campo é obrigatorio'
      };

      const validation = await validateAll(request.all(), {
        nome: 'required',
        uf: 'required',
      }, message);

      if (validation.fails()) {
        return response.status(417).send(
          {
            status: false,
            message: 'Não foi possivel salvar!',
            validation:this.util.errorsFormat(validation.messages())
          }
        );
      }

      const data = request.only([
        "nome",
        "uf"
      ]);

      const cidade = await cidadeModel.create(data);

      response.status(200).send(
        {
          status: true,
          message: 'Cidade adicionada!',
          cidade: cidade
        }
      );
    } catch (error) {
      return response.status(500).send(
        {
          status: false,
          message: 'Não foi possivel adicionar cidade!'
        }
      );
    }
  }

  async edit({ params, request, response, auth }) {
    try {
      const message = {
        'nome.required': 'Esse campo é obrigatorio',
        'uf.required': 'Esse campo é obrigatorio'
      };

      const validation = await validateAll(request.all(), {
        nome: 'required',
        uf: 'required',
      }, message);

      if (validation.fails()) {
        return response.status(417).send(
          {
            status: false,
            message: 'Não foi possivel salvar!',
            validation:this.util.errorsFormat(validation.messages())
          }
        );
      }

      const data = request.only([
        "nome",
        "uf"
      ]);

      const cidade = await cidadeModel.query().where('id', params.id).update(data).returning('*');

      response.status(200).send(
        {
          status: true,
          message: 'Alteração realizada!',
          cidade: cidade
        }
      );
    } catch (error) {
      return response.status(500).send(
        {
          status: false,
          message: 'Não foi alterar cidade!'
        }
      );
    }
  }

  async delete({ params, request, response, auth }) {
    try {
      await Database.table('cidade').where('id', params.id).delete().returning('*');

      response.status(200).send(
        {
          status: true,
          message: 'Cidade foi excluida!'
        }
      );
    } catch (error) {
      return response.status(200).send(
        {
          status: false,
          message: 'Não foi possivel excluir cidade!'
        }
      );
    }
  }
}

module.exports = CidadeController;
