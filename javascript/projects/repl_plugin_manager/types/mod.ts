import {Context} from "./shadow_vm"
import {REPLCommand,REPLServer} from "./shadow_repl"
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
