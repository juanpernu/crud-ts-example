import express from 'express';
import TodoValidator from '../validator';
import TodoController from '../controller';
import Middleware from '../middleware';

const router = express.Router();

router.post(
  '/create',
  TodoValidator.checkCreateTodo(),
  Middleware.handleError,
  TodoController.create
);

router.get(
  '/read',
  TodoValidator.checkReadTodo(),
  Middleware.handleError,
  TodoController.getAll
);

router.get(
  '/read/:id',
  TodoValidator.checkIdParam(),
  Middleware.handleError,
  TodoController.getById
);

router.put(
  '/update/:id',
  TodoValidator.checkIdParam(),
  Middleware.handleError,
  TodoController.update
);

router.delete(
  '/delete/:id',
  TodoValidator.checkIdParam(),
  Middleware.handleError,
  TodoController.delete
);

export default router;
