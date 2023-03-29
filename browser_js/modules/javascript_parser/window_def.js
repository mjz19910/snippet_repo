/** @arg {any} v */
function any(v) {return v;}
/** @type {Window&typeof globalThis} */
let window=any(globalThis);
export default window;
