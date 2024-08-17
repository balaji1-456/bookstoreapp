
import  express from 'express';
import { Book } from "../models/bookModel.js";
const router=express.Router();

//to post the new book
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'send all required fields',
      })
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    }

    const book = await Book.create(newBook)
    return response.status(201).send(book)
  } catch (error) {
    console.log(error.message)
    response.status(500).send({
      message: error.message,
    })
  }
})

//to get all books from database

router.get('/', async (request, response) => {
  try {
    const books = await Book.find({})
    response.status(200).json({
      quantity: books.length,
      data: books,
    })
  } catch (error) {
    console.log(error)
  }
})

//get one book by id from database

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params

    const book = await Book.findById(id)
    return response.status(200).json(book)
  } catch (error) {
    console.log(error)
    response.status(500).send({ message: error.message })
  }
})
//update a book by id

router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      })
    }

    const { id } = request.params

    const result = await Book.findByIdAndUpdate(id, request.body)

    if (!result) {
      return response.status(404).json({ message: 'Book not found' })
    }

    return response.status(200).send({ message: 'Book updated successfully' })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

//delete a book by id

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const result = await Book.findByIdAndDelete(id)
    if (!result) {
      return response.status(404).send('book not found')
    }
    return response.status(200).send('deleted the book successfully')
  } catch (error) {
    response.status(500).send({ message: error.message })
  }
})


export default router