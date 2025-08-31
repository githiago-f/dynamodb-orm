import { getProps } from "../utils/get-props";
import { Constructor, Properties } from "../utils/types/properties";

type BuilderBuild<T, Original extends Function> = {
  build(): Original["prototype"];
  clone(): PropsOfInstance<T, Original>;
};

type PropsOfInstance<T, Original extends Function> = {
  [K in keyof T]: (value: T[K]) => PropsOfInstance<Omit<T, K>, Original>;
} & BuilderBuild<T, Original>;

type Props<T extends Constructor> = {
  [K in keyof Properties<T>]: (
    value: Properties<T>[K],
  ) => PropsOfInstance<Omit<Properties<T>, K>, T>;
} & BuilderBuild<T, T>;

/**
 * builder for data classes
 **/
export function builder<T extends Constructor<any>>(
  buildee: T,
  ...args: unknown[]
): Props<T> {
  const instance = new buildee(...args);
  const keys = getProps(instance);

  const defaultProps = {
    build() {
      return instance;
    },
    clone() {
      const newBuilder = builder(buildee);
      for (const key of keys) {
        (newBuilder as any)[key](instance[key]);
      }
      return newBuilder;
    },
  } as Props<T>;

  return keys.reduce((acc, key) => {
    (acc as any)[key] = function (value: any) {
      instance[key] = value;
      return this;
    };
    return acc;
  }, defaultProps);
}
