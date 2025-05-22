export enum UserGroup {
    SUPERADMIN = 'superadmin',
    ADMIN = 'admin',
    MOBILE = 'mobile',
    ANALYTICS = 'analytics',
}

export const UserGroupLevel = {
    [UserGroup.ANALYTICS]: 0,
    [UserGroup.MOBILE]: 1,
    [UserGroup.ADMIN]: 2,
    [UserGroup.SUPERADMIN]: 3,
} as const;

export const hasRights = (userGroup: UserGroup, requiredGroup: UserGroup) => {
  return UserGroupLevel[userGroup] >= UserGroupLevel[requiredGroup];
};

export const getHighestRole = (userGroups: UserGroup[]) => {
  return userGroups.reduce((highest, current) => {
    return UserGroupLevel[current] > UserGroupLevel[highest] ? current : highest;
  }, userGroups[0]);
};
