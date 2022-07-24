import {AsyncTimeoutTarget} from "./AsyncTimeoutTarget"
import {TimeoutNode} from "./TimeoutNode"

export class AsyncTimeoutNode extends TimeoutNode {
	run() {
		super.run()
		if(this.target)
			this.target.fire()
	}
	start_async(target: AsyncTimeoutTarget | null) {
		if(target) {
			this.target = target
			this.set()
			return target.wait()
		}
		throw new Error("unable to start_async without anything to wait for")
	}
}
