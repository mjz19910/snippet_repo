import {cast_as} from "./cast_as.ts";
/** @type {Window&typeof globalThis} */
// deno-lint-ignore prefer-const
let window=cast_as(globalThis);
export default window;
