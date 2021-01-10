export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
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

export interface UserCollection {
  displayName: string;
  email: string;
  photoUrl: null | string;
}
