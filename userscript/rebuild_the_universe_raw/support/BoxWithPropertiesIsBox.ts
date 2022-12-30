import {BoxTemplate} from "./BoxTemplate.js";
import {BoxWithPropertiesObjType} from "./BoxWithPropertiesObjType.js";

export class BoxWithPropertiesIsBox extends BoxTemplate<"with_properties",{}> {
	readonly type="with_properties";
	readonly properties;
	constructor(value: BoxWithPropertiesObjType<BoxWithPropertiesIsBox["properties"]>,properties: string[]) {
		super(value);
		this.properties=properties;
	}
}
