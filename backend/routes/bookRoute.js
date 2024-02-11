import express from "express";
import {Book} from "../models/bookModels.js"
const router =express.Router();


router.post('/',async(req,res)=>{
    try{
if(!req.body.title || !req.body.publishYear ||!req.body.author){
    return res.send({message:"PLease send all the required fields: title,author,publishyear"})
}
const newBook={
    title:req.body.title,
    author:req.body.author,
    publishYear:req.body.publishYear
}
const book=await Book.create(newBook)
return res.send(book)   
}
    catch(err){
        console.log(err)
        res.send({message:err.message})

    }
})

router.get("/",async (req,res)=>{
    try{
const books=await Book.find({})
return res.json({
    count:books.length,
    data:books
})
    }
    catch(err){
        console.log(err)
        res.send({message:err.message})
    }
})

router.get("/:id",async (req,res)=>{
    try{
        const {id}=req.params
const books=await Book.findById(id)
return res.json(books)
    }
    catch(err){
        console.log(err)
        res.send({message:err.message})
    }
})
// Route for Update a Book
router.put('/:id', async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
  
      const { id } = request.params;
  
      const result = await Book.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  router.delete('/:id', async (request, response) => {
    try {
    
      const { id } = request.params;
  
      const result = await Book.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      return response.status(200).send({ message: 'Book Deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

export default router;