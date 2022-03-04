import {BoxTemplate} from "./BoxTemplate";
import {BoxVerify} from "./BoxVerify";
export class VoidBox implements BoxTemplate<"void", void>, BoxVerify<VoidBox, "VoidBox"> {
	readonly type = "void";
	readonly extension = null;
	readonly m_verify_name = "VoidBox";
	value = void 0;
	verify_name(name: "VoidBox"): void {
		if(name !== "VoidBox") {
			throw new Error("Bad box");
		}
	}
	as_type(_x: 'function' | 'object') {
		return null;
	}
}

