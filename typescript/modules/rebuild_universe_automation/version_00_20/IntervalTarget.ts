export class IntervalTarget {
	m_once: boolean
	m_obj: any
	m_callback: any
	constructor(obj: any,callback: any) {
		this.m_once=false
		this.m_obj=obj
		this.m_callback=callback
	}
	fire() {
		this.m_callback.call(this.m_obj)
	}
}
