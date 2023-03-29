export class BaseTimeoutNode {
	timeout
	constructor(timeout: number|undefined) {
		this.timeout=timeout
	}
	get_timeout() {
		return this.timeout
	}
}
