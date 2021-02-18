import { LinearAccessorObject } from "../types.ts";

export function outTypeScript(
  lin: LinearAccessorObject,
  topObjectName?: string
): string {
  return pieceTop(topObjectName ?? "accessor", createPieceInner(lin));
}

function pieceTop(top: string, content: string): string {
  return `
  const ${top} = {
    ${content}
  }
  export default ${top}
`;
}

function pieceInner(key: string, content: string) {
  return `
   ${key} : {
     ${content}
   }
`;
}
function pieceInnerTerminal(key: string, linear: string) {
  return `
   ${key} : "${linear}"
`;
}

function createPieceInner(lin: object): string {
  const allStrings: string[] = [];
  for (const [k, v] of Object.entries(lin)) {
    if (typeof v === "string") {
      allStrings.push(pieceInnerTerminal(k, v));
    } else {
      allStrings.push(pieceInner(k, createPieceInner(v)));
    }
  }
  return allStrings.join(",");
}
