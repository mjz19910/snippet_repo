import {TimeoutTargetFireNode} from "./TimeoutTargetFireNode";

export class TimeoutTargetFireDataNode<T> extends TimeoutTargetFireNode<T> {
	m_description: string;
	constructor(obj: T,callback: TimeoutTargetFireNode<T>['m_callback'],description: string) {
		super(obj,callback);
		this.m_description=description;
	}
}
