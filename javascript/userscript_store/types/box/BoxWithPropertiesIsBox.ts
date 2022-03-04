import {BoxWithPropertiesObjType} from "./create_box";
export class BoxWithPropertiesIsBox {
	readonly type = 'with_properties';
	value: {};
	properties: string[];
	constructor(value: BoxWithPropertiesObjType<BoxWithPropertiesIsBox['properties']>, properties: string[]) {
		this.value = value;
		this.properties = properties;
	}
}
