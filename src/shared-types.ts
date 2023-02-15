import type { Component, ComponentType } from 'react';

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

export type ValueOf<T> = T[keyof T];

export type ComponentPropsOf<T> = T extends ComponentType<infer P> | Component<infer P> ? P : never;
