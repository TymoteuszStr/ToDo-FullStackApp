import express from 'express';
import TaskController from '../controllers/taskController';

const router = express.Router();

router.post('/task/', TaskController.add);
router.get('/tasks/', TaskController.getAll);
router.delete('/task/:id', TaskController.delete);

module.exports =  router;