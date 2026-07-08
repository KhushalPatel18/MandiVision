import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { prisma } from '../../services/prisma.service';
import { hashPassword, comparePassword } from '../../services/password.service';
import { generateToken } from '../../services/jwt.service';
import { ApiError } from '../../utils/ApiError';

export const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw ApiError.conflict('A user with this email already exists');
  }

  // Hash password and create user
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  // Generate JWT
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  // Compare passwords
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  // Generate JWT
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

export const getProfile = catchAsync(async (req: Request, res: Response) => {
  const tokenPayload = (req as any).user;
  if (!tokenPayload) {
    throw ApiError.unauthorized();
  }

  const user = await prisma.user.findUnique({
    where: { id: tokenPayload.userId },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  res.status(200).json(user);
});
