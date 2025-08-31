export const SAVE_AS_METADATA_KEY = Symbol("SAVE_AS_METADATA_KEY");

export function SaveAs(name: string) {
  return Reflect.metadata(SAVE_AS_METADATA_KEY, name);
}
