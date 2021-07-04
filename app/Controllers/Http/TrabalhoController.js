'use strict'

const { validateAll } = use('Validator');
const Database = use('Database');
const md5 = use('md5');
const util = require('../../Utils/Util.js');
const AutorTrabalhoModel = use('App/Models/AutorTrabalho');
const TrabalhoModel = use('App/Models/Trabalho');
const AutoresModel = use('App/Models/Autor');
const AvaliacaoModel = use('App/Models/Avaliacao');
const Mail = use('Mail');

class TrabalhoController {
  async statusTrabalhos(status) {
    /// 1 - Devolvido para correção
    /// 2 - Aprovado
    /// 3 - Reprovado
    /// 4 - Submetido
    /// 5 - Aguardando Avaliação
    /// 6 - Aguardando coordenador
    /// 7 - Aguardando documento

    switch (status) {
      case 1:
        return "Devolvido para correção";
        break;

      case 2:
        return "Aprovado";
        break;

      case 3:
        return "Reprovado";
        break;

      case 4:
        return "Submetido";

      case 5:
        return "Aguardando Avaliação";
        break;

      case 6:
        return "Aguardando coordenador";
        break;

      case 7:
        return "Aguardando documento";
        break;
      case 8:
        return "Reenviado, aguardando coordenador";
        break;

    }
  }

  async index({ request, response, auth }) {
    const page = request.input('page', 1); // Iniciar paginação na página 1 
    const trabalhos = await Database
      .select('usuario.nome as enviado_por', 'trabalho.*')
      .from('trabalho')
      .leftJoin('usuario', 'usuario.id', 'trabalho.usuario_id')
      .paginate(page, 20);

    return response.status(200).send({
      status: true,
      trabalhos: trabalhos
    });
  }

  /// Listar todos trabalhos que ainda não possui avaliador vinculado
  async trabalhosSemAvaliadorCoordenador({ request, response }) {
    const page = request.input('page', 1);

    const trabalhos =
      await Database
        .select('trabalho.id', 'trabalho.titulo', 'trabalho.documento_url', 'trabalho.ultimo_status', 'trabalho.created_at as submetido_em', 'avaliador.nome as avaliador_', 'avaliacao.created_at as avaliacao_iniciada_em')
        .from('trabalho')
        .leftJoin('avaliacao', 'avaliacao.trabalho_id', 'trabalho.id')
        .leftJoin('usuario as avaliador', 'avaliador.id', 'avaliacao.avaliador_id')
        .where("avaliacao.ultimo_status", "Aguardando coordenador")
        .orWhere("trabalho.ultimo_status", "Submetido")
        .paginate(page, 20);

    return response.status(200).send({
      status: true,
      trabalhos: trabalhos
    });
  }

  async visualizarTrabalho({ request, response, auth, params }) {

    const trabalho = await TrabalhoModel.query().where('id', params.trabalho).orderBy("id", "desc").first();

    if (!trabalho) {
      return response.status(417).send(
        {
          status: false,
          message: 'Trabalho não foi localizado!'
        }
      );
    }

    return response.status(200).send({
      status: true,
      trabalho: trabalho
    });
  }

  async visualizarTrabalhoDetalhado({ request, response, params }) {
    const trabalho = await TrabalhoModel.query().where('id', params.trabalho).orderBy("id", "desc").first();

    if (!trabalho) {
      return response.status(417).send(
        {
          status: false,
          message: 'Trabalho não foi localizado!'
        }
      );
    }

    const autores =
      await Database
        .select('*')
        .from('autor')
        .innerJoin('autor_trabalho', 'autor.id', 'autor_trabalho.autor_id')
        .where("autor_trabalho.trabalho_id", trabalho.id)
        .orderBy("autor.nome", "desc");

    const historicoAvaliacao = await Database
      .select('avaliacao.nota', 'avaliacao.ultimo_status', 'avaliacao.justificativa', 'avaliador.nome as avaliador_', 'avaliacao.created_at as avaliacao_iniciada_em')
      .from('avaliacao')
      .innerJoin('usuario as avaliador', 'avaliador.id', 'avaliacao.avaliador_id')
      .innerJoin('usuario as coordenador', 'coordenador.id', 'avaliacao.encaminhado_por')
      .where("avaliacao.trabalho_id", trabalho.id)
      .orderBy("avaliacao.id", "desc");

    return response.status(200).send({
      status: true,
      trabalho: trabalho,
      autores: autores,
      historico_avaliacao: historicoAvaliacao
    });
  }

