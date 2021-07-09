enum userGroups {
  winotoadmin = 1,
  planner = 2,
  worker = 3,
}

export function getUserGroupNumber(usergroup: string): number {
  return userGroups[usergroup as keyof typeof userGroups];
}
