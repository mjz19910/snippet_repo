import {rebuild_auto_main} from "typescript/main.js"
import {ScriptStateHost} from "./ScriptStateHost.js"
export default function entry_point() {
	rebuild_auto_main()
	ScriptStateHost.event_target.dispatchEvent({type: 'userscript',state: 'done'})
}
