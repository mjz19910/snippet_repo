import {BaseNode} from "./BaseNode";

export class BaseTimeoutNode extends BaseNode {
	timeout;
	constructor(timeout: number | undefined) {
		super();
		this.timeout = timeout;
	}
	get_timeout() {
		return this.timeout;
	}
}
