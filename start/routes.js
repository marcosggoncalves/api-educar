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

Route.group(() => {
  Route.post('users', 'UserController.store')
  Route.get('users', 'UserController.index')
  Route.get('users/:id', 'UserController.show')
  Route.put('users/:id', 'UserController.update')
  Route.delete('users/:id', 'UserController.delete')
}).prefix('api/v1')

Route.group(() => {
  Route.post('instituicao', 'InstituicaoController.store')
  Route.get('instituicao', 'InstituicaoController.index')
  Route.get('instituicao/:id', 'InstituicaoController.show')
  Route.put('instituicao/:id', 'InstituicaoController.update')
  Route.delete('instituicao/:id', 'InstituicaoController.delete')
}).prefix('api/v1')

Route.group(() => {
  Route.post('autor', 'AutorController.store')
  Route.get('autor', 'AutorController.index')
  Route.get('autor/:id', 'AutorController.show')
  Route.put('autor/:id', 'AutorController.update')
  Route.delete('autor/:id', 'AutorController.delete')
}).prefix('api/v1')

Route.group(() => {
  Route.post('cidade', 'CidadeController.store')
  Route.get('cidade', 'CidadeController.index')
  Route.get('cidade/:id', 'CidadeController.show')
  Route.put('cidade/:id', 'CidadeController.update')
  Route.delete('cidade/:id', 'CidadeController.delete')
}).prefix('api/v1')



