'use strict'

const Book = use('App/Models/Instituicao')


class InstituicaoController {


    async index ({ response} ) {

        let books = await Book.all()

        return response.json(books)
      }

      async show ({ params, response }) {
        const book = await Book.find(params.id)

        return response.json(book)
      }

      async store ({ request, response }) {
        const bookInfo = request.only(['name'])

        const book = new Book()
        book.name = bookInfo.name
       

        await book.save()

        return response.status(201).json(book)
      }

      async update ({ params, request, response }) {
        const bookInfo = request.only(['id' ,'name '])

        const book = await Book.find(params.id)
        if (!book) {
          return response.status(404).json({data: 'página não encontrada'})
        }
        book.name = bookInfo.name
        
        await book.save()

        return response.status(200).json(book)
      }

      async delete ({ params, response }) {

        const book = await Book.find(params.id)
        if (!book) {
          return response.status(404).json({data: 'página não encontrada'})
        }
        await book.delete()

        return response.status(204).json(null)
      }
}

module.exports = InstituicaoController
