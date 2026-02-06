import { Request, Response } from 'express';

import { config } from '../utils/config';
import { Requests } from '../utils/Request';

class LoggerController {
  request;
  constructor() {
    this.request = new Requests(config.MS_LOGGER_URL);
  }

  async getAll(req: Request, res: Response) {
    try {
      const data = await this.request.get(`/log`);
      res.json(data);
      return;
    } catch {
      res.sendStatus(500);
      return;
    }
  }
}

export { LoggerController };
