export const getProps = (obj: object) => {
  const proto = Reflect.getPrototypeOf(obj);
  const inheritedProps = Reflect.ownKeys(proto!);

  const ownProps = Reflect.ownKeys(obj);

  return ([...inheritedProps, ...ownProps] as string[]).filter(
    (i) =>
      typeof (obj as any)[i] !== "function" ||
      typeof (proto as any)[i] !== "function",
  );
};
