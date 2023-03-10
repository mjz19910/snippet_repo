import {BoxTemplate} from "./BoxTemplate.js";
import {BoxWithPropertiesObjType} from "./BoxWithPropertiesObjType.js";
import {MakeRequirements} from "./MakeRequirements.js";
class TemplateDescription<T extends string,U extends string> {
	_template_description: `${T}<${U}>`;
	template_args: [U];
	template_type_name: T;
	constructor(dest: T,arg_0: U) {
		this.template_type_name=dest;
		this.template_args=[arg_0];
		this._template_description=`${dest}<${arg_0}>`;
	}
	toString() {
		return `TYPE::${this._template_description}`;
	}
}
export class ObjectBox_WithPropertyList extends BoxTemplate<"object",{}> {
	readonly type="object";
	readonly requires=new MakeRequirements("property_is_box").result;
	readonly types: {readonly list: TemplateDescription<"Array","string">;}={list: new TemplateDescription("Array","string")};
	constructor(value: BoxWithPropertiesObjType<ObjectBox_WithPropertyList["list"]>,public readonly list: readonly string[]) {
		super(value);
	}
}