  /// Listar trabalhos que não foram avaliados por usuário tipo avaliador
  async trabalhosSeremAvaliados({ request, response, params }) {
    const page = request.input('page', 1); // Iniciar paginação na página 1 

    const trabalhos =
      await Database
        .select('*')
        .from('trabalho')
        .innerJoin('avaliacao', 'avaliacao.trabalho_id', 'trabalho.id')
        .where("avaliacao.avaliador_id", params.id)
        .where("avaliacao.ultimo_status", "Aguardando Avaliação")
        .orderBy("avaliacao.id", "asc")
        .paginate(page, 25);

    return response.status(200).send({
      status: true,
      trabalhos: trabalhos
    });
  }
  /// Listar Trabalhos submetidos
  async meuTrabalhosSubmetidos({ request, response, params }) {
    const trabalhos = await TrabalhoModel.query().where('usuario_id', params.usuario).orderBy("id", "desc").fetch();

    if (trabalhos && trabalhos.rows.length === 0) {
      return response.status(417).send(
        {
          status: false,
          message: 'Nenhum trabalho localizado!'
        }
      );
    }

    const joinObj = (a, attr) => {
      var out = [];

      for (var i = 0; i < a.length; i++) {
        out.push(a[i][attr]);
      }

      return out.join(", ");
    }

    await Promise.all(trabalhos.rows.map(async (item, index) => {
      trabalhos.rows[index].autores = await
        joinObj(
          await Database
            .select('autor.nome')
            .from('autor')
            .innerJoin('autor_trabalho', 'autor.id', 'autor_trabalho.autor_id')
            .where("autor_trabalho.trabalho_id", item.id)
            .orderBy("autor.nome", "desc"), 'nome');

      trabalhos.rows[index].avaliacoes = await AvaliacaoModel.query()
      .where("trabalho_id", item.id)
      .orderBy("id", "desc").fetch();

    }));

    return response.status(200).send({
      status: true,
      trabalhos: trabalhos
    });
  }
  /// Encaminhar para avaliador
  async encaminhaTrabalhorAvaliador({ request, response }) {
    /// Abrir transação
    const connection = await Database.beginTransaction();
    try {
      const message = {
        'avaliador_id.required': 'Avaliador é obrigatório.',
        'trabalho_id.required': 'Trabalho é obrigatório.',
        'encaminhado_por.required': 'identificação do coordenador é obrigatório!'
      };

      const validation = await validateAll(request.all(), {
        avaliador_id: 'required',
        encaminhado_por: 'required',
        trabalho_id: 'required'
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
        "avaliador_id",
        "encaminhado_por",
        "trabalho_id"
      ]);
      /// Buscar trabalho no banco de dados
      const trabalho = await TrabalhoModel.query().where('id', data.trabalho_id).orderBy("id", "desc").first();

      if (!trabalho) {
        return response.status(417).send(
          {
            status: false,
            message: 'Trabalho não foi submetido!'
          }
        );
      }
      /// Buscar ultima avaliacao
      const ultimaAvaliacao = await AvaliacaoModel.query()
        .where('trabalho_id', data.trabalho_id)
        .orderBy('id', 'desc')
        .first();
      /// Encaminchar para avaliação
      const avaliador = await AvaliacaoModel.create({
        avaliador_id: data.avaliador_id,
        encaminhado_por: data.encaminhado_por,
        trabalho_id: data.trabalho_id,
        documento_avaliador_url: !ultimaAvaliacao ? trabalho.documento_url : trabalho.documento_url,
        ultimo_status: await this.statusTrabalhos(5) // Aguardando Avaliação
      }, connection);

      /// Alterar status do trabalho
      await TrabalhoModel.query().where('id', data.trabalho_id).update({
        ultimo_status: await this.statusTrabalhos(5) // Aguardando Avaliação
      }, connection);
      /// Comitar inserts no banco de dados
      await connection.commit();
      /// Responder frontend
      return response.status(200).send({
        status: true,
        message: 'Trabalho foi encaminhado para o avaliador.',
        avaliador: avaliador
      });
    } catch (error) {
      await connection.rollback();

      return response.status(500).send(
        {
          status: false,
          message: 'Não foi possivel enviar seu projeto, tente novamente!'
        }
      );
    }
  }
  /// Avaliar trabalho
  async avaliarTrabalhoSubmetido({ response, request, params }) {
    try {
      const message = {
        'justificativa.required': 'Esse campo é obrigatorio',
        'status.required': 'Esse campo é obrigatorio',
      };

      const validation = await validateAll(request.all(), {
        justificativa: 'required',
        status: 'required',
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
        "justificativa",
        "status",
        "nota"
      ]);

      let reeescrita = {
        justificativa: data.justificativa,
        ultimo_status: null,
        nota: data.nota
      };

      const avaliacaoAberta = await AvaliacaoModel.query().where('id', params.id).first();

      if (!avaliacaoAberta) {
        return response.status(417).send(
          {
            status: false,
            message: 'Nenhuma avaliação aberta foi localizada para esse trabalho!'
          }
        );
      }
      /// Colocar escrita do status
      reeescrita.ultimo_status = await this.statusTrabalhos(data.status);
      /// Trocar status
      await TrabalhoModel.query().where('id', avaliacaoAberta.trabalho_id).update({
        ultimo_status: reeescrita.ultimo_status,
      });

      const avaliacaoEnviada = await AvaliacaoModel.query().where('id', params.id).update(reeescrita).returning('*');

      response.status(200).send(
        {
          status: true,
          message: 'Sua avaliação foi enviada com sucesso. Obrigado!',
          avaliacao: avaliacaoEnviada
        }
      );

    } catch (error) {

      return response.status(500).send(
        {
          status: false,
          message: 'Não foi possivel enviar avaliação, tente novamente!'
        }
      );
    }
  }

