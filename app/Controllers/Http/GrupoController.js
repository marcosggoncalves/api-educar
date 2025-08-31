'use strict'

const { validateAll } = use('Validator');
const Database = use('Database');
const Util = require('../../Utils/Util.js');
const grupoModel = use('App/Models/Grupo');

class GrupoController {
  constructor(){
    this.util = new Util();
  }

  async index({request, response}){
    const page = request.input('page', 1); // Iniciar paginação na página 1

    return response.status(200).send({
        status: true,
        grupos: await grupoModel.query().orderBy("nome","asc").paginate(page, 25)
    });
  }

  async selectInputGrupos({request, response}){
    return response.status(200).send({
        status: true,
        grupos: await grupoModel.all()
    });
  }

  async save({ request, response, auth }) {
    try {
      const message = {
        'nome.required': 'Esse campo é obrigatorio'
      };

      const validation = await validateAll(request.all(), {
        nome: 'required'
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
        "nome"
      ]);

      const grupo = await grupoModel.create(data);

      response.status(200).send(
        {
          status: true,
          message: 'Grupo adicionada!',
          grupo: grupo
        }
      );
    } catch (error) {
      return response.status(500).send(
        {
          status: false,
          message: 'Não foi possivel adicionar!'
        }
      );
    }
  }

  async edit({ params, request, response, auth }) {
    try {
      const message = {
        'nome.required': 'Esse campo é obrigatorio'
      };

      const validation = await validateAll(request.all(), {
        nome: 'required'
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
        "nome"
      ]);

      const grupo = await grupoModel.query().where('id', params.id).update(data).returning('*');

      response.status(200).send(
        {
          status: true,
          message: 'Alteração realizada!',
          grupo: grupo
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
      await Database.table('grupo').where('id', params.id).delete().returning('*');
    
      response.status(200).send(
        {
          status: true,
          message: 'Grupo foi excluida!'
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

module.exports = GrupoController;
