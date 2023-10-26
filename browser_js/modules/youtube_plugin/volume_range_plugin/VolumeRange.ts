import {HTMLMediaElementGainController} from "./HTMLMediaElementGainController.ts"

export class VolumeRange {
	cache: boolean
	max: number
	min: number
	overdrive: number
	gain_controller: HTMLMediaElementGainController
	range_element: any
	view_div: any
	constructor(min: number,max: number,overdrive: number,obj: HTMLMediaElementGainController) {
		this.cache=true
		this.max=max
		this.min=min
		this.overdrive=overdrive
		this.gain_controller=obj
	}
	setGain(gain: number) {
		this.gain_controller.setGain(gain)
		this.setGainCache(gain)
	}
	setGainCache(gain: any) {
		if(!this.cache)
			return
		this.setHistoryStateCache('filter_gain',gain)
	}
	getGainCache() {
		if(!this.cache)
			return null
		if(typeof history.state=='object') {
			return this.getHistoryStateCache('filter_gain')
		}
		return null
	}
	setHistoryStateCache(key: string,value: any) {
		if(typeof history.state==='object') {
			history.replaceState({...history.state,[key]: value},document.title)
		} else {
			console.log('history-replace',[history.state])
			history.replaceState({[key]: value},document.title)
		}
	}
	getHistoryStateCache(key: string) {
		if(!this.cache)
			return null
		if(history.state!==null&&history.state.hasOwnProperty(key)) {
			let {[key]: value}=history.state
			return value
		}
		return null
	}
	loadCachedGain() {
		if(!this.cache)
			return 1*this.max
		console.log('history-cache',[history.state])
		let c_gain=this.getGainCache()
		if(c_gain===null)
			c_gain=1
		return c_gain*this.max
	}
	max_compressor_reduction=-0.00011033167538698763
	on_key_down(event: KeyboardEvent) {
		if(!this.range_element)
			return
		this.gain_controller.last_event=event
		if(event.key=="f") {
			var compressor_reduction_factor=this.gain_controller.dynamics_compressor.reduction
			if(compressor_reduction_factor>0) {
				console.log('+',compressor_reduction_factor)
				return
			}
			let new_gain=Math.log((compressor_reduction_factor)*-1)
			if(new_gain>0)
				return
			new_gain=(new_gain*-1)/(Math.log(this.max_compressor_reduction*-1)*-1/2)
			console.log('ng',new_gain,compressor_reduction_factor)
			if(new_gain>this.overdrive)
				new_gain=this.overdrive
			if(new_gain<this.min)
				new_gain=this.min
			this.range_element.value=""+Math.floor(this.max*new_gain)
			this.setGain(new_gain)
		}
	}
	attach_to_element(view_parent: Element) {
		if(!this.view_div) {
			let element=document.getElementById('rh_css')
			if(!element) {
				element=document.createElement("div")
				element.id='rh_css'
			}
			this.view_div=element
		}
		if(!this.range_element) {
			let element=document.getElementById('i_r_css')
			if(element instanceof HTMLInputElement)
				this.range_element=element
			if(!this.range_element) {
				if(element)
					element.remove()
				this.range_element=document.createElement('input')
				this.range_element.type="range"
				this.range_element.id="i_r_css"
				let range_style=this.range_element.style
				range_style.width="calc(100% + 40px + 8px + 40px)"
				range_style.marginLeft=0
				range_style.marginRight=0
			}
			this.range_element
			this.range_element.oninput=() => {
				if(!this.range_element)
					return
				this.setGain(this.range_element.value/this.max)
			}
			this.range_element.onkeydown=(event: KeyboardEvent) => this.on_key_down(event)
			this.range_element.min=""+this.min
			this.range_element.max=""+this.overdrive
			let new_gain=this.loadCachedGain()
			this.range_element.value=""+new_gain
			this.setGain(new_gain/this.max)
			this.view_div.append(this.range_element)
		}
		view_parent.insertAdjacentElement("beforebegin",this.view_div)
	}
}
