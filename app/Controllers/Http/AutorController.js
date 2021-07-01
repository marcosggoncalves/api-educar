'use strict'

const { validateAll } = use('Validator');
const Database = use('Database');
const util = require('../../Utils/Util.js');
const AutorModel = use('App/Models/Autor');
const AutorTrabalhoModel = use('App/Models/AutorTrabalho');

class AutorController {

  async index({ request, response }) {
    const page = request.input("page", 1);

    const autores = await Database
      .select('autor.*', 'trabalho.titulo')
      .from('autor')
      .innerJoin('autor_trabalho', 'autor.id', 'autor_trabalho.autor_id')
      .innerJoin('trabalho', 'trabalho.id', 'autor_trabalho.trabalho_id')
      .orderBy('autor.nome', 'asc')
      .paginate(page, 25);

    return response.status(200).send({
      status: true,
      autores: autores
    });
  }

  async save({ request, response, auth }) {
    /// Abrir transação
    const connection = await Database.beginTransaction();

    try {
      const message = {
        'nome.required': 'Esse campo é obrigatorio',
        'email.required': 'Esse campo é obrigatorio',
        'trabalho_id.required': 'Esse campo é obrigatorio'
      };

      const validation = await validateAll(request.all(), {
        nome: 'required',
        email: 'required',
        trabalho_id: 'required',
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
        "email",
        "trabalho_id"
      ]);
      /// Cadastrar autor
      const autor = await AutorModel.create({
        nome: data.nome,
        email: data.email
      }, connection);
      /// Vincular autor com o trabalho
      const vinculoTrabalho = await AutorTrabalhoModel.create({
        trabalho_id: data.trabalho_id,
        autor_id: autor.id
      }, connection);
      /// Comitar inserts no banco de dados
      await connection.commit();
      /// Responder frontend
      response.status(200).send(
        {
          status: true,
          message: 'Autor adicionado!',
          autor: autor,
          vinculo_trabalho: vinculoTrabalho
        }
      );
    } catch (error) {
      await connection.rollback();

      return response.status(500).send(
        {
          status: false,
          message: error.message
        }
      );
    }
  }

  async edit({ params, request, response, auth }) {
    try {
      const message = {
        'nome.required': 'Esse campo é obrigatorio',
        'email.required': 'Esse campo é obrigatorio'
      };

      const validation = await validateAll(request.all(), {
        nome: 'required',
        email: 'required',
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
        "email"
      ]);

      const autor = await AutorModel.query().where('id', params.id).update(data).returning('*');

      response.status(200).send(
        {
          status: true,
          message: 'Alteração realizada!',
          autor: autor
        }
      );
    } catch (error) {
      return response.status(500).send(
        {
          status: false,
          message: error.message
        }
      );
    }
  }

  async delete({ params, request, response, auth }) {
    try {
      await Database.table('autor_trabalho').where('autor_id', params.id).delete().returning('*');
      await Database.table('autor').where('id', params.id).delete().returning('*');

      response.status(200).send(
        {
          status: true,
          message: 'Autor removido!'
        }
      );
    } catch (error) {
      return response.status(200).send(
        {
          status: false,
          message: error.message
        }
      );
    }
  }
}

module.exports = AutorController
