import {BoxTemplate} from "./template/BoxTemplate"
import {BoxVerify} from "./BoxVerify"
import {BoxWithPropertiesObjType} from "./BoxWithPropertiesObjType"

export class BoxWithPropertiesIsBox
	extends BoxTemplate<'with_properties',{}>
	implements BoxVerify<BoxWithPropertiesIsBox,"BoxWithPropertiesIsBox">
{
	readonly type='with_properties'
	readonly properties
	constructor(value: BoxWithPropertiesObjType<BoxWithPropertiesIsBox['properties']>,properties: string[]) {
		super(value)
		this.properties=properties
	}
	readonly m_verify_name="BoxWithPropertiesIsBox"
	verify_name(name: "BoxWithPropertiesIsBox") {
		return this.m_verify_name==='BoxWithPropertiesIsBox'&&name==='BoxWithPropertiesIsBox'
	}
}
