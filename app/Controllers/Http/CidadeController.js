'use strict'

const City = use('App/Models/Cidade')
class CidadeController {

    async index({ response }){

        const city = await City.all()

        return response.json(city)
    }
}



module.exports = CidadeController
