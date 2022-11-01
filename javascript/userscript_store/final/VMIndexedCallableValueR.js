import {BaseBox} from "./BaseBox";

export class VMIndexedCallableValueR extends BaseBox {
	/**@type {"object_box"} */
	type="object_box";
	/**@type {'function'} */
	extension='function';
	/**@type {"callable_box"} */
	index_type="callable_box";
}
