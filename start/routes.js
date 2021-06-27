'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.resource('trabalho', '')
Route.resource('autor', '')
Route.resource('cidade', '')
Route.resource('cordenacao', '')
Route.resource('avaliador', '')

//todas as rotas devem ter prefixo /api

Route.group(() => {
  Route.post('users', 'UserController.store')
  Route.get('users', 'UserController.index')
  Route.get('users/:id', 'UserController.show')
  Route.put('users/:id', 'UserController.update')
  Route.delete('users/:id', 'UserController.delete')
}).prefix('api')

Route.group(() => {
  Route.post('instituicao', 'InstituicaoController.store')
  Route.get('instituicao', 'InstituicaoController.index')
  Route.get('instituicao/:id', 'InstituicaoController.show')
  Route.put('instituicao/:id', 'InstituicaoController.update')
  Route.delete('instituicao/:id', 'InstituicaoController.delete')
}).prefix('api')

Route.group(() => {
  Route.post('autor', 'AutorController.store')
  Route.get('autor', 'AutorController.index')
  Route.get('autor/:id', 'AutorController.show')
  Route.put('autor/:id', 'AutorController.update')
  Route.delete('autor/:id', 'AutorController.delete')
}).prefix('api')

Route.group(() => {
  Route.post('avaliador', 'AvaliadorController.store')
  Route.get('avaliador', 'AvaliadorController.index')
  Route.get('avaliador/:id', 'AvaliadorController.show')
  Route.put('avaliador/:id', 'AvaliadorController.update')
  Route.delete('avaliador/:id', 'AvaliadorController.delete')
}).prefix('api')

Route.group(() => {
  Route.post('cordenacao', 'CordenacaoController.store')
  Route.get('cordenacao', 'CordenacaoController.index')
  Route.get('cordenacao/:id', 'CordenacaoController.show')
  Route.put('cordenacao/:id', 'CordenacaoController.update')
  Route.delete('cordenacao/:id', 'CordenacaoController.delete')
}).prefix('api')

Route.group(() => {
  Route.post('trabalho', 'TrabalhoController.store')
  Route.get('trabalho', 'TrabalhoController.index')
  Route.get('trabalho/:id', 'TrabalhoController.show')
  Route.put('trabalho/:id', 'TrabalhoController.update')
  Route.delete('trabalho/:id', 'TrabalhoController.delete')
}).prefix('api')





