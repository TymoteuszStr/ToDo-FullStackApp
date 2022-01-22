import { Request } from 'express';

export interface IRequest extends Request {
  USER_ID: string | null
}
