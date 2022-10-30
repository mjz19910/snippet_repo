import {rebuild_auto_main} from "./src/rebuild_auto_main"
import {ScriptStateHost} from "./vm/ScriptStateHost"

export default function entry_point() {
	rebuild_auto_main()
	ScriptStateHost.event_target.dispatchEvent({type: 'userscript',state: 'done'})
}
