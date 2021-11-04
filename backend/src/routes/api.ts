import express from 'express';
import TaskController from '../controllers/taskController';

const task = new TaskController()
const router = express.Router();


router.post('/task/', task.add);
router.get('/tasks/', task.getAll);
router.delete('/task/:id', task.delete);

module.exports =  router;