import {Box} from "./box/Box.js";
import {FunctionBox} from "../zz_broken/FunctionBox.js";
import {BoxMaker} from "../../BoxMaker.js";
import {FunctionConstructorFactory} from "../interface/FunctionConstructorFactory.js";
import {BoxTemplate} from "../template/BoxTemplate.js";

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
