import { Request, Response } from 'express';
import { v4 as uuid4 } from 'uuid';
import { TodoInstance } from '../model';

class TodoController {
  async getAll(req: Request, res: Response) {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.offset as number | undefined;
      const records = await TodoInstance.findAll({
        where: {},
        limit: limit,
        offset: offset
      });
      return res.json(records);
    } catch (e) {
      return res.json({ msg: 'fail to read', status: 500, route: '/read' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });
      if (!record)
        return res.status(404).json({ msg: 'Can not find existing record' });
      return res.json(record);
    } catch (e) {
      return res.json({ msg: 'fail to read', status: 500, route: '/read/:id' });
    }
  }

  async create(req: Request, res: Response) {
    const id = uuid4();
    try {
      const record = await TodoInstance.create({
        ...req.body,
        id
      });
      return res.json({ record, msg: 'Successfully create todo' });
    } catch (e) {
      return res.json({ msg: 'fail to create', status: 500, route: '/create' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });
      if (!record) return res.json({ msg: 'Can not find existing record' });

      const updatedRecord = await record.update({
        completed: !record.getDataValue('completed')
      });
      res.json({ msg: 'Task updated succefuly', record: updatedRecord });
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: '/update/:id'
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });
      if (!record) return res.json({ msg: 'Can not find existing record' });

      const deletedRecord = await record.destroy();
      res.json({ msg: 'Task deleted succefuly', record: deletedRecord });
    } catch (e) {
      return res.json({
        msg: 'fail to read',
        status: 500,
        route: '/update/:id'
      });
    }
  }
}

export default new TodoController();
