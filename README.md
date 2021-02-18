# linacc_gen

"Linear Accessor" Generator.

Accessing a specific "node" in a file with **keyed hierarchical structure** data would require a **hierarchical keys** to travel to that node. Common scheme is to normalize all the hierarchy by concatenating all the strings with a symbol like `.`. In a sense, the key becomes "linear".

The purpose of the **linear accessor** is so each linearly concatenated keys are **nested back** in hierarchical object leading into it, essentially restoring back the hierarchical nature.

Accessing the node programmatically is then could be assisted by the code editor and language server of that accessor. It is also possible to quickly find the file where a particular term is used using find reference feature of that editor, among other convenient toolings.

This is a Deno module to read a file with **keyed hierarchical structure**, then **codegen** a new **linear accessor** file of that file.

## Usage

Use [Deno script installer](https://deno.land/manual/tools/script_installer) on the `cli.ts` file with permissions `--allow-read --allow-write `. If not renaming the command, then you can `linacc_gen [input file] [output file]`.

Note that when something other than YAML -> TypeScript is supported, you likely need to specify the conversion pair for the command to work. (Not right now)

Exports to programmatically do that in your own Deno module are collected in `mod.ts` file.

## Example

If an input is YAML, and output is TypeScript :

```yaml
a:
  x: Hello 1
  y: Hello 2
  z: Hello 3
b:
  x: Hello 4
  y: Hello 5
  z: Hello 6
```

Produces an accessor file with this content :

```ts
const accessor = {
  a: {
    x: "a.x",
    y: "a.y",
    z: "a.z",
  },
  b: {
    x: "b.x",
    y: "b.y",
    z: "b.z",
  },
};
export default accessor;
```

Then you can use the accessor as you like in place of hard coding the linear accessor string :

```ts
import sampleYaml from "./myAccessorFile.ts";
myYamlReader.read("yamlFile.yaml", sampleYaml.b.y);
// myYamlReader.read("yamlFile.yaml", "b.y")
```

Though the output code is currently not this nicely formatted. You can use a formatter that language as a post-processing. (If TypeScript, then you can use `deno fmt` the output file right after.)

## Supported formats

### Input

- YAML

### Output

- TypeScript
