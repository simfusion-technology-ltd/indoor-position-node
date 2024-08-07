import { Request, Response } from 'express';

export const health = (req: Request, res: Response) => {
  res.json({ ok: true, uptime: process.uptime(), now: new Date().toISOString() });
};