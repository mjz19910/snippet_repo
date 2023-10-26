import {BoxTemplate} from "./template/BoxTemplate.ts";
import {BoxWithPropertiesObjType} from "./BoxWithPropertiesObjType.ts";

export class BoxWithPropertiesIsBox extends BoxTemplate<'with_properties',{}> {
	readonly type='with_properties';
	readonly properties;
	constructor(value: BoxWithPropertiesObjType<BoxWithPropertiesIsBox['properties']>,properties: string[]) {
		super(value);
		this.properties=properties;
	}
}
