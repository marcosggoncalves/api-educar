'use strict'

const Trabalho = use('App/Models/Trabalho')
class TrabalhoController {

    async index({ response }){
        const jobs = await Trabalho.all()

        response.status(200).json({
            message: 'Aqui está o registro',
            data: jobs
        })

    }

    async store({ request, response }){
        const { titulo, palavras_chaves, texto } = request.post()

        const job = await Trabalho.create({ titulo, palavras_chaves, texto })

        response.status(201).json({
            message: 'Trabalho salvo com sucesso',
            data: job
        })

    }

    async show({ request, response }){
        response.status(200).json({
            message: 'Seus registros',
            data: request.post().job
        })
    }

    async delete({ request, response, params: {id}}){
        const { job } = request.post()

        await job.delete()

        response.status(200).json({
            message: 'deletado'
        })
    }

    async update({ request, response, params: {id} }){
        const { titulo, palavras_chave, texto } = request.post()

        job.titulo = titulo
        job.palavras_chave = palavras_chave
        job.texto = texto

        await job.save()

    }
}

module.exports = TrabalhoController
