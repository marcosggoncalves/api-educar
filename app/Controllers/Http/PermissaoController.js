'use strict'

const Permissao = use('App/Models/Permissao');
const GrupoAcessoPermissao = use('App/Models/GrupoPermissao');
const { validateAll } = use('Validator');
const Database = use('Database');
const Util = require('../../Utils/Util.js');

class PermissaoController {
  constructor(){
    this.util = new Util();
  }

  async index({ request, response, auth }) {
    const page = request.input('page', 1); // Iniciar paginação na página 1

    return response.status(200).send({
      status: true,
      permissoes: await Permissao.query().orderBy('nome', 'asc').paginate(page, 15)
    });
  }

  async save({ request, response, auth }) {
    try {
      const message = {
        'nome.required': 'Esse campo é obrigatorio',
        'rota_api.required': 'Esse campo é obrigatorio',
        'rota_web.required': 'Esse campo é obrigatorio',
      };

      const validation = await validateAll(request.all(), {
        nome: 'required',
        rota_web: 'required',
        rota_api: 'required'
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
        "icon",
        "rota_api",
        "rota_web",
        "is_menu"
      ])

      let permissao = await Permissao.create(data);

      // Vincular permissão em  todos os grupos de acesso
      await Database.raw(`
        INSERT INTO grupo_permissao(
            permissao_id, grupo_id
        ) select ${permissao.id} as permissao_id ,id as grupo_acesso_id from grupo`
      );

      response.status(200).send(
        {
          status: true, message: 'Permissão foi cadastrada com sucesso!',
          permissao: permissao
        }
      );
    } catch (error) {
      return response.status(500).send(
        {
          status: false,
          message: 'Não foi possivel adicionar nova permissão!'
        }
      );
    }
  }

  async edit({ params, request, response, auth }) {
    try {
      const message = {
        'nome.required': 'Esse campo é obrigatorio',
        'rota_api.required': 'Esse campo é obrigatorio',
        'rota_web.required': 'Esse campo é obrigatorio',
      };

      const validation = await validateAll(request.all(), {
        nome: 'required',
        rota_web: 'required',
        rota_api: 'required'
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
        "icon",
        "rota_api",
        "rota_web",
        "is_menu"
      ]);

      let permissao = await Permissao.query().where('id', params.id).update(data).returning('*');

      response.status(200).send(
        {
          status: true, message: 'Tipo de permissão foi alterada com sucesso!',
          permissao: permissao
        }
      );
    } catch (error) {
      
      console.log(error);

      return response.status(500).send(
        {
          status: false,
          message: 'Não foi possivel alterar permissão!'
        }
      );
    }
  }

  async delete({ params, request, response, auth }) {
    try {
      //Remover permissão de todos os grupos
      await Database.raw(`
        delete from grupo_permissao where permissao_id = ${params.id}`
      );

      await Database.table('permissao').where('id', params.id).delete().returning('*');;

      response.status(200).send(
        {
          status: true,
          message: 'Permissão deletada com sucesso!'
        }
      );
    } catch (error) {
      return response.status(200).send(
        {
          status: false,
          message: 'Não foi possivel remover permissão!'
        }
      );
    }
  }

  async gruposPermissoes({ params, request, response, auth }) {
    return response.status(200).send({
      status: true,
      permissoes: await Database
        .select('grupo.nome', 
        'grupo.id as acesso_id',
        'grupo_permissao.is_selecionado', 
        'permissao.*', 'grupo_permissao.id as id_grupo_permissao')
        .table('grupo')
        .innerJoin('grupo_permissao', 'grupo_permissao.grupo_id', 'grupo.id')
        .innerJoin('permissao', 'grupo_permissao.permissao_id', 'permissao.id')
        .where('grupo.id', params.id)
        .orderBy('permissao.nome', 'asc')
    });
  }

  async removerAddPermissaoGrupo({ params, request, response, auth }) {
    try {
      const permissao = await GrupoAcessoPermissao.query().where('id', params.id).update({
        'is_selecionado': params.is_selecionado
      }).returning('*');

      response.status(200).send(
        {
          status: true,
          message: params.is_selecionado === '1' ? 'Permissão adicionado ao grupo!' : 'Permissão removida do grupo!',
          permissao: permissao
        }
      );
    } catch (error) {
      return response.status(200).send(
        {
          status: false,
          message: 'Não foi possivel liberar/ou bloquear permissão!'
        }
      );
    }
  }
}

module.exports = PermissaoController;
