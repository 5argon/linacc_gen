import { parseYaml } from "../deps.ts";
import { Rc } from "../types.ts";
import { checks, thr } from "./helpers.ts";

export function inYaml(s: string): Rc {
  const yaml = parseYaml(s);
  if (checks(yaml)) {
    return yaml;
  }
  thr();
}
