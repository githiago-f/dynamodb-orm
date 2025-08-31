import { Properties } from "./properties";

export type Key<T extends string | number> = T;
export type PK<T extends string | number> = T;

export type KeysOnly<C extends Function, P = Properties<C>> = {
  [K in keyof P as P[K] extends Key<string | number> ? K : never]: P[K]
};