  async submeterTrabalho({ request, response, auth }) {
    /// Abrir transação
    const connection = await Database.beginTransaction();
    /// Acessar informações do usuário logado
    const usuario = await auth.getUser();

    try {
      const message = {
        'autores.required': 'Autores são obrigatorio!',
        'titulo.required': 'Titulo do trabalho é obrigatório!'
      };

      const validation = await validateAll(request.all(), {
        autores: 'required',
        titulo: 'required',
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
        "autores",
        "titulo"
      ]);

      if (data && data.autores.length === 0) {
        return response.status(417).send(
          {
            status: false,
            message: 'Nenhum autor foi adicionado!'
          }
        );
      }
      /// Cadastrar 'Autores' do trabalho
      let autoresCadastro = await AutoresModel.createMany(data.autores, connection);
      /// Cadastrar 'Trabalho'
      let trabalhoCadastro = await TrabalhoModel.create({
        titulo: data.titulo,
        ultimo_status: await this.statusTrabalhos(7),
        usuario_id: usuario.id
      }, connection);
      /// Relacionar Autores com o trabalho
      let autoresTrabalhos = [];
      /// Montar Array para insert multiplos
      autoresCadastro.forEach((item) => {
        autoresTrabalhos.push({
          trabalho_id: trabalhoCadastro.id,
          autor_id: item.id
        });
      });
      ///  Cadastrar autores no trabalho
      const autores = await AutorTrabalhoModel.createMany(autoresTrabalhos, connection);
      /// Comitar inserts no banco de dados
      await connection.commit();
      /// Responder frontend
      return response.status(200).send(
        {
          status: true,
          trabalho: trabalhoCadastro,
          autores: autores
        }
      );
    } catch (error) {
      await connection.rollback();

      return response.status(500).send(
        {
          status: false,
          message: 'Não foi possivel enviar seu projeto, tente novamente!'
        }
      );
    }
  }

  async enviarEmailParaAutor({ request, response, MailProvider}) {

    const autor = request.only(['email', 'nome'])
    const email = request.only(['ultimo_status'])
    const trabalho = await TrabalhoModel.create(email)
    const destinatarioEmail = AutoresModel.create(autor)

    await Mail.send('teste', trabalho.toJson(), (message)=> {
      message.to(destinatarioEmail.email)
      .from('coordernacao@email')
      .subject('AVALIAÇÃO CORRIGIDA')
    })

    //verificar email para alunos 

    try{
      if(trabalho === 'teste'){

        response.json(200, {
          message: 'success',
          status: true
        })
      }
    }catch(e){
      response.json(422,{
        message: 'erro ao enviar email',
        status:false
      })
    }
  }



