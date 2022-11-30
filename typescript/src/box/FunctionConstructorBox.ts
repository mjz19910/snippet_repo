import {Box} from "./Box.js";
import {FunctionBox} from "./FunctionBox.js";
import {BoxMaker} from "./BoxMaker.js";
import {FunctionConstructorFactory} from "./FunctionConstructorFactory.js";

export class FunctionConstructorBox {
	readonly type="FunctionConstructorBox";
	readonly instance_type="Function";
	readonly arguments="string[]";
	readonly return="box";
	readonly instance_factory: FunctionConstructorFactory;
	readonly value: typeof Function;
	readonly box_maker: BoxMaker<string,FunctionBox>;
	constructor(
		value: typeof Function,
		instance_factory: FunctionConstructorFactory,
		box_maker: BoxMaker<string,FunctionBox>
	) {
		this.value=value;
		this.instance_factory=instance_factory;
		this.box_maker=box_maker;
	}
	verify_arguments(...boxes: Box[]) {
		if(boxes.length===0) {
			return true;
		}
		if(boxes.length===1&&boxes[0].type==="string") {
			return true;
		}
		return false;
	}
}
