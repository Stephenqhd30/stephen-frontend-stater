/**
 * 用户角色枚举
 */
export enum UserRoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  BAN = 'ban',
}

/**
 * 用户角色枚举
 */
export const userRoleEnum = {
  admin: {
    text: '管理员',
    value: UserRoleEnum.ADMIN,
    color: 'processing',
  },
  user: {
    text: '普通用户',
    value: UserRoleEnum.USER,
    color: 'success',
  },
  ban: {
    text: '封禁',
    value: UserRoleEnum.BAN,
    color: 'error',
  }
}
