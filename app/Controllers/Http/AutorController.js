'use strict'

const Autor = use('App/Models/Autor')

class AutorController {

    async index({ response }){

        const autor = await Autor.query()
        .with('cidades')
        .fetch()

        return response.json(autor)
    }

    async store({ request }) {
        const data = request.only(['nome' ,'email'])
        
        const autor = await Autor.create(data)

        return autor
    }
}


module.exports = AutorController
