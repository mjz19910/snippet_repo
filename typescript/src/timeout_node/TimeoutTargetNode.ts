import {AbstractFireNode} from "./AbstractFireNode.js";

export class TimeoutTargetFireNode<T> implements AbstractFireNode {
	m_once: boolean;
	m_obj: T;
	m_callback: (this: T) => void;
	constructor(obj: T,callback: TimeoutTargetFireNode<T>['m_callback']) {
		this.m_once=true;
		this.m_obj=obj;
		this.m_callback=callback;
	}
	fire() {
		this.m_callback.call(this.m_obj);
	}
}

export class TimeoutTargetWithDesc<T> implements AbstractFireNode {
	m_obj: T;
	m_callback: (this: T) => void;
	m_description: string;
	constructor(obj: T,callback: TimeoutTargetFireNode<T>['m_callback'], description: string) {
		this.m_obj=obj;
		this.m_callback=callback;
		this.m_description=description;
	}
	fire() {
		this.m_callback.call(this.m_obj);
	}
}
