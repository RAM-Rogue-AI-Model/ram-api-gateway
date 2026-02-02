import { Request, Response } from 'express';

import { CreateItemInput } from '../types/Item';
import { RequestWithUser } from '../types/Request';
import { config } from '../utils/config';
import { Requests } from '../utils/Request';

class ItemController {
  request;
  constructor() {
    this.request = new Requests(config.MS_ITEM_URL);
  }

  async create(req: RequestWithUser, res: Response) {
    try {
      const body = req.body as CreateItemInput;

      const data = await this.request.post('/item', JSON.stringify(body));
      res.json(data);
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const level: string = req.params.level as string;
      const levelNum = parseInt(level);
      if (isNaN(levelNum)) {
        res.sendStatus(400);
        return;
      }

      const data = await this.request.get(`/item?level=${levelNum}`);
      res.json(data);
      return;
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async findOne(req: RequestWithUser, res: Response) {
    try {
      const id = req.params.id as string;

      if (!id) {
        res.sendStatus(400);
        return;
      }

      const data = await this.request.get(`/item/${id}}`);
      res.json(data);
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const data = await this.request.put(
        `/item/${id}`,
        JSON.stringify(req.body)
      );
      res.json(data);
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  async delete(req: RequestWithUser, res: Response) {
    try {
      const id = req.params.id as string;
      await this.request.delete(`/item/${id}`);
      res.sendStatus(200);
      return;
    } catch {
      res.sendStatus(500);
      return;
    }
  }
}

export { ItemController };
