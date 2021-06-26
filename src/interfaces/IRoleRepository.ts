import { Role } from '@prisma/client';
import { GetUserRole } from '../types/Role';

export interface IRoleRepository {
  getRoleByName(roleName: string): Promise<Role>;

  assignRoleToUser(roleId: bigint, userId: bigint): Promise<boolean>;

  getUserRole(userId: bigint): Promise<GetUserRole>;
}
