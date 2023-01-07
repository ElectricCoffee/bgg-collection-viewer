import React, { ReactNode } from "react";
import Arr from "./arrayHelpers";

namespace Str {
  export function preserveNewlines(
    str: string,
    newlineCharacter: string = "\n"
  ) {
    const chunks = str.split(newlineCharacter);

    return Arr.intersperse<ReactNode>(chunks, React.createElement("br"));
  }
}

export default Str;
