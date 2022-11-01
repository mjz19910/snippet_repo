import {LOG_LEVEL_INFO} from "typescript/src/constants.js.ts";
import {l_log_if} from "typescript/vm/l_log_if.js.ts";
import {TimeoutNode} from "typescript/vm/TimeoutNode.js.ts";
import {TimeoutNodeTarget} from "./TimeoutNodeTarget.js"

export class AsyncTimeoutNode extends TimeoutNode {
	async start_async(target: TimeoutNodeTarget) {
		l_log_if(LOG_LEVEL_INFO,'start_async')
		this.m_target=target
		this.set()
		let promise=this.m_target.wait()
		l_log_if(LOG_LEVEL_INFO,'p',promise)
		await promise
	}
	set() {
		l_log_if(LOG_LEVEL_INFO,'set',this)
		super.set()
	}
	run() {
		l_log_if(LOG_LEVEL_INFO,'run',this)
		return super.run()
	}
	destroy() {
		if(this.m_target)
			this.m_target.destroy()
		super.destroy()
	}
}
