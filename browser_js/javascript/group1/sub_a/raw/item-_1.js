/* spell:words myhtml_tokenizer deref polymorphed deinit Copypasta
--- version_list item 1 ---
v1 (old-o): snippet_repo/javascript/final/myhtml_tokenizer.js
v2 (cur-c): snippet_repo/javascript/group1/sub_a/item-_1.js
*/
/**
 * @arg {TemplateStringsArray} v
 */
function raw_template(v) {
	return v.raw[0]
}
class DirBuilder {
	/**
	 * @arg {FSDir} cur
	 */
	constructor(cur) {
		this.cur=cur
	}
	/**
	 * @arg {string} target
	 */
	cd(target) {
		if(target.slice(0,3)=="../") {
			let parent_dir=this.cur.parent
			if(!parent_dir) return
			this.cur=parent_dir
			this.cd(target.slice(3))
		}
		let cd_next=target.split("/",1)
		console.log(cd_next)
	}
}
class FSDirEntry {
	/**
	 * @arg {string} name
	 * @arg {FSDir | FSFile} value
	 */
	constructor(name,value) {
		this.name=name
		this.value=value
	}
}
class FSFile {
	/**@type {string|null} */
	file_data=null
	content_length=0
	/**
	 * @arg {string} [file_data]
	 */
	constructor(file_data) {
		if(!file_data) return
		this.file_data=file_data
		this.content_length=file_data.length
	}
	/**
	 * @arg {string} content
	 */
	set_content(content) {
		this.file_data=content
		this.content_length=content.length
	}
}
class FSDir {
	/**
	 * @type {FSDirEntry[]}
	 */
	m_children=[]
	/**@type {WeakRef<FSDir>|null} */
	m_parent=null
	/**
	 * @arg {FSDir | null} parent
	 */
	constructor(parent) {
		if(parent!==null) {
			this.m_parent=new WeakRef(parent)
		} else {
			this.m_parent=parent
		}
	}
	/**
	 * @arg {string} file_name
	 */
	add_file(file_name) {
		let new_file=new FSFile
		this.m_children.push(new FSDirEntry(file_name,new_file))
		return new_file
	}
	/**
	 * @arg {string} dir_name
	 */
	add_dir(dir_name) {
		let new_dir=new FSDir(this)
		this.m_children.push(new FSDirEntry(dir_name,new_dir))
		return new_dir
	}
	/**@returns {FSDir | null} */
	get parent() {
		if(!this.m_parent) return null
		let parent_dir=this.m_parent.deref()
		if(parent_dir===void 0) return null
		return parent_dir
	}
}
class Win32FSDir {
	/**@type {WeakRef<FSDir>|null} */
	m_parent=null
	/**
	 * @type {FSDirEntry[]}
	 */
	m_children=[]
	constructor() {
		this.drive=null
		this.base="/"
		this.m_object_parent=null
	}
	/**
	 * @arg {{ drive: any; base: any; object_parent: any; }} init_args
	 */
	init(init_args) {
		this.drive=init_args.drive
		this.base=init_args.base
		this.m_object_parent=init_args.object_parent
	}
	/**@returns {FSDir | null} */
	get parent() {
		if(this.base=="/") {
			return null
		}
		if(!this.m_parent||!this.m_parent.deref()) {
			let path=this.base.split("/")
			let up_dir_name=path.pop()
			if(!up_dir_name) {
				return null
			}
			let up_base
			if(path.length>1) {
				up_base=path.join("/")
			} else {
				up_base=path[0]+"/"
			}
			console.log(up_base)
			let up_dir=new Win32FSDir
			up_dir.init({
				drive: this.drive,
				base: up_base,
				object_parent: this.m_object_parent
			})
			up_dir.m_children.push(new FSDirEntry(up_dir_name,this))
			b: if(this.m_object_parent) {
				let ref=this.m_object_parent.deref()
				if(!ref)
					break b
				ref.fs_root=up_dir
				this.m_object_parent=null
			}
			this.m_parent=new WeakRef(up_dir)
		}
		let parent_dir=this.m_parent.deref()
		if(parent_dir===void 0) return null
		return parent_dir
	}
	/**
	 * @arg {string} file_name
	 * @arg {string} [file_content]
	 */
	add_file(file_name,file_content) {
		let new_file=new FSFile(file_content)
		this.m_children.push(new FSDirEntry(file_name,new_file))
		return new_file
	}
	/**
	 * @arg {string} dir_name
	 */
	add_dir(dir_name) {
		let new_dir=new FSDir(this)
		this.m_children.push(new FSDirEntry(dir_name,new_dir))
		return new_dir
	}
}
class _SimplePackageModule {
	constructor() {
		this.fs_root=new Win32FSDir
		this.fs_root.init({
			drive: "C",
			base: "/jai/modules/Simple_Package",
			object_parent: new WeakRef(this),
		})
		this.current_dir=this.fs_root
		this.content_map=new Map
		let dir_builder=new DirBuilder(this.fs_root)
		dir_builder.cur.add_dir("examples")
	}
	/**
	 * @arg {string} module_file_name
	 * @arg {string} module_file_content
	 * @arg {_module_jai} module_obj
	 */
	add_module_jai(module_file_name,module_file_content,module_obj) {
		let mod_file=this.current_dir.add_file(module_file_name)
		mod_file.set_content(module_file_content)
		if(this.content_map.has(module_file_name)) {
			throw new Error("duplicate module.jai")
		}
		this.content_map.set(module_file_name,module_obj)
	}
}
const ExecuteArrayTag=Symbol("ExecuteArray")
const ErrorTag=Symbol("Error")
class AK_Error {
	/**
	 * @arg {any} err
	 */
	constructor(err) {
		this.error=err
	}
}
class AK_ErrorOr {
	/**@type {symbol|AK_Error|null} */
	m_data
	/**
	 * @arg {symbol|null} tag_or_value
	 * @arg {[any, ...any[]]} value_or_error_rest
	 */
	constructor(tag_or_value,...value_or_error_rest) {
		if(tag_or_value===ErrorTag) {
			let [error,...rest_args]=value_or_error_rest
			if(rest_args.length>0) {
				throw new Error("too many arguments")
			}
			this.m_index=1
			this.m_data=new AK_Error(error)
			return
		}
		this.m_index=0
		this.m_data=tag_or_value
	}
}
let AK={
	impl: {
		ErrorTag
	},
	Error: AK_Error,
	ErrorOr: AK_ErrorOr,
}
class AK_Optional {
	has_value() {
		return false
	}
	/**@returns {never} */
	value() {
		throw new Error("No value")
	}
}
class JaiFunctionPolymorph {
	/**
	 * @arg {FunctionArguments} function_args
	 */
	execute_call(function_args) {
		void function_args
	}
}
class JaiExecuteCall {
	/**
	 * @arg {typeof jai_runner} jai
	 * @arg {string} function_name
	 * @arg {any} function_args
	 */
	constructor(jai,function_name,function_args) {
		let function_def=jai.get_function_def(function_name)
		let function_call_types=jai.get_type_for_args(function_args)
		let instantiated_fn=jai.getInstantiation(function_def,function_call_types)
		if(instantiated_fn) {
			this.result=instantiated_fn.execute_call(function_args)
			return
		}
		let polymorph_or_error=jai.polymorph_function(function_def,function_args,function_call_types)
		if(polymorph_or_error.is_error()) {
			this.result=polymorph_or_error
			return
		}
		let optional_polymorph=polymorph_or_error.release_value()
		/**@type {any} */
		let optional_polymorph_any=optional_polymorph
		/**@type {AK_Optional} */
		let optional_polymorph_typed=optional_polymorph_any
		if(optional_polymorph_typed.has_value()) {
			let polymorph=optional_polymorph_typed.value()
			/**@type {any} */
			let polymorph_any=polymorph
			/**@type {JaiFunctionPolymorph} */
			let polymorph_typed=polymorph_any
			this.result=polymorph_typed.execute_call(function_args)
		} else {
			console.log("polymorph failure",function_call_types)
			this.result=new AK_ErrorOr(AK.impl.ErrorTag,new Error("polymorph failed for \""+function_name+"\""))
		}
	}
}
let Simple_Package=new _SimplePackageModule
class NullValueHb {
	/**
	 * @arg {any} value
	 */
	constructor(value) {
		this.value=value
	}
}
class NullEntryHb {
	/**
	 * @arg {any} name
	 * @arg {JaiStructMember} value
	 */
	constructor(name,value) {
		this.name=name
		this.value=value
	}
}
class JaiStructMember extends NullValueHb {
}
class JaiStructMemberEntry extends NullEntryHb {
}
class JaiStruct {
	constructor() {
		/**
		 * @type {any[]}
		 */
		this.layout=[]
		/**
		 * @type {any[]}
		 */
		this.name_map=[]
		/**@type {{[x:string]:any}} */
		this.value={}
	}
	/**
	 * @arg {string | any[]} entries
	 */
	static from_builder_entries(entries) {
		let new_struct=new this
		for(let i=0;i<entries.length;i++) {
			let ent=entries[i]
			new_struct.name_map.push(ent.name)
			new_struct.layout.push(ent.value)
			new_struct.value[ent.name]=ent.value
		}
		return new_struct
	}
}
class JaiStructBuilder {
	constructor() {
		/**
		 * @type {JaiStructMemberEntry[]}
		 */
		this.struct_entries=[]
	}
	/**
	 * @arg {any} member_name
	 * @arg {any} member_type
	 */
	add_member(member_name,member_type) {
		let new_member=new JaiStructMember(member_type)
		this.struct_entries.push(new JaiStructMemberEntry(member_name,new_member))
		return new_member
	}
	/**@arg {(v:JaiStructBuilder)=>void} function_callback*/
	with_function(function_callback) {
		function_callback(this)
		return this
	}
	build() {
		let new_struct=JaiStruct.from_builder_entries(this.struct_entries)
		return new_struct
	}
}
class JaiDynamicArrayTag extends NullValueHb {
}
class JaiDynamicArray {
	/**
	 * @arg {any} tag
	 * @arg {any} member_type
	 */
	constructor(tag,member_type) {
		this.tag=tag
		this.member_type=member_type
	}
}
class JaiNullStruct {
}
class AK_Result {
	/**
	 * @arg {string} tag
	 */
	constructor(tag) {
		if(tag==="Dummy tag") {
			throw new Error("Dummy tag used to instantiate function")
		}
	}
	is_error() {
		return true
	}
	/**@returns {never} */
	release_value() {
		throw new Error()
	}
}
class JaiRunner {
	/**
	 * @arg {any[]} args
	 */
	execute(...args) {
		console.log('jai execute',args)
	}
	null_struct() {
		return JaiNullStruct
	}
	/**
	 * @arg {[]} args
	 */
	struct_builder(...args) {
		return new JaiStructBuilder(...args)
	}
	/**
	 * @arg {string} info
	 */
	dyn_array_tag(info) {
		return new JaiDynamicArrayTag(info)
	}
	/**
	 * @arg {JaiDynamicArrayTag} array_tag
	 * @arg {string} array_member_type
	 */
	dyn_array(array_tag,array_member_type) {
		return new JaiDynamicArray(array_tag,array_member_type)
	}
	/**
	 * @arg {string} name
	 * @returns {never}
	 */
	get_function_def(name) {
		void name
		throw new Error("TODO")
	}
	/**
	 * @arg {any} function_args
	 * @returns {never}
	 */
	get_type_for_args(function_args) {
		void function_args
		throw new Error("TODO")
	}
	/**
	 * @arg {never} a
	 * @arg {never} b
	 * @returns {JaiFunctionInstance|null}
	 */
	getInstantiation(a,b) {
		void a,b
		return new JaiFunctionInstance("Dummy tag")
	}
	/**
	 * @arg {never} a
	 * @arg {any} b
	 * @arg {never} c
	 */
	polymorph_function(a,b,c) {
		void a,b,c
		return new AK_Result("Dummy tag")
	}
}
class FunctionArguments {}
class JaiFunctionInstance {
	/**
	 * @arg {string} tag
	 */
	constructor(tag) {
		if(tag==="Dummy tag") {
			throw new Error("Dummy tag used to instantiate function")
		}
	}
	/**@arg {FunctionArguments} call_arguments */
	execute_call(call_arguments) {
		void call_arguments
	}
}
class JaiFunctionDef {
	/**
	 * @arg {JaiRunner} cur_jai
	 * @arg {string} function_name
	 * @arg {string[]} argument_names
	 * @arg {(builder: any, x: any) => void} function_body
	 */
	constructor(cur_jai,function_name,argument_names,function_body) {
		this.cur_jai=cur_jai
		this.function_name=function_name
		this.argument_names=argument_names
		this.function_body=function_body
	}
}
let jai_runner=new JaiRunner
Simple_Package.current_dir
class _module_jai {
	scope_export=new class {
		Create_Package=jai_runner.struct_builder().with_function(function(struct_builder) {
			let jai=jai_runner
			struct_builder.add_member("data","String_Builder")
			struct_builder.add_member("entries",jai.dyn_array(jai.dyn_array_tag("[..]"),"Entry_Info"))
		}).build()
		Package=jai_runner.null_struct()
	}
	scope_file=new class {
		MAGIC="simp"
		// #modify of put in file scope of simple_package/module.jai
		put() {
			let res=new JaiFunctionDef(jai_runner,"put",["builder","x"],(builder,x) => (void builder,x))
			return res
		}
	}
}
Simple_Package.add_module_jai("module.jai",raw_template`

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
`,new _module_jai)
