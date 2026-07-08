import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';

export const getUsers = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});

export const getUserById = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});

export const updateUser = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});

export const deleteUser = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Route working' });
});
