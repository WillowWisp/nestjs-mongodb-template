export const roleList = ['user', 'admin'] as const;
export type Role = typeof roleList[number];
