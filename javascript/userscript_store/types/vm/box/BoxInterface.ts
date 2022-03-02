import {AnyTypeOfResult} from "./BoxTemplate";

export default interface BoxInterface {
	type:string;
	as_type(x: AnyTypeOfResult): this | null;
}
