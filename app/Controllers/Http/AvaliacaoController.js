'use strict'

const Database = use('Database');

class AvaliacaoController {
    async joinObj(a, attr) {
        var out = [];

        for (var i = 0; i < a.length; i++) {
            out.push(a[i][attr]);
        }

        return out.join(", ");
    }

    async index({ request, response }) {
        const page = request.input('page', 1);

        const avaliacoes = await Database
            .select('trabalho.*', 'avaliacao.nota', 'avaliacao.ultimo_status', 'avaliacao.justificativa', 'avaliador.nome as avaliador_', 'avaliacao.created_at as avaliacao_iniciada_em')
            .from('trabalho')
            .innerJoin('avaliacao', 'avaliacao.trabalho_id', 'trabalho.id')
            .innerJoin('usuario as usuario_inscricao', 'usuario_inscricao.id', 'trabalho.usuario_id')
            .innerJoin('usuario as coordenador', 'coordenador.id', 'avaliacao.encaminhado_por')
            .innerJoin('usuario as avaliador', 'avaliador.id', 'avaliacao.avaliador_id')
            .paginate(page, 25);

        await Promise.all(avaliacoes.data.map(async (item, index) => {
            avaliacoes.data[index].autores_ = await
                this.joinObj(
                    await Database
                        .select('autor.nome')
                        .from('autor')
                        .innerJoin('autor_trabalho', 'autor.id', 'autor_trabalho.autor_id')
                        .where("autor_trabalho.trabalho_id", item.id)
                        .orderBy("autor.nome", "desc"), 'nome');


        }));

        return response.status(200).send({
            status: true,
            avaliacoes: avaliacoes
        });
    }

    async avaliadores({ request, response }) {

        const avaliadores = await Database
            .select('id', 'nome')
            .from('usuario')
            .where('grupo_id', 3)

        return response.status(200).send({
            status: true,
            avaliadores: avaliadores
        });
    }
}

module.exports = AvaliacaoController;
