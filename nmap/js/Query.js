import {DNSClassEnum} from "./DNSClassEnum.js";
import {DNSTypeEnum} from "./DNSTypeEnum.js";
import {IP_base} from "./IP_base.js";

export class Query {
	constructor(/** @type {any} */ query_class, /** @type {any} */ query_type) {
		switch(query_class) {
			case DNSClassEnum.IN: break;
			default: throw new Error("Bad");
		}
		switch(query_type) {
			case DNSTypeEnum.A: {
				/** @type {["DNS"]} */
				let val = ["DNS"];
				return val;
			}
		}
		return ["DNS"];
	}
	/** @type {import("./types/mod.js").DNS_IN_A} */
	static A(arg0, arg1, query_class, query_type, arg4) {
		/** @type {(v:any)=>v is ['IP', string]} */
		function get_ip_type(v) {
			return v[0] === 'IP';
		}
		if(get_ip_type(arg4)) {
			return ["DNS", ['hostname', arg0], arg1, query_class, query_type, [arg4]];
		}
		return ["DNS", ['hostname', arg0], arg1, query_class, query_type, arg4];
	}
	/** @arg {import("./types/mod.js").DNS_IN_A_Type} value */
	static stringify(value, short = false) {
		switch(value[this.A_ValueEnum.RecordType]){
			case DNSTypeEnum.A:{
				const Enum = this.A_ValueEnum;
				const Hostname = value[Enum.Hostname];
				const TTL = value[Enum.TTL];
				const Class = value[Enum.Class];
				const Type = value[Enum.RecordType];
				const IPArray=value[Enum.ReplyArray];
				let IPCode=IPArray.map(e=>IP_base.stringify_raw(e));
				return `Query.A(${JSON.stringify(Hostname[1])}, ${TTL}, ${DNSClassEnum.stringify(Class, short)}, ${DNSTypeEnum.stringify(Type, short)}, [${IPCode}])`;
			}
		}
	}
	/** @type {import("./types/mod.js").DNS_IN_PTR} */
	static PTR(arg0, arg1, query_class, query_type, arg4) {
		return ["DNS", ['hostname', arg0], arg1, query_class, query_type, arg4];
	}
	/** @readonly */
	static A_ValueEnum = {
		/** @type {'Type'}*/0:"Type",
		/** @type {0}*/"Type":0,
		/** @type {'Hostname'}*/1:'Hostname',
		/** @type {1}*/'Hostname':1,
		/** @type {'TTL'}*/2:'TTL',
		/** @type {2}*/TTL:2,
		/** @type {'Class'}*/3:'Class',
		/** @type {3}*/Class:3,
		/** @type {'RecordType'}*/4:'RecordType',
		/** @type {4}*/RecordType:4,
		/** @type {'ReplyArray'}*/5:'ReplyArray',
		/** @type {5}*/'ReplyArray':5,
	}
}
