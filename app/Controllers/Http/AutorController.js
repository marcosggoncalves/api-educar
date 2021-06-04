'use strict'

const Autor = use('App/Models/Autor')

class AutorController {

    async index({ response }){

        let autor = await Autor.all()

        return response.json(autor)
    }
}


module.exports = AutorController
