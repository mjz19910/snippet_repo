class FakeJavascriptObject {
	constructor(vm) {
		this.vm = vm;
	}
	get_field(key) {
		if (key === '[[Realm]]') {
			return this.vm.realm;
		}
	}
	todo(...var_arg) {
		this.vm.todo(...var_arg);
	}
}
class RustIDBFactory extends FakeJavascriptObject {
	constructor(vm) {
		super(vm);
	}
	open(_name, version) {
		if (version === 0) {
			throw TypeError('The version provided must not be 0.');
		}
		let environment = this.get_field('[[Realm]]').get_field('[[HostDefined]]');
		this.todo(environment);
	}
}
class RustFakeHost {
	constructor(vm) {
		vm.set_host_intrinsic(this);
		this.indexedDB = new RustIDBFactory(vm);
	}
}
class HostObjectRc {
	constructor(_vm, value) {
		this.value = value;
	}
	use(callback) {
		callback(this);
	}
}
class RustBuilderTrait {
	children = [];
	build_from_vec(build_source) {
		for (let x of build_source) {
			for (let j of x.children) {
				this.children.push(j);
			}
		}
	}
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
		this.children_crate_vec = [];
	}
	add_crate_child(crate) {
		this.children_crate_vec.push(crate);
	}
	build() {
		this.build_from_vec(this.children_crate_vec);
		return super.build();
	}
}
class RustExportBuilder extends RustBuilderTrait {
	constructor(parent) {
		super();
		this.parent = parent;
		this.export_as_value = null;
		this.export_item = null;
	}
	export_as(export_as_define) {
		this.export_as_value = export_as_define;
		return this;
	}
	crate(value) {
		this.export_item = {
			type: 'crate',
			export_value: value
		}
		return this;
	}
	build() {
		this.parent = null;
		this.build_from_item({
			...this.export_item,
			export_key: this.export_as_value
		});
		return super.build();
	}
}
class RustCrateBuilder extends RustBuilderTrait {
	constructor(for_target) {
		super();
		this.for_target = for_target;
		this.crate_export_children_vec = [];
	}
	export_builder() {
		let crate_export_builder = new RustExportBuilder(this);
		this.crate_export_children_vec.push(crate_export_builder);
		return crate_export_builder;
	}
	build() {
		for (let x of this.crate_export_children_vec) {
			if (x instanceof RustExportBuilder) {
				x.export_item.export_value.build_visit(x);
				this.build_from_item({
					...x.export_item,
					export_key: x.export_as_value
				});
				continue;
			}
			console.log('bad instance', x);
			throw Error('unhandled instance');
		}
		return super.build();
	}
}
class FakeRealm {
	//[[HostDefined]]
	fake_host_defined_data = {}
	get_field(key) {
		if (key === '[[HostDefined]]') {
			return this.fake_host_defined_data;
		}
	}
}
class RustFakeVM {
	constructor() {
		this.intrinsic_data = {};
		this.active_root = null;
		this.realm = new FakeRealm;
	}
	crate_builder(for_target) {
		return new RustCrateBuilder(for_target);
	}
	root_builder() {
		return new RustRootBuilder;
	}
	set_host_intrinsic(value) {
		this.intrinsic_data.host = value;
	}
	todo() {
		console.log(new Error('todo'));
	}
}
class RustFakeBuildTarget {
	build_result_vec = [];
	build_visit(_builder) {
		this.build_result_vec = null;
	}
}
class RustFakeCrate extends RustFakeBuildTarget {
	constructor(vm) {
		super();
		this.vm = vm;
		this.define_data = new Map;
		this.children_crate_vec = [];
	}
	add_function(define_key, define_value) {
		this.define_data.set(define_key, {
			type: 'function',
			value: define_value
		});
	}
	add_crate_child(crate) {
		this.children_crate_vec.push(crate);
	}
	build_visit(builder) {
		this.vm = null;
		super.build_visit(builder);
	}
}
class RustStdMemCrate extends RustFakeCrate {
	static intrinsic_drop_in_place(value) {
		this.vm.intrinsic_drop_in_place(value);
	}
	constructor(vm) {
		super(vm);
		this.add_function('drop_in_place', RustStdMemCrate.intrinsic_drop_in_place)
	}
}
class RustStdCrate extends RustFakeCrate {
	constructor(vm) {
		super(vm);
		let crate_builder = vm.crate_builder(this);
		crate_builder.export_builder().crate(new RustStdMemCrate(vm)).export_as('crate::mem').build();
		let std_mem_crate = crate_builder.build();
		this.add_crate_child(std_mem_crate);
	}
}
class RustFakeRoot extends RustFakeBuildTarget {
}
let rust_vm = new RustFakeVM;
let rust_host = new RustFakeHost(rust_vm);
let rust_root_builder = rust_vm.root_builder();
rust_vm.set_host_intrinsic(rust_host);
let std_crate_builder = rust_vm.crate_builder(rust_root_builder);
std_crate_builder.export_builder().crate(new RustStdCrate(rust_vm)).export_as('std').build();
let std_crate = std_crate_builder.build();
rust_root_builder.add_crate_child(std_crate);
rust_vm.active_root = rust_root_builder.build();
rust_vm;
