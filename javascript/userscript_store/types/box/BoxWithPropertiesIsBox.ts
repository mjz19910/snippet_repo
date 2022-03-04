import {BoxTemplate} from "./BoxTemplate";
import {BoxWithPropertiesObjType} from "./create_box";
export class BoxWithPropertiesIsBox extends BoxTemplate<'with_properties', {}> {
	readonly type = 'with_properties';
	properties: string[];
	constructor(value: BoxWithPropertiesObjType<BoxWithPropertiesIsBox['properties']>, properties: string[]) {
		super(value);
		this.properties = properties;
	}
	readonly m_verify_name="BoxWithPropertiesIsBox";
	verify_name(name:"BoxWithPropertiesIsBox") {
		if(this.m_verify_name !== 'BoxWithPropertiesIsBox' || name !== 'BoxWithPropertiesIsBox'){
			throw new Error("Bad box");
		}
	}
}
