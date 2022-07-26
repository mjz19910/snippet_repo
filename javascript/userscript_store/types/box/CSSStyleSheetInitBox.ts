import {MediaListBox} from "./MediaListBox"
import {BoxTemplate} from "./template/BoxTemplate"
import {BoxVerify} from "./BoxVerify"

export class CSSStyleSheetInitBox
	extends BoxTemplate<"shape_box",CSSStyleSheetInit>
	implements BoxVerify<CSSStyleSheetInitBox,"CSSStyleSheetInitBox">
{
	readonly type="shape_box"
	readonly shape="CSSStyleSheetInit"
	readonly m_verify_name="CSSStyleSheetInitBox"
	verify_name(name: "CSSStyleSheetInitBox") {
		return this.m_verify_name==='CSSStyleSheetInitBox'&&name==='CSSStyleSheetInitBox'
	}
	set_property(key: keyof CSSStyleSheetInit,value: string|boolean|MediaListBox|undefined) {
		if(key==='baseURL') {
			if(typeof value=='string') {
				this.value[key]=value
			} else if(typeof value==='undefined') {
				this.value[key]=value
			} else {
				throw new Error("Invalid value for key "+key)
			}
		} else if(key==='disabled') {
			if(typeof value==='boolean') {
				this.value[key]=value
			} else if(typeof value==='undefined') {
				this.value[key]=value
			} else {
				throw new Error("Invalid value for key "+key)
			}
		} else if(key==='media') {
			if(typeof value==='object'&&value.instance_type==='MediaList') {
				this.value[key]=value.value
			} else if(typeof value==='string') {
				this.value[key]=value
			} else if(typeof value==='undefined') {
				this.value[key]=value
			} else {
				throw new Error("Invalid value for key "+key)
			}
		} else {
			throw new Error("Type shenanigans afoot (You passed a value that should be impossible at runtime)")
		}
	}
}
