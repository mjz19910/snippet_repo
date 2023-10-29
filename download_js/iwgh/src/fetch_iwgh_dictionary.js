import { deno_fs_init } from "./deno_fs_init.js";
import {
	deno_default_open,
	read_json_array_file,
	write_entire_file,
} from "./deno_support.js";
import {
	description_cache_path,
	random_dictionary_path,
} from "./file_paths.js";
import { iwgh_dict_main } from "./iwgh_dict_main.js";
import {
	description_cache_set,
	description_set_state,
} from "./parse_rng_description.js";
import { load_dictionary, save_dictionary } from "./parse_rng_word.js";
async function run() {
	await deno_fs_init();
	const description_file = await deno_default_open(description_cache_path);
	/** @type {string[]} */
	const description_load_arr = await read_json_array_file(description_file);
	for (const description_item of description_load_arr) {
		description_cache_set.add(description_item);
	}
	const dictionary_file = await deno_default_open(random_dictionary_path);
	const dictionary_size = await load_dictionary(dictionary_file);
	await iwgh_dict_main();
	if (description_set_state.modified) {
		const description_arr = [...description_cache_set.values()].sort();
		console.log("description_arr.length", description_arr.length);
		await write_entire_file(description_file, description_arr);
	}
	description_file.close();
	await save_dictionary(dictionary_file,dictionary_size);
	dictionary_file.close();
}
await run();
