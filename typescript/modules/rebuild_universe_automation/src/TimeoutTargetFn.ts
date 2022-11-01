export class TimeoutTargetFn {
	m_once: boolean
	m_callback: any
	m_timeout: number
	constructor(callback: any,timeout: number) {
		this.m_once=true
		this.m_callback=callback
		this.m_timeout=timeout
	}
	fire() {
		this.m_callback()
	}
}
