'use strict'

const User = use('App/Models/User')


class UserController {

    async store({ request }) {
        try {
        const data = request.only(['username', 'email', 'password'])

        const userExists = await User.findBy('email', data.email)

        // checar se o usuário já existe

        if (userExists) {
            return Response
            .status(400)
            .send({ message: { error: 'usuário já existe' }})
        }
        const user = await User.create(data)


        return user
    }catch (err) {
        return response
        .status(err.status)
        .send(err)
    }
    }

    async index ({ request, response }) {
        const users = await User.all()

        response.json(users)
    }
}

module.exports = UserController
