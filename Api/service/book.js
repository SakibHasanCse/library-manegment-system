import Book from './../model/book';
import { NotFound } from './../utils/error';


export const getBook = async () => {
    const book = await Book.find()
    return book;
}

export const singleBooks = async (id) => {

    const book = await Book.findOne({ _id: id, active: true })
    return book;
}

export const allBooks = async () => {

    const book = await Book.find({ active: true })
    return book;
}



export const createBook = async (book) => {
    const oldBook = await Book.findOne({ name: book.name })

    if (oldBook) {
        return new Error(`Book Already exists , Try anuther One`);
    }
    const newbook = new Book(book)
    const books = await newbook.save()
   
    if (books) {
        return res.status(201).json({
            success: true,
            message: 'Book created successfully'

        })
    }
    return new Error('Somthing went worng');

}


export const deleteBook = async (id) => {
    const books = await Book.findById(id)
    if (!books) {
        return new NotFound(`Book Not Found`)
    }
    const book = await Book.deleteOne({ _id: id })
    return book;
}

export const updateBook = async (body, id) => {
    const book = await Book.findOne({ _id: id })
    if (!book) {
        return new Error(`Book Not Found`)
    }

    const result = await Book.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (result) {
        return result
    }
    return new Error(`Somthing went wrong`)


}