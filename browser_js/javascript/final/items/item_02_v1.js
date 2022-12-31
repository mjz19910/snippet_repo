/* spell:words
--- version_list item 1 ---
v1 (cur): snippet_repo/javascript/final/items/item_02_v1.js
*/
class FakeJavascriptObject {
	/**
	 * @arg {RustFakeVM} vm
	 */
	constructor(vm) {
		this.vm=vm;
	}
	/**
	 * @arg {string} key
	 */
	get_field(key) {
		if(key==='[[Realm]]') {
			return this.vm.realm;
		}
		throw new Error("Bad field "+key);
	}
	/**
	 * @template T
	 * @arg {[T]} var_arg
	 */
	todo(...var_arg) {
		this.vm.todo(...var_arg);
	}
}
class RustIDBFactory extends FakeJavascriptObject {
	/**
	 * @arg {RustFakeVM} vm
	 */
	constructor(vm) {
		super(vm);
	}
	/**
	 * @arg {any} _name
	 * @arg {number} version
	 */
	open(_name,version) {
		if(version===0) {
			throw TypeError('The version provided must not be 0.');
		}
		let environment=this.get_field('[[Realm]]')?.get_field('[[HostDefined]]');
		this.todo(environment);
	}
}
class RustFakeHost {
	/**
	 * @arg {RustFakeVM} vm
	 */
	constructor(vm) {
		vm.set_host_intrinsic(this);
		this.indexedDB=new RustIDBFactory(vm);
	}
}
class HostObjectRc {
	/**
	 * @arg {any} _vm
	 * @arg {any} value
	 */
	constructor(_vm,value) {
		this.value=value;
	}
	/**
	 * @arg {(arg0: this) => void} callback
	 */
	use(callback) {
		callback(this);
	}
}
class RustBuilderTrait {
	/**
	 * @type {ExportItem[]}
	 */
	children=[];
	/**
	 * @arg {{children: never[]}[]} build_source
	 */
	build_from_vec(build_source) {
		for(let x of build_source) {
			for(let j of x.children) {
				this.children.push(j);
			}
		}
	}
	/**
	 * @arg {ExportItem} item
	 */
	build_from_item(item) {
		this.children.push(item);
	}
	build() {
		return {
			children: this.children
		};
	}
}
class RustRootBuilder extends RustBuilderTrait {
	constructor() {
		super();
		/**
		 * @type {any[]}
		 */
		this.children_crate_vec=[];
	}
	/** @arg {{ children: any[]; }} crate */
	add_crate_child(crate) {
		this.children_crate_vec.push(crate);
	}
	/**
	 * @override
	 */
	build() {
		this.build_from_vec(this.children_crate_vec);
		return super.build();
	}
}
class ExportItem {
	/**
	 * @arg {{ type: string; export_value: RustStdCrate; } | null} [item]
	 * @arg {string | null} [key]
	 */
	constructor(item=null,key=null) {
		this.item=item;
		this.key=key;
	}
}
class RustExportBuilder extends RustBuilderTrait {
	/** @arg {RustBuilderTrait} parent */
	constructor(parent) {
		super();
		/**@type {{}|null} */
		this.parent=parent;
		this.export_as_value=null;
		this.export_item=null;
	}
	/** @arg {string} export_as_define */
	export_as(export_as_define) {
		this.export_as_value=export_as_define;
		return this;
	}
	/** @arg {RustStdCrate} value */
	crate(value) {
		this.export_item={
			type: 'crate',
			export_value: value
		};
		return this;
	}
	/**
	 * @override
	 */
	build() {
		this.parent=null;
		this.build_from_item(new ExportItem(this.export_item,this.export_as_value));
		return super.build();
	}
}
class RustCrateBuilder extends RustBuilderTrait {
	/**
	 * @arg {RustBuilderTrait} for_target
	 */
	constructor(for_target) {
		super();
		this.for_target=for_target;
		/**
		 * @type {RustExportBuilder[]}
		 */
		this.crate_export_children_vec=[];
	}
	export_builder() {
		let crate_export_builder=new RustExportBuilder(this);
		this.crate_export_children_vec.push(crate_export_builder);
		return crate_export_builder;
	}
	/**
	 * @override
	 */
	build() {
		for(let x of this.crate_export_children_vec) {
			if(x instanceof RustExportBuilder) {
				if(x.export_item) {
					x.export_item.export_value.build_visit(x);
					this.build_from_item(new ExportItem(x.export_item,x.export_as_value,));
				}
				continue;
			}
			console.log('bad instance',x);
			throw Error('unhandled instance');
		}
		return super.build();
	}
}
class FakeRealm {
	//[[HostDefined]]
	fake_host_defined_data={};
	/**
	 * @arg {string} key
	 */
	get_field(key) {
		if(key==='[[HostDefined]]') {
			return this.fake_host_defined_data;
		}
		throw 1;
	}
}
class RustFakeVM {
	constructor() {
		this.intrinsic_data={
			/** @type {RustFakeHost|null} */
			host: null,
		};
		/**
		 * @type {{ children: any[]; } | null}
		 */
		this.active_root=null;
		this.realm=new FakeRealm;
	}
	/**
	 * @arg {RustBuilderTrait} for_target
	 */
	crate_builder(for_target) {
		return new RustCrateBuilder(for_target);
	}
	root_builder() {
		return new RustRootBuilder;
	}
	/**
	 * @arg {RustFakeHost} value
	 */
	set_host_intrinsic(value) {
		this.intrinsic_data.host=value;
	}
	/** @template T @arg {[T]} args */
	todo(...args) {
		console.log("todo-args",...args);
		console.log(new Error('todo'));
	}
}
class RustFakeBuildTarget extends RustBuilderTrait {
	/**
	 * @type {null|null[]}
	 */
	build_result_vec=[];
	/**
	 * @arg {any} _builder
	 */
	build_visit(_builder) {
		this.build_result_vec=null;
	}
}
class RustFakeCrate extends RustFakeBuildTarget {
	/** @arg {any} vm */
	constructor(vm) {
		super();
		this.vm=vm;
		this.define_data=new Map;
		/**
		 * @type {{ children: ExportItem[]; }[]}
		 */
		this.children_crate_vec=[];
	}
	/**
	 * @arg {string} define_key
	 * @arg {(value: any) => void} define_value
	 */
	add_function(define_key,define_value) {
		this.define_data.set(define_key,{
			type: 'function',
			value: define_value
		});
	}
	/**
	 * @arg {{ children: ExportItem[]; }} crate
	 */
	add_crate_child(crate) {
		this.children_crate_vec.push(crate);
	}
	/**
	 * @arg {any} builder
	 * @override
	 */
	build_visit(builder) {
		this.vm=null;
		super.build_visit(builder);
	}
}
class RustStdMemCrate extends RustFakeCrate {
	/**
	 * @this {RustStdMemCrate}
	 * @arg {any} value
	 */
	static intrinsic_drop_in_place(value) {
		this.vm.intrinsic_drop_in_place(value);
	}
	/**
	 * @arg {any} vm
	 */
	constructor(vm) {
		super(vm);
		this.add_function('drop_in_place',RustStdMemCrate.intrinsic_drop_in_place);
	}
}
class RustStdCrate extends RustFakeCrate {
	/**
	 * @arg {RustFakeVM} vm
	 */
	constructor(vm) {
		super(vm);
		let crate_builder=vm.crate_builder(this);
		crate_builder.export_builder().crate(new RustStdMemCrate(vm)).export_as('crate::mem').build();
		let std_mem_crate=crate_builder.build();
		this.add_crate_child(std_mem_crate);
	}
}
class RustFakeRoot extends RustFakeBuildTarget {
}
let rust_vm=new RustFakeVM;
let rust_host=new RustFakeHost(rust_vm);
let rust_root_builder=rust_vm.root_builder();
rust_vm.set_host_intrinsic(rust_host);
let std_crate_builder=rust_vm.crate_builder(rust_root_builder);
std_crate_builder.export_builder().crate(new RustStdCrate(rust_vm)).export_as('std').build();
let std_crate=std_crate_builder.build();
rust_root_builder.add_crate_child(std_crate);
rust_vm.active_root=rust_root_builder.build();
rust_vm;
