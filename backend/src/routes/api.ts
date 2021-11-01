import express from 'express';
import ToDoCollectionController from '../controllers/toDoCollectionController';

const toDoCollection = new ToDoCollectionController()
const router = express.Router();


router.get('/todos/:userId',  toDoCollection.getAllTodosFromCollection);


module.exports =  router;