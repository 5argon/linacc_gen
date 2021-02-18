import { parseFlags } from "./deps.ts";
import type { FlagsArgs } from "./deps.ts";
import { createLinearAccessorFileFromFile } from "./generate.ts";
import { SupportedInput, SupportedOutput } from "./supported.ts";

if (import.meta.main) {
  const flags: FlagsArgs = parseFlags(Deno.args);
  const files: (string | number)[] = flags._;

  if (files.length !== 2) {
    throw new Error(
      "Must specify exactly one input file, and one output file path."
    );
  }

  const input = files[0];
  const output = files[1];

  if (typeof input !== "string" || typeof output !== "string") {
    throw new Error("Input and output files must be string.");
  }

  createLinearAccessorFileFromFile(
    input,
    output,
    SupportedInput.Yaml,
    SupportedOutput.TypeScript,
    "."
  );
}
