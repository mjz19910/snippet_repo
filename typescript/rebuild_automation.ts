import {rebuild_auto_main} from "./src/rebuild_auto_main.js"
import {ScriptStateHost} from "./vm/ScriptStateHost.js"

export default function entry_point() {
	rebuild_auto_main()
	ScriptStateHost.event_target.dispatchEvent({type: 'userscript',state: 'done'})
}
