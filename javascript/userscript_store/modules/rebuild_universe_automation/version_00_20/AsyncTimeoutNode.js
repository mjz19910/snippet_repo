import {LOG_LEVEL_INFO} from "types/constants.js";
import {l_log_if} from "./l_log_if";
import {TimeoutNode} from "./TimeoutNode";

export class AsyncTimeoutNode extends TimeoutNode {
	/**@arg {{wait():Promise<any>;destroy():void}} target */
	async start_async(target) {
		if(!target)
			throw new Error("unable to start_async without anything to wait for");
		l_log_if(LOG_LEVEL_INFO, 'start_async');
		this.m_target = target;
		this.set();
		let promise = this.m_target.wait();
		l_log_if(LOG_LEVEL_INFO, 'p', promise);
		await promise;
	}
	set() {
		l_log_if(LOG_LEVEL_INFO, 'set', this);
		super.set();
	}
	run() {
		l_log_if(LOG_LEVEL_INFO, 'run', this);
		return super.run();
	}
	destroy() {
		if(this.m_target)
			this.m_target.destroy();
		super.destroy();
	}
}
