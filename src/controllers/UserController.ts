import { Request, Response } from 'express';

import { UpdateUserBody } from '../types/UserType';
import { config } from '../utils/config';
import { Requests } from '../utils/Request';

class UserController {
  request;
  constructor() {
    this.request = new Requests(config.MS_USER_URL);
  }

  async find(res: Response) {
    try {
      const data = await this.request.get(`/user`);
      res.json(data);
      return;
    } catch (error) {
      console.error('Error fetching users:', error);
      res.sendStatus(500);
      return;
    }
  }

  async findOne(req: Request, res: Response) {
    if (!req.params.id) {
      res.status(400).send({ message: 'Missing parameters' });
      return;
    }

    const id = req.params.id as string;

    try {
      const data = await this.request.get(`/user/${id}`);
      res.json(data);
      return;
    } catch (error) {
      console.error('Error fetching users:', error);
      res.sendStatus(500);
      return;
    }
  }

  async delete(req: Request, res: Response) {
    if (!req.params.id) {
      res.status(400).send({ message: 'Missing parameters' });
      return;
    }

    const id = req.params.id as string;

    try {
      await this.request.delete(`/user/${id}`);
      res.sendStatus(200);
      return;
    } catch (error) {
      console.error('Error fetching users:', error);
      res.sendStatus(500);
      return;
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const body = req.body as UpdateUserBody;

      const data = await this.request.patch(`/user/${id}/password`, JSON.stringify(body));
      res.json(data);
      return;
    } catch (err) {
      res.sendStatus(500);
      return;
    }
  }

  async rename(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const body = req.body as UpdateUserBody;

      const data = await this.request.patch(
        `/user/${id}/rename`,
        JSON.stringify(body)
      );
      res.json(data);
      return;
    } catch {
      res.sendStatus(500);
      return;
    }
  }
}

export { UserController };
