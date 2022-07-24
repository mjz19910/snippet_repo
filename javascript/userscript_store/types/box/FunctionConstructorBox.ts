import {Box} from "./Box";
import {FunctionBox} from "./FunctionBox";
import {BoxMaker} from "./BoxMaker";
import {FunctionConstructorFactory} from "./FunctionConstructorFactory";
import {BoxTemplate} from "./BoxTemplate";
import {BoxVerify} from "./BoxVerify";
export class FunctionConstructorBox
	extends BoxTemplate<"constructor_box", typeof Function>
	implements BoxVerify<FunctionConstructorBox, "FunctionConstructorBox"> {
	readonly type = "constructor_box";
	readonly instance_type = "Function";
	readonly arguments = "string[]";
	readonly return = "box";
	readonly instance_factory: FunctionConstructorFactory;
	readonly constructor_value: typeof Function;
	readonly box_maker: BoxMaker<string, FunctionBox>;
	readonly m_verify_name = "FunctionConstructorBox"
	verify_name(name: "FunctionConstructorBox") {
		return this.m_verify_name === 'FunctionConstructorBox' && name === 'FunctionConstructorBox';
	}
	constructor(
		constructor_value: typeof Function,
		instance_factory: FunctionConstructorFactory,
		box_maker: BoxMaker<string, FunctionBox>
	) {
		super(constructor_value);
		this.constructor_value = constructor_value;
		this.instance_factory = instance_factory;
		this.box_maker = box_maker;
	}
	verify_arguments(...boxes: Box[]) {
		if (boxes.length === 0) {
			return true;
		}
		for (let i = 0; i < boxes.length; i++) {
			let cur_box = boxes[i];
			if (typeof cur_box !== 'string')
				return false;
		}
		return true;
	}
}
