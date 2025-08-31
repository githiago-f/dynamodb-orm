export const SET_METADATA_KEY = Symbol("SET_METADATA_KEY");

export function ByteSet(): PropertyDecorator {
  return Reflect.metadata(SET_METADATA_KEY, "BS");
}

export function StringSet(): PropertyDecorator {
  return Reflect.metadata(SET_METADATA_KEY, "SS");
}

export function NumberSet(): PropertyDecorator {
  return Reflect.metadata(SET_METADATA_KEY, "NS");
}
