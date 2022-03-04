import {Box} from "./Box";
import {FunctionBox} from "./FunctionBox";
import {BoxMaker} from "./BoxMaker";
import {FunctionConstructorFactory} from "./FunctionConstructorFactory";
import {BoxTemplate} from "./BoxTemplate";


export class FunctionConstructorBox extends BoxTemplate<"constructor_box", typeof Function> {
	readonly type = "constructor_box";
	readonly arguments = "string[]";
	readonly return = "box";
	instance_factory: FunctionConstructorFactory;
	constructor_value: typeof Function;
	box_maker: BoxMaker<string, FunctionBox>;
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
		if(boxes.length === 0) {
			return true;
		}
		for(let i = 0;i < boxes.length;i++) {
			let cur_box = boxes[i];
			if(typeof cur_box !== 'string')
				return false;
		}
		return true;
	}
	readonly m_verify_name="FunctionConstructorBox"
	verify_name(name: "FunctionConstructorBox") {
		if(name !== 'FunctionConstructorBox'){
			throw new Error("bad box");
		}
	}
}