  async submeterTrabalhoArquivo({ request, response }) {
    const connection = await Database.beginTransaction();

    const trabalhoID = request.input('trabalho');
    const tituloTrabalho = request.input('titulo');

    try {
      const trabalho = await TrabalhoModel.query().where('id', trabalhoID).orderBy("id", "desc").first();

      if (!trabalho) {
        return response.status(417).send(
          {
            status: false,
            message: 'Trabalho não foi cadastrado!'
          }
        );
      }
      /// Receber documento
      const documentoTrabalho = request.file('documento', {
        extnames: ['pdf']
      })

      const nomeArquivo = `${md5(documentoTrabalho.clientName + trabalhoID + tituloTrabalho)}.pdf`;
      /// Mover documento para pasta
      await documentoTrabalho.move('public/uploads', {
        name: nomeArquivo,
        overwrite: true
      });

      if (!documentoTrabalho.moved()) {
        // Deletar registro para novo envio
        await Database.table('autor_trabalho').where('trabalho_id', trabalhoID).delete().returning('*');
        await Database.raw(`delete from autor where id in (select autor_id from autor_trabalho where trabalho_id = ${trabalhoID})`);
        await Database.table('trabalho').where('id', trabalhoID).delete().returning('*');

        return response.status(500).send(
          {
            status: false,
            message: 'Não foi possivel enviar seu projeto, formato do documento inválido! Envie como .PDF',
            error: documentoTrabalho.error()
          }
        );
      }
      /// Trocar status
      await TrabalhoModel.query().where('id', trabalhoID).update({
        ultimo_status: await this.statusTrabalhos(4),
        documento_url: `uploads/${nomeArquivo}`
      });
      await connection.commit();
      /// Responder frontend
      return response.status(200).send(
        {
          status: true,
          message: 'Seu trabalho foi enviado com sucesso!'
        }
      );

    } catch (error) {

      // Deletar registro para novo envio
      await Database.table('autor_trabalho').where('trabalho_id', trabalhoID).delete().returning('*');
      await Database.raw(`delete from autor where id in (select autor_id from autor_trabalho where trabalho_id = ${trabalhoID})`);
      await Database.table('trabalho').where('id', trabalhoID).delete().returning('*');

      return response.status(500).send(
        {
          status: false,
          message: 'Não foi possivel enviar o documento do seu projeto, tente novamente!'
        }
      );
    }
  }

  async submeterTrabalhoReenvio({ request, response, params }) {
    const connection = await Database.beginTransaction();

    try {
      if (params && !params.id) {
        return response.status(200).send(
          {
            status: true,
            message: 'Identificação do trabalho não foi informado!'
          }
        );
      }

      const trabalho = await TrabalhoModel.query().where('id', params.id).orderBy("id", "desc").first();

      if (!trabalho) {
        return response.status(417).send(
          {
            status: false,
            message: 'Trabalho não foi submetido!'
          }
        );
      }
      /// Receber documento
      const documentoTrabalho = request.file('documento', {
        extnames: ['pdf']
      })

      const nomeArquivo = `${md5(documentoTrabalho.clientName + params.id + trabalho.titulo)}.pdf`;
      /// Mover documento para pasta
      await documentoTrabalho.move('public/uploads', {
        name: nomeArquivo,
        overwrite: true
      });

      if (!documentoTrabalho.moved()) {
        return response.status(500).send(
          {
            status: false,
            message: 'Não foi possivel enviar seu projeto, formato do documento inválido! Envie como .PDF',
            error: documentoTrabalho.error()
          }
        );
      }
      /// Buscar ultima avaliacao
      const ultimaAvaliacao = await AvaliacaoModel.query()
        .where('trabalho_id', params.id)
        .orderBy('id', 'desc')
        .first();
      /// Encaminchar para avaliação
      await AvaliacaoModel.create({
        avaliador_id: ultimaAvaliacao.avaliador_id,
        encaminhado_por: ultimaAvaliacao.encaminhado_por,
        trabalho_id: ultimaAvaliacao.trabalho_id,
        documento_avaliador_url: trabalho.documento_url,
        ultimo_status: await this.statusTrabalhos(5) // Aguardando Avaliação
      }, connection);
      /// Trocar status
      await TrabalhoModel.query().where('id', params.id).update({
        ultimo_status: await this.statusTrabalhos(8),
        documento_url_reenvio: `uploads/${nomeArquivo}`
      }, connection);
       /// Comitar inserts no banco de dados
       await connection.commit();
      /// Responder frontend
      return response.status(200).send(
        {
          status: true,
          message: 'Seu trabalho foi reenviado com sucesso!'
        }
      );
    } catch (error) {
      await connection.rollback();

      return response.status(500).send(
        {
          status: false,
          message: 'Não foi possivel enviar o documento do seu projeto, tente novamente!'
        }
      );
    }
  }
}

module.exports = TrabalhoController
