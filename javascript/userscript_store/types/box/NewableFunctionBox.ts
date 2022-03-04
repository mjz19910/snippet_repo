import NewableFactoryToBox from "./NewableFactory";
import {Box} from "./Box";
import BoxTemplate from "./BoxTemplate";
import ObjectBox from "./ObjectBox";
import FunctionBox from "./FunctionBox";

type FunctionInstance=(...a:Box[])=>Box;

type FunctionConstructorFactory=(box_value: new (...a: Box[])=>FunctionInstance)=>FunctionBox;

export class FunctionConstructorBox extends BoxTemplate<"constructor_box", FunctionConstructorFactory> {
	readonly type: "constructor_box" = "constructor_box";
	constructor_value:(...a:string[])=>Box;
	constructor(
		constructor_value:(...a:string[])=>Box,
		instance_factory:FunctionConstructorFactory
	) {
		super(instance_factory);
		this.constructor_value=constructor_value;
	}
}

export class NewableFunctionBox extends BoxTemplate<"constructor_box", NewableFactoryToBox<{}>> {
	readonly type: "constructor_box" = "constructor_box";
	class_value:{new (...a:Box[]):{}};
	readonly instance_type=null;
	readonly arguments: "box[]"="box[]";
	readonly return:"box"="box";
	constructor(class_value: new (...a:Box[])=>{}, factory_value: NewableFactoryToBox<{}>){
		super(factory_value);
		this.class_value=class_value;
	}
	as_type(x:'function'|'object') {
		if(typeof this.value === x){
			return this;
		}
		return null;
	}
	factory(...args: Box[]) {
		let res=new this.class_value(...args);
		return new ObjectBox(res);
	}
}
export default NewableFunctionBox;