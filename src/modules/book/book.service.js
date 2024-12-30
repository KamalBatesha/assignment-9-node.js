import { db } from "../../DB/connectionDB.js";
import bookModel from "../../DB/models/book.model.js";

export const createBooksIndex=(req, res) => {
    bookModel.createIndex({ title: 1 })
        .then(() => res.json({message:'Index on books.title created'}))
        .catch(err => res.status(500).send(err));
}



export const addBook=async(req, res) => {
    const { title, author, year,genres } = req.body;
    try{

        let book=await bookModel.insertOne({ title, author, year,genres })
        res.status(200).json({message:"book added", book})
        
    }catch(error){
        console.log(error);
        
        res.status(500).json({message:"Error adding book", error})
    }
}
export const addBooks=async(req, res) => {
    try{

        const books = req.body.books;
        const booksData=await bookModel.insertMany(books)
        return res.status(200).json({message:"books added sucessufly",booksData})
        
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Error adding books", error})
    }
}

export const updateBook=async(req, res) => {
    try{

        const { title, year } = req.body;
        const bookData=await bookModel.updateOne(
            { title },
            { $set: { year } }
        )
        return res.status(200).json({message:"books updated sucessufly",bookData})
        
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Error updateing books", error})
    }
}

export const findBookByTitle= async (req, res) => {
    const { title } = req.body;
    try {
        const book = await bookModel.findOne({ title });
        book? res.status(200).json({ message: "book found", book }): res.status(400).json({ message: "book not found"})
    } catch (err) {
        res.status(500).json({});
    }
};

export const findBooksByYearRange= async (req, res) => {
    try {
        const books = await bookModel.find({ year: { $gte: 1990, $lte: 2010 } }).toArray();
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const findBooksByGenre= async (req, res) => {
    const{genres}=req.body
    try {
        const books = await db.collection('books').find({ genres: { $elemMatch: { $eq: genres } } }).toArray();;
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
};
export const findBooksPaginated=async (req, res) => {
    try {
        const books = await bookModel.find().sort({ year: -1 }).skip(2).limit(3).toArray();
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const findBooksByYearType= async (req, res) => {
    try {
        const books = await bookModel.find({ year: { $type: 'int' } }).toArray();
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const findBooksExcludingGenres= async (req, res) => {
    const { genres } = req.body;// must be an array of strings
    try {
        const books = await db.collection('books').find({ genres: { $nin: genres } }).toArray();
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
};
export const deleteBooksBefore2000= async (req, res) => {
    try {
        const result = await bookModel.deleteMany({ year: { $lt: 2000 } });
        res.json({result});
    } catch (err) {
        res.status(500).send(err);
    }
};

export const filterBooksAfter2000Sorted= async (req, res) => {
    try {
        const books = await bookModel.aggregate([
            { $match: { year: { $gt: 2000 } } },
            { $sort: { year: -1 } }
        ]).toArray();
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const filterBooksAfter2000Fields= async (req, res) => {
    try {
        const books = await bookModel.aggregate([
            { $match: { year: { $gt: 2000 } } },
            { $project: { title: 1, author: 1, year: 1, _id: 0 } }
        ]).toArray();
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const unwindGenres= async (req, res) => {
    try {
        const books = await bookModel.aggregate([
            { $unwind: "$genres" }
        ]).toArray();
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const joinBooksAndLogs= async (req, res) => {
    try {
        const result = await bookModel.aggregate([
            {
                $lookup: {
                    from: "logs",
                    localField: "_id",
                    foreignField: "book_id",
                    as: "logs"
                }
            }
        ]).toArray();
        res.json(result);
    } catch (err) {
        res.status(500).send(err);
    }
};