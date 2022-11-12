import {Box} from "./Box.js"
import {FunctionBox} from "./FunctionBox.js"
import {BoxMaker} from "./BoxMaker.js"
import {FunctionConstructorFactory} from "./FunctionConstructorFactory.js"
import {BoxVerify} from "./BoxVerify.js"
import {AnyTypeOfResult} from "./template/AnyTypeOfResult.js"

export class FunctionConstructorBox implements BoxVerify<FunctionConstructorBox,"FunctionConstructorBox">
{
	readonly type="constructor_box"
	readonly instance_type="Function"
	readonly arguments="string[]"
	readonly return="box"
	readonly instance_factory: FunctionConstructorFactory
	readonly value: typeof Function
	readonly box_maker: BoxMaker<string,FunctionBox>
	readonly m_verify_name="FunctionConstructorBox"
	as_type(input_typeof: AnyTypeOfResult): this|null {
		return typeof this.value===input_typeof? this:null
	}
	verify_name(name: "FunctionConstructorBox") {
		return this.m_verify_name==='FunctionConstructorBox'&&name==='FunctionConstructorBox'
	}
	constructor(
		value: typeof Function,
		instance_factory: FunctionConstructorFactory,
		box_maker: BoxMaker<string,FunctionBox>
	) {
		this.value=value
		this.instance_factory=instance_factory
		this.box_maker=box_maker
	}
	verify_arguments(...boxes: Box[]) {
		if(boxes.length===0) {
			return true
		}
		for(let i=0;i<boxes.length;i++) {
			let cur_box=boxes[i]
			if(typeof cur_box!=='string')
				return false
		}
		return true
	}
}
