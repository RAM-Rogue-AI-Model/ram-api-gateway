import { Request } from 'express';

import { AuthenticatedUser } from './AuthenticateType';

export interface RequestWithUser extends Request {
  user?: AuthenticatedUser;
}
