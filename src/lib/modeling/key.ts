export const PK_METADATA_KEY = Symbol("PARTITION_KEY_METADATA_KEY");
export const SK_METADATA_KEY = Symbol("SORT_KEY_METADATA_KEY");
export const PK_NAME_KEY = Symbol("PARTITION_KEY_NAME_KEY");
export const SK_NAME_KEY = Symbol("SORT_KEY_NAME_KEY");

export function PartitionKey(name?: string): PropertyDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(PK_METADATA_KEY, true, target, propertyKey);
    Reflect.defineMetadata(
      PK_NAME_KEY,
      name ?? propertyKey,
      target,
      propertyKey,
    );
  };
}

export function SortKey(name?: string): PropertyDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(SK_METADATA_KEY, true, target, propertyKey);
    Reflect.defineMetadata(
      SK_NAME_KEY,
      name ?? propertyKey,
      target,
      propertyKey,
    );
  };
}
