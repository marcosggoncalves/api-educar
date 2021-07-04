'use strict'

const { validateAll } = use('Validator');
const Database = use('Database');
const util = require('../../Utils/Util.js');
const usuarioModel = use('App/Models/Usuario');

class UsuarioController {
  async index({ request, response }) {
    const page = request.input('page', 1); // Iniciar paginação na página 1
    const usuarios = await Database
      .select('usuario.id',
      'usuario.email',
       'usuario.tipo_usuario', 
       'usuario.nome', 
       'usuario.grupo_id', 
       'grupo.nome as grupo_acesso', 'instituicao.nome as instituicao_nome')
      .from('usuario')
      .innerJoin('grupo', 'grupo.id', 'usuario.grupo_id')
      .innerJoin('instituicao', 'instituicao.id', 'usuario.instituicao_id')
      .orderBy('grupo.nome', 'asc')
      .paginate(page, 25);

    // seleciona os usuarios por nivel de permissao
    
    try{ 
        const usuariosGrupo = await Database
        .select('usuario.id', 'usuario.nome', 'usuario.grupo_id')
        .from('usuario')
        .innerJoin('grupo', 'grupo.id', 'usuario.grupo.')
        .innerJoin('grupo_permissao', 'grupo_permissao.permissao_id', 'grupo_permissao.id')
        .orderBy('usuario.nome', 'asc').paginate(page, 15)

        response.status(200).send({
          status: true,
          usuariosGrupo: usuariosGrupo
        })
    }catch (error) {
      response.status(500).send({
        status: false,
        message: 'não foi possivel finalizar a ação'
      })

    }
  }

  async save({ request, response, auth }) {
    try {
      const message = {
        'nome.required': 'Esse campo é obrigatorio',
        'senha.required': 'Esse campo é obrigatorio',
        'email.required': 'Esse campo é obrigatorio',
        'grupo_id.required': 'Esse campo é obrigatorio',
        'tipo_usuario.required': 'Esse campo é obrigatorio',
        'instituicao_id.required': 'Esse campo é obrigatorio'
      };

      const validation = await validateAll(request.all(), {
        nome: 'required',
        senha: 'required',
        email: 'required',
        grupo_id: 'required',
        tipo_usuario: 'required',
        instituicao_id: 'required',
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
        "senha",
        "email",
        "grupo_id",
        "tipo_usuario",
        "instituicao_id"
      ]);

      const usuario = await usuarioModel.create(data);

      response.status(200).send(
        {
          status: true,
          message: 'Seu cadastro foi realizado! Acesse o painel',
          usuario: usuario
        }
      );
    } catch (error) {
      return response.status(500).send(
        {
          status: false,
          message: 'Não foi possivel adicionar, seu email já pode estar sendo utilizado /ou alguma informação esta incorreta!'
        }
      );
    }
  }

  async queryFilterPermissao({ params, response, request }) {
      const data = request.only([''])


  }

  async edit({ params, request, response, auth }) {
    try {
      const message = {
        'nome.required': 'Esse campo é obrigatorio',
        'senha.required': 'Esse campo é obrigatorio',
        'email.required': 'Esse campo é obrigatorio',
        'grupo_id.required': 'Esse campo é obrigatorio',
        'tipo_usuario.required': 'Esse campo é obrigatorio',
        'instituicao_id.required': 'Esse campo é obrigatorio'
      };

      const validation = await validateAll(request.all(), {
        nome: 'required',
        senha: 'required',
        email: 'required',
        grupo_id: 'required',
        tipo_usuario: 'required',
        instituicao_id: 'required',
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
        "senha",
        "email",
        "grupo_id",
        "tipo_usuario",
        "instituicao_id"
      ]);

      const usuario = await usuarioModel.query().where('id', params.id).update(data).returning('*');

      response.status(200).send(
        {
          status: true,
          message: 'Alteração realizada!',
          usuario: usuario
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
      await Database.table('usuario').where('id', params.id).delete().returning('*');

      response.status(200).send(
        {
          status: true,
          message: 'Usuário foi excluido!'
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

module.exports = UsuarioController
