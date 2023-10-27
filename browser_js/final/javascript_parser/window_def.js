/** @arg {unknown} v */
function unknown(v) {return v;}
let window=cast_as(globalThis);
/** @type {Window&typeof globalThis} */
// deno-lint-ignore prefer-const
let window=unknown(globalThis);
export default window;
