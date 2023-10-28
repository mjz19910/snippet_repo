import { deno_default_open, read_json_array_file, write_entire_file } from "./deno_support.js";
import { fetch_one_page } from "./fetch_one_page.js";
import { random_dictionary_set } from "./parse_rng_word.js";

async function main() {
	const dictionary_file = await deno_default_open("./random_dictionary.json");
	/** @type {string[]} */
	const dictionary_words_arr = await read_json_array_file(dictionary_file);
	for (const word of dictionary_words_arr) {
		parse_rng_word(word, false, false);
	}
	await fetch_one_page("poems");
	const dictionary_arr = [...random_dictionary_set.values()].sort();
	console.log("dictionary.length", dictionary_arr.length);
	await write_entire_file(dictionary_file, dictionary_arr);
	dictionary_file.close();
}
await main();
