declare class DirtyJson {
  static parse(str: string): object;
}

declare module 'dirty-json' {
  function parse(str: string): object;
  export = DirtyJson;
}
