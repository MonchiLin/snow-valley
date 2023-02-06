export type EdgeInsets = {
  top: number;
  right: number;
  left: number;
  bottom: number;
};

export type Bounds = {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
};

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
