import express from 'express';
import TaskController from '../controllers/taskController';

const router = express.Router();

router.get('/tasksArchive/', TaskController.getAll);


module.exports = router;