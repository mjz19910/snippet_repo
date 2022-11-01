import {Context} from "./shadow_vm.js"
import {REPLCommand,REPLServer} from "./shadow_repl.js"
export function use_imports() {
	let tt: Context|REPLServer|REPLCommand|null=null
	return [
		tt,
	]
}
export {
	Context,
	REPLServer,
	REPLCommand,
}
