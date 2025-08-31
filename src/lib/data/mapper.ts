import { getProps } from "../../utils/get-props";
import { SET_METADATA_KEY } from "../modeling/set-annotations";
import { btos } from "../../utils/btos";
import { anyToS } from "../../utils/any-to-s";
import { SAVE_AS_METADATA_KEY } from "../modeling/save-as";

type CollectionDescriptors = "SS" | "NS" | "BS" | "L";

type Value =
  | { S: string }
  | { N: number }
  | { B: string }
  | { NULL: null }
  | { BOOL: boolean }
  | { M: Record<string, any> }
  | { L: Value[] }
  | { SS: string[] }
  | { NS: number[] }
  | { BS: string[] };

export function map(entity: any) {
  const proto = Reflect.getPrototypeOf(entity);
  const props = getProps(entity);

  const getName = (prop: string) => {
    if (Reflect.hasOwnMetadata(SAVE_AS_METADATA_KEY, proto!, prop)) {
      return Reflect.getOwnMetadata(SAVE_AS_METADATA_KEY, proto!, prop);
    }
    return prop;
  };

  const getType = (prop: string) => {
    let SetType: CollectionDescriptors = "L";

    if (Reflect.hasOwnMetadata(SET_METADATA_KEY, proto!, prop)) {
      SetType = Reflect.getOwnMetadata(SET_METADATA_KEY, proto!, prop);
    }

    return SetType;
  };

  const mapValue = (val: unknown): Value => {
    if (val instanceof Uint8Array) {
      return { B: btos(val) };
    }
    switch (typeof val) {
      case "string":
        return { S: val };
      case "number":
        return { N: val };
      case "boolean":
        return { BOOL: val };
      case "object":
        if (val !== null)
          return {
            M: Object.keys(val).reduce(
              (acc, key) => {
                acc[key] = mapValue((val as any)[key]);
                return acc;
              },
              {} as Record<string, any>,
            ),
          };
    }

    return { NULL: null };
  };

  const result: Record<string, Value> = {};
  for (const prop of props) {
    const keyName = getName(prop);

    if (Array.isArray(entity[prop])) {
      switch (getType(prop)) {
        case "BS":
          result[keyName] = { BS: entity[prop].map(btos) };
          break;
        case "SS":
          result[keyName] = { SS: entity[prop].map(anyToS) };
          break;
        case "NS":
          result[keyName] = { NS: entity[prop] };
          break;
        case "L":
          result[keyName] = { L: entity[prop].map(mapValue) };
          break;
      }

      continue;
    }

    result[keyName] = mapValue(entity[prop]);
  }

  return result;
}
