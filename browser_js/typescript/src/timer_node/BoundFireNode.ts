export class BoundFireNode<T> {
	m_obj: T;
	m_callback: (this: T) => void;
	constructor(obj: T,callback: BoundFireNode<T>['m_callback']) {
		this.m_obj=obj;
		this.m_callback=callback;
	}
	fire() {
		this.m_callback.call(this.m_obj);
	}
}
