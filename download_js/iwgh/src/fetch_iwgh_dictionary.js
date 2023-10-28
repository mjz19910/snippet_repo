import {
	deno_default_open,
	read_json_array_file,
	write_entire_file,
} from "./deno_support.js";
import { iwgh_dict_main } from "./iwgh_dict_main.js";
import {
	description_cache_set,
	description_set_state,
} from "./parse_rng_description.js";
import { save_dictionary } from "./parse_rng_word.js";
async function run() {
	const description_file = await deno_default_open("./description_cache.json");
	/** @type {string[]} */
	const description_load_arr = await read_json_array_file(description_file);
	for (const description_item of description_load_arr) {
		description_cache_set.add(description_item);
	}
	const dictionary_file = await deno_default_open("./random_dictionary.json");
	/** @type {string[]} */
	const dictionary_words_arr = await read_json_array_file(dictionary_file);
	await iwgh_dict_main(dictionary_words_arr);
	if (description_set_state.modified) {
		const description_arr = [...description_cache_set.values()].sort();
		console.log("description_arr.length", description_arr.length);
		await write_entire_file(description_file, description_arr);
	}
	description_file.close();
	await save_dictionary(dictionary_file, dictionary_words_arr);
	dictionary_file.close();
}
await run();
