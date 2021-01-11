export type GroupsStackScreenParamsList = {
  Groups: undefined;
  Group: { groupId: string; owner: any };
  AddMember: { groupId: string };
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
export interface PopulatedGroup {
  id?: string;
  name: string;
  createdBy: {
    id: string;
    displayName: string;
    email: string;
    photoUrl: string;
  };
  createdDate: string;
  members: Array<string>;
  expenses: Expense[] | null;
}

export interface UserCollection {
  displayName: string;
  email: string;
  photoUrl: null | string;
  memberof: string[];
  invitations: string[];
}
