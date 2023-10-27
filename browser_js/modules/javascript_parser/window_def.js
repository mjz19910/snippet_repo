/** @arg {any} v */
function any(v) {return v;}
/** @type {Window&typeof globalThis} */
// deno-lint-ignore prefer-const
let window=any(globalThis);
export default window;
