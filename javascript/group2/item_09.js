class RustTypeTheory {
	types=[]
	addAxiom(value) {
		this.axioms.push(value)
	}
	addType(value) {
		let found_index=this.types.findIndex(e => e.type===value.type)
		if(found_index>-1) {
			Object.assign(value,this.types[found_index])
			this.types[found_index]=value
		} else {
			this.types.push(value)
		}
	}
	addTypeDescription(type_name,description) {
		description.construct()
		this.addType({
			type: type_name,
			description
		})
	}
	prove(value) {
		console.error("TODO: implement prove")
	}
}
class RustSetTheory {
}
class RustLogic {
}
class RustTypeInterface {
	defineType() {//TODO
	}
}
let tt_info=new RustTypeTheory
tt_info.addType({
	type: "Int"
})
tt_info.addType({
	type: "String"
})
tt_info.addType({
	type: "Bool"
})
tt_info.addType({
	type: "Nat"
})
tt_info.addTypeDescription("Bool",{
	type: "Bool",
	interface: new RustTypeInterface("Bool"),
	options: [],
	defineType(type_description) {
		this.interface.defineType("true",this.type)
	},
	construct() {
		this.defineType("true","Bool")
		this.defineType("true","False")
	}
})
tt_info.addTypeDescription("Nat",{
	description: `
	0 : Nat
	^ : Nat -> Nat
	`,
	ops: {
		S(nat_val_m,nat_val_n) {
			if(nat_val_n==null) {
				return nat_val_m
			}
			if(nat_val_m.value==0) {
				return nat_val_m
			}
			if(nat_val_n.value==0) {
				return {
					value: nat_val_m.value+1
				}
			}
			return this.S(nat_val_m,nat_val_n)
		}
	},
	predecessor(nat_val) {
		//TODO: sub does not exist at this level,
		//this would be a recursive definition(sub defined with Nat and Nat)
		return {
			value: nat_val.value-1
		}
	},
	successor(nat_val) {
		return {
			value: nat_val.value+1
		}
	},
	construct() {
		let t_construct=this
		this.functions={
			sum_count: 0,
			sum(nat_a,nat_b) {
				let t=this
				t.sum_count++
				if(nat_a.value==0) {
					return nat_b
				}
				let next_a=t_construct.predecessor(nat_a)
				let d_step=(nat_sum_res) => {
					t.sum_count++
					return t_construct.successor(nat_sum_res)
				}
				function n_step() {
					t.sum_count++
					let nat_sum_res=t.sum(next_a,nat_b)
					if(typeof nat_sum_res=='function') {
						return () => {
							t.sum_count++
							let acc_val=nat_sum_res()
							function n_step_1() {
								t.sum_count++
								if(typeof acc_val=='function') {
									return () => {
										t.sum_count++
										acc_val=acc_val()
										return n_step_1
									}
								}
								return d_step(acc_val)
							}
							return n_step_1
						}
					}
					return d_step(nat_sum_res)
				}
				return n_step
			},
			sum_tt: `
			sum(0, b) -> b
			sum(^a', b) -> ^sum(a', b)
			`
		}
	}
})
function types_to_map(types) {
	return new Map(types.map(e => {
		return e.description? [e.type,e.description]:[e.type,{}]
	}
	))
}
let nat_type_def=types_to_map(tt_info.types).get("Nat")

// ioctl(0, _IOC(_IOC_WRITE, 0x54, 0x31, 0x4), 0x7ffda934ae4c)
// ioctl(0, _IOC(_IOC_READ,  0x54, 0x30, 0x4), 0x7ffda934ae4c)
