import BoxInterface from "./BoxInterface";
import {RealVoidBox} from "./RealVoidBox";
export class VoidBox implements BoxInterface {
	readonly type = "void";
	readonly extension=null;
	value = null;
	as_type(_x: 'function' | 'object') {
		return null;
	}
}
export type IVoidBox = RealVoidBox|VoidBox;
export default VoidBox;
