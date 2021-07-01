'use strict'

const Database = use('Database');
const { validateAll } = use('Validator');
const util = require('../../Utils/Util.js');

class AutenticarController {
    async token({ request, response, auth }) {
        try {
            return {
                status: await auth.check(),
                message: 'Token válido'
            }
        } catch (error) {
            return response.send({
                status: false,
                message: 'Não foi possivel acessar o sistema, autenticação de acesso inválida!'
            })
        }
    }

    async entrar({ request, response, auth }) {
        const message = {
            'email.required': 'Esse campo é obrigatorio',
            'senha.required': 'Esse campo é obrigatorio'
        };

        const validation = await validateAll(request.all(), {
            email: 'required',
            senha: 'required',
        }, message);

        if (validation.fails()) {
            return response.status(401).send(
                {
                    status: false,
                    message: 'Não foi possivel acessar painel, acesso negado!',
                    validation: new util().errorsFormat(validation.messages())
                }
            );
        }

        const { email, senha } = request.all();

        try {
            let token = await auth.attempt(email, senha);

            const usuarioAuth = await Database
                .select('usuario.id','usuario.nome', 'usuario.email', 'grupo.nome', 'usuario.grupo_id')
                .table('usuario')
                .innerJoin('grupo', 'usuario.grupo_id', 'grupo.id')
                .where('email', email).first();

            const menuLateral = await Database
                .select('permissao.id', 'permissao.rota_api', 'permissao.rota_web', 'permissao.nome', 'permissao.icon')
                .table('grupo')
                .innerJoin('grupo_permissao', 'grupo_permissao.grupo_id', 'grupo.id')
                .innerJoin('permissao', 'grupo_permissao.permissao_id', 'permissao.id')
                .where('grupo.id', usuarioAuth.grupo_id)
                .where('is_menu', true)
                .where('grupo_permissao.is_selecionado', true)
                .orderBy('permissao.id', 'asc');
            return {
                user: usuarioAuth,
                status: true,
                token: token.token,
                menu: menuLateral
            };
        } catch (error) {
            if (error && error.uidField && error.passwordField) {
                return response.status(417).send(
                    {
                        status: false,
                        message: 'Acesso negado, usuário não encontrado! Email/ou senha inválido(s).'
                    }
                );
            } else if (error && error.passwordField) {
                return response.status(417).send(
                    {
                        status: false,
                        message: 'Acesso negado! Senha inválida.'
                    }
                )
            } else {
                return response.status(417).send(
                    {
                        status: false,
                        message: error
                    }
                );
            }
        }
    }
}

module.exports = AutenticarController
