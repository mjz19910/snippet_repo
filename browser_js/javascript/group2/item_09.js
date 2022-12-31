class RustTypeTheory {
	/** @type {{type: any;description?: any}[]} */
	types=[];
	/** @type {{}[]} */
	axioms=[];
	/** @arg {{}} value */
	addAxiom(value) {
		this.axioms.push(value);
	}
	/** @arg {{type: any;description?: any}} value */
	addType(value) {
		// @ts-ignore
		let found_index=this.types.findIndex(e => e.type===value.type);
		if(found_index>-1) {
			Object.assign(value,this.types[found_index]);
			this.types[found_index]=value;
		} else {
			this.types.push(value);
		}
	}
	/** @arg {string} type_name @arg {RustTypeDescription|NatNum} description */
	addTypeDescription(type_name,description) {
		description.construct();
		this.addType({
			type: type_name,
			description
		});
	}
	/** @arg {{}} value */
	prove(value) {
		console.error("TODO: implement prove",value);
	}
}
class RustSetTheory {
}
class RustLogic {
}
class RustTypeInterface {
	/** @arg {string} target */
	constructor(target) {
		this.target=target;
		/** @type {{}[]} */
		this.values=[];
	}
	/** @arg {string} str_0 @arg {{}} value */
	defineType(str_0,value) {
		this.values.push([str_0,value]);
	}
}
let tt_info=new RustTypeTheory;
tt_info.addType({
	type: "Int"
});
tt_info.addType({
	type: "String"
});
tt_info.addType({
	type: "Bool"
});
tt_info.addType({
	type: "Nat"
});
class RustTypeDescription {
	construct() {
		throw new Error("Method not implemented.");
	}
	/** @readonly */
	_type="Type";
	type="";
	interface=new RustTypeInterface("");
	/** @type {{}[]} */
	options=[];
	/** @type {{}[]} */
	values=[];
	defineType() {
		console.log("defineType on base");
	}
	/** @arg {string} type_name @arg {{}} type_value */
	defineType_2(type_name,type_value) {
		this.values.push([type_name,type_value]);
	}
}
tt_info.addTypeDescription("Bool",{
	_type: "Type",
	type: "Bool",
	interface: new RustTypeInterface("Bool"),
	options: [],
	values: [],
	defineType() {
		this.interface.defineType("true",this.type);
	},
	defineType_2(type_name,type_value) {
		this.interface.defineType(type_name,type_value);
	},
	construct() {
		this.defineType_2("true","Bool");
		this.defineType_2("true","False");
	}
});
class NatNum {
	/** @readonly */
	_type="Nat";
	description=`
	0 : Nat
	^ : Nat -> Nat
	`;
	/** @arg {NatNum} nat_val */
	predecessor(nat_val) {
		return new NatNum(nat_val.value-1);
	}
	/** @arg {NatNum} nat_val */
	successor(nat_val) {
		return new NatNum(nat_val.value+1);
	}
	construct() {}
	/** @type {SumMonad} */
	monad;
	/** @arg {number} value */
	constructor(value) {
		this.value=value;
		this.monad=new SumMonad(this);
	}
}
class SumMonad {
	/** @arg {NatNum} parent */
	constructor(parent) {
		this.parent=parent;
	}
	/**@readonly*/_type="Monad";
	/**@readonly*/type="Sum";
	sum_count=0;
	/** @arg {NatNum} nat_a @arg {NatNum} nat_b @returns {NatNum} */
	sum(nat_a,nat_b) {
		let t=this;
		t.sum_count++;
		if(nat_a.value==0) {
			return nat_b;
		}
		let next_a=this.parent.predecessor(nat_a);
		return next_a.monad.sum(nat_b,new NatNum(0));
	}
	sum_tt=`
	sum(0, b) -> b
	sum(^a', b) -> ^sum(a', b)
	`;
}
const nat_num_ops={
	/** @type {(...x:{value:number}[])=>{value:number}} */
	S(nat_val_m,nat_val_n) {
		if(nat_val_n==null) {
			return nat_val_m;
		}
		if(nat_val_m.value==0) {
			return nat_val_m;
		}
		if(nat_val_n.value==0) {
			return {
				value: nat_val_m.value+1
			};
		}
		return this.S(nat_val_m,nat_val_n);
	}
};
tt_info.addTypeDescription("Nat",new NatNum(0));
/** @arg {{type: string;description?:string}[]} types */
function types_to_map(types) {
	return new Map(types.map(e => {
		return e.description? [e.type,e.description]:[e.type,{}];
	}
	));
}
let nat_type_def=types_to_map(tt_info.types).get("Nat");

// ioctl(0, _IOC(_IOC_WRITE, 0x54, 0x31, 0x4), 0x7ffda934ae4c)
// ioctl(0, _IOC(_IOC_READ,  0x54, 0x30, 0x4), 0x7ffda934ae4c)
