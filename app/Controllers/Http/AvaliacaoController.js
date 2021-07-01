'use strict'

const Database = use('Database');

class AvaliacaoController {
    async index({ request, response }) {
        const page = request.input('page', 1);

        const avaliacoes = await Database
            .select('trabalho.*','avaliacao.nota', 'avaliacao.ultimo_status', 'avaliacao.justificativa', 'avaliador.nome as avaliador_', 'avaliacao.created_at as avaliacao_iniciada_em')
            .from('trabalho')
            .innerJoin('avaliacao', 'avaliacao.trabalho_id', 'trabalho.id')
            .innerJoin('usuario as usuario_inscricao', 'usuario_inscricao.id', 'trabalho.usuario_id')
            .innerJoin('usuario as coordenador', 'coordenador.id', 'avaliacao.encaminhado_por')
            .innerJoin('usuario as avaliador', 'avaliador.id', 'avaliacao.avaliador_id')
            .paginate(page, 25);

        return response.status(200).send({
            status: true,
            avaliacoes: avaliacoes
        });
    }
}

module.exports = AvaliacaoController
