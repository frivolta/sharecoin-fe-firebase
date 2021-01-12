export type GroupsStackScreenParamsList = {
  Groups: undefined;
  Group: { groupId: string; owner: any };
  AddMember: { groupId: string; groupName: string; owner: GroupOwner };
};

export interface Expense {
  groupId: string;
  insertedBy: string;
  payedBy: string;
  payedFor: string[];
}

export interface Group {
  id?: string;
  name: string;
  createdBy: string;
  createdDate: string;
  members: Array<string>;
  expenses: Expense[] | null;
}

export interface GroupOwner {
  id: string;
  displayName: string;
  email: string;
  photoUrl: string;
}
export interface PopulatedGroup {
  id?: string;
  name: string;
  createdBy: GroupOwner;
  createdDate: string;
  members: Array<string>;
  expenses: Expense[] | null;
}

export interface Invitation {
  id: string;
  invitedAt: string;
  invitedBy: GroupOwner;
  invitedToId: string;
  invitedToName: string;
}

export interface UserCollection {
  displayName: string;
  email: string;
  photoUrl: null | string;
  memberof: string[];
  invitations: Invitation[];
}
