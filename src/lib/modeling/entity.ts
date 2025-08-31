export const ENTITY_KEY = Symbol("ENTITY_METADATA_KEY");

export function Entity(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(ENTITY_KEY, true, target);
  };
}
