/* spell:words Copypasta deinit
--- version_list item 2 ---
v1 (old-o): snippet_repo_v2/javascript/final/__ret_do_cur_debugApi.js
v2 (cur-c): snippet_repo_v2/javascript/group1/sub_a/item-_2.js
*/
function raw_template(v) {
	return v.raw[0];
}
let _module_jai_Simple_Package = raw_template`

// create_*...

Create_Package :: struct {
	data: String_Builder;

	entries: [..] Entry_Info;
}

Entry_Info :: struct {
	data: [] u8;
	offset_from_start_of_file: u64;
}

init :: (using package: *Create_Package) {
}

deinit :: (using package: *Create_Package) {
	free_buffers(*data);
	array_reset(*entries);
}

add :: (package: *Create_Package, entry_name: string, data [] u8) {  // entry_name must remain valid until after write() is called.
	entry := array_add(*package.entries);
	entry.data = data;

	// We don't compute offset_from_start_of_data here because
	// we want to allow for the user to sort the entries after
	// they're all added, prior to writing.
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

	offset_from_start_of_file: u64 = builder_string_length(*header);
	for entry: package.entries {
		success := file_write(*file, cast(string));
		if !success {
			log_error("In Simple_Package, unable to write entry #% ('%') to the file!\n", it_index+1, entry.name);
			return false;
		}

		offset_from_start_of_file += cast(u64) entry.data.count;
	}

/*
	success = file_write(*file, package.data);
	if !success {
		log_error("In Simple_Package, unable to write the body for file '%'\n", filename);
		return false;
	}
*/

	//
	// Table of contents: 
	//

	// Special magic number to help you know you hit the table of contents
	// (32-bit integer):
	append(*table_of_contents, TABLE_OF_CONTENTS_MAGIC);

	// Number of files (64-bit unsigned integer):
	put(*table_of_contents, cast(u64) package.entries.count);

	// For each file, a 4-byte unsigned integer indicating the length of the filename,
	// followed by the filename (zero-terminated! the aforementioned length does not contain the zero),
	// followed by an 8-byte integer indicating the size of the data entry,
	// followed by an 8-byte integer indicating the offset of the entry from the start of the file.
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
TABLE_OF_CONTENTS_MAGIC :: "toc!";

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
#import "File";
`;
let _examples_create_jai_content=`
#import "Simple_Package";
#import "Basic";

main :: () {
	item1 := "Hello, Sailor!";


	item2: [100] u8;
	for 0..item2.count-1  item2[it] = xx it;

	item3: [10] float;
	for 0..item2.count-1  item2[it] = cast(float)(it*it);


	package: Create_Package;
	defer deinit(*package);

	init(*package);

	add(*package, "run_tree/data/item1", xx item1);

	add(*package, "this is item2", xx item2);

	add(*package, "item3, unimaginatively", xx item3);

	write(*package, "test.package");
}
`
