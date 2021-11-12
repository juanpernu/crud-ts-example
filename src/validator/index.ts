import { body, param, query } from 'express-validator';

class TodoValidator {
  checkCreateTodo() {
    return [
      body('id').optional().isUUID(4).withMessage('The id should be UUID v4'),
      body('title')
        .notEmpty()
        .withMessage('You must provide a title for the task'),
      body('completed')
        .optional()
        .isBoolean()
        .withMessage('The value should be boolean')
        .isIn([0, false])
        .withMessage('The value should be 0 or false')
    ];
  }

  checkReadTodo() {
    return [
      query('limit')
        .notEmpty()
        .withMessage('The query limiy should not be empty')
        .isInt({ min: 1, max: 10 })
        .withMessage('The limit value should be a number and between 1 and 10'),
      query('offset')
        .optional()
        .isNumeric()
        .withMessage('The offset value should be a number')
    ];
  }

  checkIdParam() {
    return [
      param('id')
        .notEmpty()
        .withMessage('The value ID should not be empty')
        .isUUID(4)
        .withMessage('The value should be UUID v4')
    ];
  }
}

export default new TodoValidator();
