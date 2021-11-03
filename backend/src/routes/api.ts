import express from 'express';
import TaskController from '../controllers/taskController';

const task = new TaskController()
const router = express.Router();


router.post('/addTask', task.add);
router.get('/allTasks/', task.getAll);

module.exports =  router;