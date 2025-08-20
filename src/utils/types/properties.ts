export type Constructor<R = any> = new (...args: unknown[]) => R;

export type ExcludeMethods<T> = { [K in keyof T as T[K] extends Function ? never : K]: T[K] }

export type Properties<C extends Function> = ExcludeMethods<C['prototype']>;
