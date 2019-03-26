export interface Settings {
  command: string;
  operations: Operation[];
}

export type Params = string[] | { name: string; source: string }[];

export interface Functions {
  [key: string]: Params;
}

export interface Operation {
  template: string;
  functions: Functions;
}
