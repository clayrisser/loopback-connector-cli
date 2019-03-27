export interface Settings {
  command: string;
  operations: Operation[];
}

export interface Template {
  command?: string;
  args: string[];
}

export interface Functions {
  [key: string]: string[];
}

export interface Operation {
  template: Template;
  functions: Functions;
}

export interface DataAccessObject {
  [key: string]: any;
}
