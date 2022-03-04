import {BoxTemplate} from "./BoxTemplate";
import {BoxVerify} from "./BoxVerify";
export class VoidBox
implements BoxTemplate<"void", void>, BoxVerify<VoidBox, "VoidBox"> {
	readonly type = "void";
	readonly extension = null;
	readonly m_verify_name = "VoidBox";
	readonly value = void 0;
	verify_name(name: "VoidBox") {
		return this.m_verify_name === "VoidBox" && name === "VoidBox";
	}
	as_type(_x: 'function' | 'object') {
		return null;
	}
}

