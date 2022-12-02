import {AbstractFireNode} from "./AbstractFireNode.js";

export class CallbackFireNode implements AbstractFireNode {
	m_callback: any;
	timeout: number;
	constructor(callback: any,timeout: number) {
		this.m_callback=callback;
		this.timeout=timeout;
	}
	fire() {
		this.m_callback();
	}
}
