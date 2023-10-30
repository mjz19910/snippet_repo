import {Box} from "./Box.ts";
import {FunctionBox} from "./FunctionBox.ts";
import {BoxMaker} from "../support.mod/BoxMaker.ts";
import {FunctionConstructorFactory} from "../interface/FunctionConstructorFactory.ts";
import {BoxTemplate} from "../template/BoxTemplate.ts";

export class FunctionConstructorBox extends BoxTemplate<"constructor_box",FunctionConstructor> {
	readonly type="constructor_box";
	readonly instance_type="Function";
	readonly arguments="string[]";
	readonly return="box";
	instance_factory: FunctionConstructorFactory;
	box_maker: BoxMaker<string,FunctionBox>;
	constructor(
		value: FunctionConstructor,
		instance_factory: FunctionConstructorFactory,
		box_maker: BoxMaker<string,FunctionBox>
	) {
		super(value);
		this.instance_factory=instance_factory;
		this.box_maker=box_maker;
	}
	verify_arguments(...boxes: Box[]) {
		if(boxes.length===0) {return true;}
		return boxes.every(e=>e.type==="string");
	}
}
