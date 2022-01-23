import express from 'express';
import TaskController from '../controllers/taskController';

const router = express.Router();

router.post('/task/', TaskController.add);
router.get('/tasks/:userId', TaskController.getAll);
router.delete('/task/:id,:userId', TaskController.delete);
router.put('/updateTask/:id', TaskController.update)
router.patch('/updateTaskProperty/:id', TaskController.updateProperty)

module.exports = router;