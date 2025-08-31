export const anyToS = (object: unknown) => {
  if (typeof object === "string") return object;
  return String(object);
};
