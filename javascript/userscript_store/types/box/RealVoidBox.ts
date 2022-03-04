import {BoxVerify} from "./BoxVerify";

export class RealVoidBox implements BoxVerify<RealVoidBox, "RealVoidBox"> {
	readonly type = "real_void";
	value: void = void 0;
	m_verify_name: "RealVoidBox"="RealVoidBox";
	verify_name(name: "RealVoidBox") {
		return this.m_verify_name === "RealVoidBox" && name === "RealVoidBox";
	}
	as_type(_x: 'function' | 'object') {
		return null;
	}
}
