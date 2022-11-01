import {LOG_LEVEL_INFO} from "src/constants.js";
import {l_log_if} from "vm/l_log_if.js";
import {TimeoutNode} from "vm/TimeoutNode.js";
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
