import { UserRole } from 'generated/prisma';

export class UserResponseDto {
  id: number;
  name: string;
  user_name: string;
  email?: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
  created_by?: number;
  updated_by?: number;
}

export class UserListDto {
  id: number;
  name: string;
  user_name: string;
  email?: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}
