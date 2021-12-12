import express from 'express';
import TaskController from '../controllers/taskController';

const router = express.Router();

router.post('/task/', TaskController.add);
router.get('/tasks/', TaskController.getAll);
router.delete('/task/:id', TaskController.delete);
router.put('/editTask/:id', TaskController.update)
router.patch('/editTaskProperty/:id', TaskController.updateProperty)

module.exports = router;