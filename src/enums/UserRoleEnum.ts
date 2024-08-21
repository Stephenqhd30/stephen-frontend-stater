export enum UserRoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  BAN = 'ban',
}

export const userRoleList = [
  {
    label: '普通用户',
    value: 'user',
  },
  {
    label: '管理员',
    value: 'admin',
  },
  {
    label: '被禁用',
    value: 'ban',
  },
];

export const userRoleTagColor = ['processing', 'success', 'error'];
