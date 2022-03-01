import NewableFactory from "../NewableFunction";
import {Box} from "./Box";
import BoxTemplate from "./BoxTemplate";
import ObjectBox from "./ObjectBox";

export default class NewableFunctionBox extends BoxTemplate<NewableFactory<{}>> {
	type: "constructor_box" = "constructor_box";
	class_value:{new (...a:Box[]):{}};
	instance_type=null;
	arguments: "box[]"="box[]";
	return:"box"="box";
	constructor(class_value: {new (...a:Box[]):{}}, factory_value: NewableFactory<{}>){
		super(factory_value);
		this.class_value=class_value;
	}
	as_type(x:string) {
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
