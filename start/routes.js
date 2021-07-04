'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    /// Trabalho
    Route.post('/submeter-trabalho', 'TrabalhoController.submeterTrabalho').middleware(['auth']);
    Route.post('/submeter-arquivo', 'TrabalhoController.submeterTrabalhoArquivo').middleware(['auth']);
    Route.post('/submeter-arquivo-reenvio/:id', 'TrabalhoController.submeterTrabalhoReenvio').middleware(['auth']);
    Route.post('/avaliar/:id', 'TrabalhoController.avaliarTrabalhoSubmetido').middleware(['auth']);
    Route.post('/encaminhar-trabalho/avaliador', 'TrabalhoController.encaminhaTrabalhorAvaliador').middleware(['auth']);
    Route.get('/coordenacao-trabalhos', 'TrabalhoController.trabalhosSemAvaliadorCoordenador').middleware(['auth']);
    Route.get('/coordenacao-avaliadores', 'AvaliacaoController.avaliadores').middleware(['auth']);
    Route.get('/avaliador-trabalhos/:id', 'TrabalhoController.trabalhosSeremAvaliados').middleware(['auth','permissao']);
    Route.get('/meus-trabalhos-submetidos/:usuario', 'TrabalhoController.meuTrabalhosSubmetidos').middleware(['auth','permissao']);
    Route.get('/visualizar-trabalho-detalhado/:trabalho', 'TrabalhoController.visualizarTrabalhoDetalhado').middleware(['auth','permissao']);
    Route.get('/trabalhos-recebidos', 'TrabalhoController.index').middleware(['auth','permissao']);
    // -------------------------- Fim -----------------------------------
    /// Cidade
    Route.get('/cidades', 'CidadeController.index').middleware(['auth','permissao']);
    Route.post('/alterar-cidade/:id', 'CidadeController.edit').middleware(['auth']);
    Route.post('/nova-cidade', 'CidadeController.save').middleware(['auth']);
    Route.delete('/excluir-cidade/:id', 'CidadeController.delete').middleware(['auth']);
    // -------------------------- Fim -----------------------------------
    /// Instituição
    Route.get('/instituicoes', 'InstituicaController.index').middleware(['auth','permissao']);
    Route.post('/alterar-instituicao/:id', 'InstituicaController.edit').middleware(['auth']);
    Route.post('/nova-instituicao', 'InstituicaController.save').middleware(['auth']);
    Route.delete('/excluir-instituicao/:id', 'InstituicaController.delete').middleware(['auth']);
    // -------------------------- Fim -----------------------------------
    /// Grupo de acesso
    Route.get('/grupos', 'GrupoController.index').middleware(['auth','permissao']);
    Route.post('/alterar-grupo/:id', 'GrupoController.edit').middleware(['auth']);
    Route.post('/novo-grupo', 'GrupoController.save').middleware(['auth']);
    Route.delete('/excluir-grupo/:id', 'GrupoController.delete').middleware(['auth']);
    // -------------------------- Fim -----------------------------------
    // Permissão
    Route.post('/nova-permissao', 'PermissaoController.save').middleware(['auth']);
    Route.post('/alterar-permissao/:id', 'PermissaoController.edit').middleware(['auth']);
    Route.get('/permissoes', 'PermissaoController.index').middleware(['auth','permissao']);
    Route.delete('/excluir-permissao/:id', 'PermissaoController.delete').middleware(['auth']);
    // -------------------------- Fim -----------------------------------
    //  Grupo de permissão
    Route.get('/grupo-permissoes/alterar/:id/:is_selecionado', 'PermissaoController.removerAddPermissaoGrupo').middleware(['auth']);
    Route.get('/grupo-permissoes/:id', 'PermissaoController.gruposPermissoes').middleware(['auth']);
    // -------------------------- Fim -----------------------------------
    /// Usuario
    Route.get('/usuarios', 'UsuarioController.index').middleware(['auth', 'permissao']);
    Route.post('/alterar-usuario/:id', 'UsuarioController.edit').middleware(['auth']);
    Route.post('/novo-usuario', 'UsuarioController.save');
    Route.delete('/excluir-usuario/:id', 'UsuarioController.delete').middleware(['auth']);
    // -------------------------- Fim -----------------------------------
    /// Avaliações
    Route.get('/avaliacoes-realizadas', 'AvaliacaoController.index').middleware(['auth','permissao']);
    // -------------------------- Fim -----------------------------------
    /// Autenticar
    Route.post('/auth/entrar', 'AutenticarController.entrar');
    Route.get('/auth/verificar-token', 'AutenticarController.token');
    // -------------------------- Fim -----------------------------------
    // Select Inputs
    Route.get('/instituicoes-all', 'InstituicaController.selectInputInstituicao');
    Route.get('/cidades-all', 'CidadeController.selectInputCidades');
    Route.get('/grupos-all', 'GrupoController.selectInputGrupos');
}).prefix('api/v1');