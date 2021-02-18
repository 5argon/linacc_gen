import { Rc } from "../types.ts";

export function thr(): never {
  throw new Error("Input file is not supported.");
}

export function checks(u: unknown): u is Rc {
  if (typeof u !== "object") {
    throw new Error("Input file parsed into a non-hierarchical shape.");
  }
  if (u === null) {
    throw new Error("Input file is empty.");
  }
  return true;
}
