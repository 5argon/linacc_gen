import { inYaml } from "./input/yaml.ts";
import { outTypeScript } from "./output/typescript.ts";
import { SupportedInput, SupportedOutput } from "./supported.ts";
import { LinearAccessorObject, Rc } from "./types.ts";

/**
 * Input a file path of hierarchical data, output a TypeScript file of the same
 * hierarchical shape with the terminal value as concatenated strings of previous
 * keys, using separator of your choice.
 */
export function createLinearAccessorFileFromFile(
  input: string,
  output: string,
  inputFormat: SupportedInput,
  outputFormat: SupportedOutput,
  separator: string,
  topObjectName?: string
): void {
  const lin: LinearAccessorObject = createLinearAccessorObjectFromFile(
    input,
    inputFormat,
    separator
  );
  let fileString: string = fileSwitch();

  function fileSwitch(): string {
    switch (outputFormat) {
      case SupportedOutput.TypeScript: {
        return outTypeScript(lin, topObjectName);
      }
      default: {
        throw new Error("Unsupported output type " + outputFormat);
      }
    }
  }

  const encoder = new TextEncoder();
  Deno.writeFileSync(output, encoder.encode(fileString));
  console.log("Finished writing to : " + output);
}

/**
 * Input file path of supported formats, returns an object where
 * all terminal values (non object) are replaced by linear accessor strings.
 */
export function createLinearAccessorObjectFromFile(
  input: string,
  inputFormat: SupportedInput,
  separator: string
): LinearAccessorObject {
  const decoder = new TextDecoder("utf-8");
  const fileBuffer: Uint8Array = Deno.readFileSync(input);
  const fileString: string = decoder.decode(fileBuffer);

  const o = fileSwitch();

  function fileSwitch(): Rc {
    switch (inputFormat) {
      case SupportedInput.Yaml: {
        return inYaml(fileString);
      }
      default: {
        throw new Error("Unsupported input type " + inputFormat);
      }
    }
  }

  return createLinearAccessorObject(o, separator);
}

/**
 * Input an `object` outputs an object where
 * all terminal values (non object) are replaced by linear accessor strings.
 */
export function createLinearAccessorObject(
  o: object,
  separator: string
): LinearAccessorObject {
  return processLinear(o, []);
  function processLinear(obj: object, keys: string[]): LinearAccessorObject {
    const lin: LinearAccessorObject = {};
    for (const [k, v] of Object.entries(obj)) {
      const extendedKeys = [...keys, k];
      if (typeof v === "object" && v !== null) {
        lin[k] = processLinear(v, extendedKeys);
      } else {
        lin[k] = extendedKeys.join(separator);
      }
    }
    return lin;
  }
}
