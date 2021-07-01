'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database');

class NivelPermissoe {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request , response, auth}, next) {
    if(request.method() != 'GET') return await next();
    // Selecionar usuário logado pelo token 
    const usuario  = await auth.getUser();
    // Obter url atual
    const path = request.url().slice(7).replace(/[\^0-9]/g, '');
    // Buscar grupo de permissão, juntamente com a rota de acesso atual
    let verifyPermissao = await Database
      .table('grupo')
      .innerJoin('grupo_permissao', 'grupo_permissao.grupo_id', 'grupo.id')
      .innerJoin('permissao', 'grupo_permissao.permissao_id', 'permissao.id')
      .where('grupo.id', usuario.grupo_id)
      .where('grupo_permissao.is_selecionado', true)
      .where('permissao.rota_api', 'ilike', `${path}%`)

    // Liberar acesso ao grupo
    if(verifyPermissao && verifyPermissao.length > 0){
      return await next()
    }
    // Mostrar aviso de sem permoissão para acessar
    return response.status(401).send(
        {
            status: false,
            message: 'Você não tem permissão para executar esse processo! Entre em contato com administrador.'
        }
    );
  }
}

module.exports = NivelPermissoe
