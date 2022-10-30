import {AutoBuy} from "../../../vm/AutoBuy"
import {AutoBuyState} from "./AutoBuyState"

export class TimeoutTarget {
	m_once: boolean
	m_obj: AutoBuyState|AutoBuy|null
	m_callback: () => void
	constructor(obj: AutoBuyState|AutoBuy|null,callback: () => void) {
		this.m_once=true
		this.m_obj=obj
		this.m_callback=callback
	}
	fire() {
		this.m_callback.call(this.m_obj)
	}
}
