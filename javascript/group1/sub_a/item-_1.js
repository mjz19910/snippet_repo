/* spell:words myhtml_tokenizer deref polymorphed deinit Copypasta
--- version_list item 1 ---
v1 (old-o): snippet_repo_v2/javascript/final/myhtml_tokenizer.js
v2 (cur-c): snippet_repo_v2/javascript/snippet/group1/sub_a/item-_1.js
*/
function raw_template(v) {
	return v.raw[0];
}
class DirBuilder {
	constructor(cur) {
		this.cur = cur;
	}
	cd(target) {
		if (target.slice(0, 3) == "../") {
			this.cur = this.cur.parent;
			this.cd(target.slice(3));
		}
		let cd_next = target.split("/", 1);
		console.log(cd_next);
	}
}
class FSDirEntry {
	constructor(name, value) {
		this.name = name;
		this.value = value;
	}
}
class FSFile {
	constructor(file_data) {
		if (file_data) {
			this.file_data = file_data;
			this.content_length = file_data.length;
		} else {
			this.file_data = "";
			this.content_length = 0;
		}
	}
	set_content(content) {
		this.file_data = content.length;
		this.content_length = content.length;
	}
}
class FSDir {
	constructor(parent) {
		if (parent !== null) {
			this.m_parent = new WeakRef(parent);
		}
		this.m_parent = parent;
		this.m_children = [];
	}
	add_file(file_name) {
		let new_file = new FSFile;
		this.m_children.push(new FSDirEntry(file_name,new_file));
		return new_file;
	}
	add_dir(dir_name) {
		let new_dir = new FSDir(this);
		this.m_children.push(new FSDirEntry(dir_name,new_dir));
		return new_dir;
	}
	get parent() {
		return this.m_parent;
	}
}
class Win32FSDir extends FSDir {
	constructor() {
		super(null);
		this.drive = null;
		this.base = "/";
		this.m_object_parent = null;
	}
	init(init_args) {
		this.drive = init_args.drive;
		this.base = init_args.base;
		this.m_object_parent = init_args.object_parent;
	}
	get parent() {
		if (this.base == "/") {
			return null;
		}
		if (!this.m_parent || !this.m_parent.deref()) {
			let path = this.base.split("/");
			let up_dir_name = path.pop();
			let up_base;
			if (path.length > 1) {
				up_base = path.join("/");
			} else {
				up_base = path[0] + "/";
			}
			console.log(up_base);
			let up_dir = new Win32FSDir;
			up_dir.init({
				drive: this.drive,
				base: up_base,
				object_parent: this.m_object_parent
			});
			up_dir.m_children.push(new FSDirEntry(up_dir_name,this));
			b: if (this.m_object_parent) {
				let ref = this.m_object_parent.deref();
				if (!ref)
					break b;
				ref.fs_root = up_dir;
				this.m_object_parent = null;
			}
			this.m_parent = new WeakRef(up_dir);
		}
		return this.m_parent.deref();
	}
}
class _SimplePackageModule {
	constructor() {
		this.fs_root = new Win32FSDir;
		this.fs_root.init({
			drive: "C",
			base: "/jai/modules/Simple_Package",
			object_parent: new WeakRef(this),
		});
		this.current_dir = this.fs_root;
		this.content_map = new Map;
		let dir_builder = new DirBuilder(this.fs_root);
		dir_builder.cur.add_dir("examples");
	}
	add_module_jai(module_file_name, module_file_content, module_obj) {
		let mod_file = this.current_dir.add_file(module_file_name);
		mod_file.set_content(module_file_content);
		if (this.content_map.has(module_file_name)) {
			throw new Error("duplicate module.jai");
		}
		this.content_map.set(module_file_name, module_obj);
	}
}
const ExecuteArrayTag = Symbol("ExecuteArray");
let AK;
AK = (function() {
	const ErrorTag = Symbol("Error");
	class AK_Error {
		constructor(err) {
			this.error = err;
		}
	}
	class AK_ErrorOr {
		constructor(tag_or_value, ...value_or_error_rest) {
			if (tag_or_value === ErrorTag) {
				let[error,...rest_args] = value_or_error_rest;
				if (rest_args.length > 0) {
					throw new Error("too many arguments");
				}
				this.m_index = 1;
				this.m_data = new AK.Error(error);
				return;
			}
			this.m_index = 0;
			this.m_data = tag_or_value;
		}
	}
	return {
		impl: {
			ErrorTag
		},
		Error: AK_Error,
		ErrorOr: AK_ErrorOr,
	};
}
)();
class JaiExecuteCall {
	constructor(jai, function_name, function_args) {
		let function_def = jai.get_function_def(function_name);
		let function_call_types = jai.get_type_for_args(function_args);
		let instantiated_fn = jai.getInstantiation(function_def, function_call_types);
		if (instantiated_fn) {
			this.result = instantiated_fn.execute_call(function_args);
			return;
		}
		let res = jai.polymorph_function(function_def, function_args, function_call_types);
		if (res.is_error()) {
			this.result = res;
			return;
		}
		res = res.release_value();
		if (res.has_value()) {
			let polymorphed_fn = res.value();
			this.result = polymorphed_fn.execute_call(function_args);
		} else {
			console.log("polymorph failure", function_call_types);
			this.result = new AK.ErrorOr(AK.impl.ErrorTag,new Error("polymorph failed for \"" + function_name + "\""));
		}
	}
}
let Simple_Package = new _SimplePackageModule;
class NullValueHolder {
	constructor(value) {
		this.value = value;
	}
}
class NullEntryHolder {
	constructor(name, value) {
		this.name = name;
		this.value = value;
	}
}
class JaiStructMember extends NullValueHolder {
}
class JaiStructMemberEntry extends NullEntryHolder {
}
class JaiStruct {
	constructor() {
		this.layout = [];
		this.name_map = [];
	}
	static from_builder_entries(entries) {
		let new_struct = new this;
		for (let i = 0; i < entries.length; i++) {
			let ent = entries[i];
			new_struct.name_map.push(ent.name);
			new_struct.layout.push(ent.value);
			new_struct[ent.name] = ent.value;
		}
		return new_struct;
	}
}
class JaiStructBuilder {
	constructor() {
		this.struct_entries = [];
	}
	add_member(member_name, member_type) {
		let new_member = new JaiStructMember(member_type);
		this.struct_entries.push(new JaiStructMemberEntry(member_name,new_member));
		return new_member;
	}
	with_function(function_callback) {
		function_callback(this);
		return this;
	}
	build() {
		let new_struct = JaiStruct.from_builder_entries(this.struct_entries);
		return new_struct;
	}
}
class JaiDynamicArrayTag extends NullValueHolder {
}
class JaiDynamicArray {
	constructor(tag, member_type) {
		this.tag = tag;
		this.member_type = member_type;
	}
}
class JaiNullStruct {
}
class JaiRunner {
	execute(...args) {
		console.log('jai execute', args);
	}
	null_struct() {
		return JaiNullStruct;
	}
	struct_builder(...args) {
		return new JaiStructBuilder(...args);
	}
	dyn_array_tag(info) {
		return new JaiDynamicArrayTag(info);
	}
	dyn_array(array_tag, array_member_type) {
		return new JaiDynamicArray(array_tag,array_member_type);
	}
	get_function_def() {}
	get_type_for_args() {}
}
let run_jai = new JaiRunner;
Simple_Package.current_dir;
class _module_jai {
	scope_export = new class {
		Create_Package = run_jai.struct_builder().with_function(function(struct_builder) {
			let jai = run_jai;
			struct_builder.add_member("data", "String_Builder");
			struct_builder.add_member("entries", jai.dyn_array(jai.dyn_array_tag("[..]"), "Entry_Info"));
		}).build();
		Package = run_jai.null_struct();
	}
	scope_file = new class {
		MAGIC = "simp";
		put() {
			let jai = run_jai;
			let res = new JaiFunctionDef(jai,"put",["builder", "x"],function(builder, x) {}
			);
			return res;
		}
	}
}
Simple_Package.add_module_jai("module.jai", raw_template`

// create_*...

Create_Package :: struct {
	data: String_Builder;

	entries: [..] Entry_Info;
}

init :: (using package: *Create_Package) {
}

deinit :: (using package: *Create_Package) {
	free_buffers(*data);
	array_reset(*entries);
}

add :: (package: *Create_Package, entry_name: string, data [] u8) {
}

write :: (package: *Create_Package, filename: string) -> bool {
	header: String_Builder;
	table_of_contents: String_Builder;

	// Magic number (32-bit integer):
	append(*header, MAGIC);

	put(*header, cast(u32) FILE_VERSION);

	// Flags word, 32 bits. There are no flags currently.
	// Maybe later there will be an endian flag here.
	put(*header, cast(u32) 0);

	// Offset to the table of contents, from the start of the file
	// (64-bit unsigned integer). We fill in 0 for now, and we will
	// back-patch it later if we are going to write as we go.

	put(*header, cast(u64) 0);  // nocheckin, fill this out.

	file, success := file_open(filename, true, false, true);
	if !success {
		log_error("In Simple_Package, unable to open '%' for writing!\n", filename);
		return false;
	}

	defer file_close(*file);

	success = file_write(*file, header);
	if !success {
		log_error("In Simple_Package, unable to write the header for file '%'\n", filename);
		return false;
	}

	success = file_write(*file, package.data);
	if !success {
		log_error("In Simple_Package, unable to write the body for file '%'\n", filename);
		return false;
	}


	//
	// Table of contents: 
	//

	// Number of files (64-bit unsigned integer):

	put(*table_of_contents, cast(u64) package.entries.count);
	for entry: package.entries {
	}

	success = file_write(*file, table_of_contents);
	if !success {
		log_error("In Simple_Package, unable to write the table of contents for file '%'\n", filename);
		return false;
	}

	return true;
}


// load_*...

Package :: struct {
}



#scope_file

MAGIC :: "simp";

FILE_VERSION :: 1;
TARGET_IS_LITTLE_ENDIAN :: true;  // @Endian: Need a way to change this based on target CPU!

// @Copypasta from the game!
put :: (builder: *String_Builder, x: $T)
#modify {
	using Type_Info_Tag;
	if T.type == INTEGER return;
	if T.type == FLOAT   return;
	if T.type == BOOL    return;
	if T.type == ENUM    return;

	T = null;
}
{
	ensure_contiguous_space(builder, size_of(T));

	#if TARGET_IS_LITTLE_ENDIAN {
		// @Speed: Just write the target type!
		simple_memcpy(builder, x);
	} else {
		// @Incomplete: Do a slow-path if we know we are not little-endian. This can be generated by #run_and_insert?
		assert(false);
	}
}
#import "Basic";
`, new _module_jai);
